'use client';

import React, { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  Plus,
  Search,
  RefreshCw,
  Scissors,
  CheckCircle2,
  Trash2,
  Clock,
  User,
  Phone,
  RotateCcw,
  Sparkles,
} from 'lucide-react';
import { Button, SelectField, TextField, Toast, Modal, Badge } from '@/components/ui';
import { queueService, QueueItem } from '@/services/endpoints/queue';
import { barberService } from '@/services/endpoints/barber';
import { servicesService } from '@/services/endpoints/service';
import { TKapster, TService } from '@/types';
import { LiveHeader } from './components/LiveHeader';
import { LateCheckInSection, LateCheckInItem } from './sections/LateCheckInSection';
import { QueueKanbanSection, KanbanItem } from './sections/QueueKanbanSection';

export default function QueuePage() {
  const [selectedKapster, setSelectedKapster] = useState('Semua kapster');
  const [searchQuery, setSearchQuery] = useState('');
  const [barbers, setBarbers] = useState<TKapster[]>([]);
  const [availableServices, setAvailableServices] = useState<TService[]>([]);
  const [lateItems, setLateItems] = useState<LateCheckInItem[]>([]);
  const [skippedCount, setSkippedCount] = useState(0);
  const [toastMsg, setToastMsg] = useState<string | null>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Modals state
  const [queueDetail, setQueueDetail] = useState<KanbanItem | null>(null);
  const [queueToDelete, setQueueToDelete] = useState<KanbanItem | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  // Quick Walk-In Modal state
  const [isWalkInModalOpen, setIsWalkInModalOpen] = useState(false);
  const [walkInName, setWalkInName] = useState('');
  const [walkInPhone, setWalkInPhone] = useState('');
  const [walkInBarberId, setWalkInBarberId] = useState('');
  const [walkInSelectedServices, setWalkInSelectedServices] = useState<string[]>([]);
  const [isSubmittingWalkIn, setIsSubmittingWalkIn] = useState(false);
  const [walkInError, setWalkInError] = useState<string | null>(null);

  // Kanban lists
  const [waitingList, setWaitingList] = useState<KanbanItem[]>([]);
  const [inProgressList, setInProgressList] = useState<KanbanItem[]>([]);
  const [doneList, setDoneList] = useState<KanbanItem[]>([]);

  // Load barbers and services
  useEffect(() => {
    async function loadMetadata() {
      try {
        const [barberRes, srvRes] = await Promise.all([
          barberService.getBarbers(),
          servicesService.getServices(),
        ]);
        if (barberRes.data) {
          setBarbers(barberRes.data);
          if (barberRes.data.length > 0) {
            setWalkInBarberId(barberRes.data[0].id || barberRes.data[0].uuid);
          }
        }
        if (srvRes.data) {
          setAvailableServices(srvRes.data);
          if (srvRes.data.length > 0) {
            setWalkInSelectedServices([srvRes.data[0].id]);
          }
        }
      } catch (_err) {
        // ignore
      }
    }
    loadMetadata();
  }, []);

  // Fetch live queues
  const fetchQueues = useCallback(async () => {
    setIsRefreshing(true);
    try {
      const res = await queueService.getQueues();
      const raw = res.data || [];

      const wItems: KanbanItem[] = [];
      const pItems: KanbanItem[] = [];
      const dItems: KanbanItem[] = [];

      raw.forEach((q) => {
        const item: KanbanItem = {
          id: q.queue_id,
          queueNo: q.queue_number,
          timeRange: `${q.start_time ? q.start_time.slice(0, 5) : '14:00'}`,
          customerName: q.customer_name || 'Pelanggan Walk-in',
          customerPhone: q.customer_phone || '-',
          totalPrice: Number(q.total_price || 0),
          serviceDetail: `${q.services || 'Potong reguler'} • Rp${Number(q.total_price || 50000).toLocaleString('id-ID')}`,
          kapsterName: q.barber_name || 'Kapster TRIM',
          statusFlowText: `Queue: ${q.queue_status}`,
          checkInTime: q.joined_at
            ? `Masuk ${new Date(q.joined_at).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}`
            : undefined,
          statusText: `Estimasi ${q.estimated_wait_time_mins || 15} mnt`,
          paymentStatus: 'paid',
          columnStatus: q.queue_status as any,
        };

        if (q.queue_status === 'waiting') wItems.push(item);
        else if (q.queue_status === 'in_progress') pItems.push(item);
        else if (q.queue_status === 'completed') dItems.push(item);
      });

      setWaitingList(wItems);
      setInProgressList(pItems);
      setDoneList(dItems);

      // Fetch late bookings dynamically
      const todayStr = new Date().toISOString().slice(0, 10);
      try {
        const bRes = await queueService.getBookings({ date: todayStr, status: 'confirmed' });
        const now = new Date();
        const curMins = now.getHours() * 60 + now.getMinutes();

        const lItems: LateCheckInItem[] = (bRes.data || [])
          .filter((b: any) => {
            if (!b.start_time) return false;
            const [h, m] = b.start_time.split(':').map(Number);
            const bookingMins = h * 60 + m;
            return curMins > bookingMins;
          })
          .map((b: any, idx: number) => {
            const [h, m] = b.start_time.split(':').map(Number);
            const bookingMins = h * 60 + m;
            return {
              id: b.id,
              customerName: b.customer_name || 'Pelanggan',
              queueNo: `BK-${String(idx + 1).padStart(3, '0')}`,
              scheduledTime: b.start_time ? b.start_time.slice(0, 5) : '10:00',
              lateMinutes: Math.max(1, curMins - bookingMins),
            };
          });
        setLateItems(lItems);
      } catch (_bErr) {}
    } catch (_err) {
      setWaitingList([]);
      setInProgressList([]);
      setDoneList([]);
      setLateItems([]);
    } finally {
      setIsRefreshing(false);
    }
  }, []);

  useEffect(() => {
    fetchQueues();
    const interval = setInterval(fetchQueues, 15000); // Polling live 15s
    return () => clearInterval(interval);
  }, [fetchQueues]);

  // Handle Drag & Drop move item between columns
  const handleMoveItem = async (
    itemId: string,
    targetStatus: 'waiting' | 'in_progress' | 'completed'
  ) => {
    // Find item in any column
    const allItems = [...waitingList, ...inProgressList, ...doneList];
    const targetItem = allItems.find((i) => i.id === itemId);
    if (!targetItem) return;

    // Optimistic UI updates
    setWaitingList((prev) => prev.filter((i) => i.id !== itemId));
    setInProgressList((prev) => prev.filter((i) => i.id !== itemId));
    setDoneList((prev) => prev.filter((i) => i.id !== itemId));

    const updatedItem: KanbanItem = {
      ...targetItem,
      columnStatus: targetStatus,
      statusFlowText: `Queue: ${targetStatus}`,
    };

    if (targetStatus === 'waiting') {
      setWaitingList((prev) => [updatedItem, ...prev]);
      setToastMsg(`Antrean ${targetItem.queueNo} (${targetItem.customerName}) dipindahkan ke Menunggu.`);
    } else if (targetStatus === 'in_progress') {
      setInProgressList((prev) => [updatedItem, ...prev]);
      setToastMsg(`Antrean ${targetItem.queueNo} (${targetItem.customerName}) sedang dicukur!`);
    } else if (targetStatus === 'completed') {
      setDoneList((prev) => [updatedItem, ...prev]);
      setToastMsg(`Antrean ${targetItem.queueNo} (${targetItem.customerName}) ditandai selesai!`);
    }

    try {
      await queueService.updateStatus(itemId, targetStatus);
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal memperbarui status di server');
      fetchQueues();
    }
  };

  const handleStartCut = (item: KanbanItem) => {
    if (item.id) handleMoveItem(item.id, 'in_progress');
  };

  const handleFinishCut = (item: KanbanItem) => {
    if (item.id) handleMoveItem(item.id, 'completed');
  };

  const handleRevertToWaiting = (item: KanbanItem) => {
    if (item.id) handleMoveItem(item.id, 'waiting');
  };

  const handleRevertToProgress = (item: KanbanItem) => {
    if (item.id) handleMoveItem(item.id, 'in_progress');
  };

  // Confirm delete queue
  const handleConfirmDelete = async () => {
    if (!queueToDelete?.id) return;
    setIsDeleting(true);
    try {
      await queueService.deleteQueue(queueToDelete.id);
      setWaitingList((prev) => prev.filter((i) => i.id !== queueToDelete.id));
      setInProgressList((prev) => prev.filter((i) => i.id !== queueToDelete.id));
      setDoneList((prev) => prev.filter((i) => i.id !== queueToDelete.id));
      setToastMsg(`Antrean ${queueToDelete.queueNo} berhasil dibatalkan.`);
      setQueueDetail(null);
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal membatalkan antrean');
    } finally {
      setIsDeleting(false);
      setQueueToDelete(null);
    }
  };

  // Late check in actions
  const handleCheckIn = async (item: LateCheckInItem) => {
    try {
      await queueService.checkIn(item.id);
      setLateItems((prev) => prev.filter((i) => i.id !== item.id));
      setToastMsg(`Pelanggan ${item.customerName} (${item.queueNo}) berhasil check-in dan masuk antrian aktif!`);
      await fetchQueues();
    } catch (err) {
      setToastMsg(err instanceof Error ? err.message : 'Gagal melakukan check-in');
    }
  };

  const handleSkip = async (item: LateCheckInItem) => {
    try {
      await queueService.updateBookingStatus(item.id, 'cancelled');
      setLateItems((prev) => prev.filter((i) => i.id !== item.id));
      setSkippedCount((prev) => prev + 1);
      setToastMsg(`Antrean ${item.queueNo} (${item.customerName}) dilewati (dibatalkan).`);
    } catch (err) {
      setLateItems((prev) => prev.filter((i) => i.id !== item.id));
      setSkippedCount((prev) => prev + 1);
      setToastMsg(`Antrean ${item.queueNo} dilewati.`);
    }
  };

  // Submit quick Walk-In modal
  const handleWalkInSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!walkInName.trim()) {
      setWalkInError('Nama pelanggan wajib diisi');
      return;
    }
    if (walkInSelectedServices.length === 0) {
      setWalkInError('Pilih setidaknya 1 layanan potong rambut');
      return;
    }

    setIsSubmittingWalkIn(true);
    setWalkInError(null);
    try {
      const res = await queueService.createWalkIn({
        customerName: walkInName.trim(),
        customerPhone: walkInPhone.trim() || undefined,
        barberId: walkInBarberId || undefined,
        serviceIds: walkInSelectedServices,
      });

      setToastMsg(`Antrean Walk-in berhasil dibuat: ${res.data?.queueNumber || 'A-Baru'}`);
      setWalkInName('');
      setWalkInPhone('');
      setIsWalkInModalOpen(false);
      await fetchQueues();
    } catch (err) {
      setWalkInError(err instanceof Error ? err.message : 'Gagal mendaftarkan antrean walk-in');
    } finally {
      setIsSubmittingWalkIn(false);
    }
  };

  const toggleServiceSelection = (id: string) => {
    setWalkInSelectedServices((prev) =>
      prev.includes(id) ? prev.filter((sId) => sId !== id) : [...prev, id]
    );
  };

  const barberOptions = [
    { value: 'Semua kapster', label: 'Semua kapster' },
    ...barbers.map((b) => ({ value: b.name, label: b.name })),
  ];

  return (
    <div className="space-y-6 selection:bg-secondary selection:text-white">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-extrabold text-text-main tracking-tight flex items-center gap-2">
            Monitor Antrean Langsung
            <Badge variant="accent" label="DnD Aktif" />
          </h1>
          <p className="text-text-muted text-[14px] mt-1">
            Pantau dan atur pergerakan antrean pelanggan secara langsung. Tarik &amp; lepas (drag &amp; drop) kartu untuk memperbarui status.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start sm:self-auto shrink-0">
          <Button
            variant="outline"
            size="md"
            icon={<RefreshCw className={`w-4 h-4 ${isRefreshing ? 'animate-spin' : ''}`} />}
            onClick={fetchQueues}
          >
            Segarkan
          </Button>

          <Button
            variant="primary"
            size="md"
            icon={<Plus className="w-4 h-4" />}
            onClick={() => setIsWalkInModalOpen(true)}
          >
            Tambah Walk-in
          </Button>
        </div>
      </div>

      {/* Control bar: Live Header, Search, Barber Filter */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 p-4 rounded-2xl bg-surface border border-border">
        <LiveHeader />

        <div className="flex flex-wrap items-center gap-3">
          {/* Search box */}
          <div className="relative min-w-[220px]">
            <Search className="w-4 h-4 text-text-muted absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Cari nama, A-001..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-raised border border-border rounded-xl pl-9 pr-3 py-1.5 text-[13px] text-text-main focus:outline-none focus:border-secondary"
            />
          </div>

          {/* Kapster selector */}
          <div className="min-w-[170px]">
            <SelectField
              size="sm"
              value={selectedKapster}
              onChange={(e) => setSelectedKapster(e.target.value)}
              options={barberOptions}
            />
          </div>

          {/* Skipped Badge / Counter */}
          <div className="px-3 py-1.5 rounded-xl bg-raised border border-border text-[12px] font-mono text-text-muted flex items-center gap-1.5">
            <span>Dilewati:</span>
            <span className="font-bold text-text-main">{skippedCount}</span>
          </div>
        </div>
      </div>

      {/* Late check-in banner */}
      <LateCheckInSection items={lateItems} onSkip={handleSkip} onCheckIn={handleCheckIn} />

      {/* Drag & Drop Kanban Section */}
      <QueueKanbanSection
        selectedKapster={selectedKapster}
        searchQuery={searchQuery}
        waitingItems={waitingList}
        inProgressItems={inProgressList}
        doneItems={doneList}
        onStartCut={handleStartCut}
        onFinishCut={handleFinishCut}
        onRevertToWaiting={handleRevertToWaiting}
        onRevertToProgress={handleRevertToProgress}
        onDeleteRequest={setQueueToDelete}
        onMoveItem={handleMoveItem}
        onDetailRequest={setQueueDetail}
        onRefresh={fetchQueues}
      />

      {/* Modal: Quick Walk-in Registration */}
      <Modal
        isOpen={isWalkInModalOpen}
        onClose={() => setIsWalkInModalOpen(false)}
        title="Daftarkan Antrean Walk-in"
        description="Pelanggan datang langsung ke barbershop tanpa reservasi sebelumnya."
      >
        <form onSubmit={handleWalkInSubmit} className="space-y-4 py-2">
          {walkInError && (
            <div className="p-3 rounded-xl bg-danger/10 border border-danger/20 text-danger text-xs font-medium">
              {walkInError}
            </div>
          )}

          <TextField
            label="Nama Pelanggan"
            required
            placeholder="misal: Budi Santoso"
            value={walkInName}
            onChange={(e) => setWalkInName(e.target.value)}
          />

          <TextField
            label="No. WhatsApp / HP (Opsional)"
            placeholder="0812xxxxxxxx"
            value={walkInPhone}
            onChange={(e) => setWalkInPhone(e.target.value)}
          />

          <div className="space-y-1">
            <label className="text-[14px] font-medium text-text-main">Pilih Kapster</label>
            <SelectField
              value={walkInBarberId}
              onChange={(e) => setWalkInBarberId(e.target.value)}
              options={
                barbers.length > 0
                  ? barbers.map((b) => ({ value: b.id || b.uuid, label: `${b.name} (${b.specialty})` }))
                  : [{ value: '', label: 'Pilih Kapster Tersedia' }]
              }
            />
          </div>

          <div className="space-y-2">
            <label className="text-[14px] font-medium text-text-main">Pilih Layanan</label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 max-h-48 overflow-y-auto pr-1">
              {availableServices.map((srv) => {
                const isSelected = walkInSelectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleServiceSelection(srv.id)}
                    className={`p-3 rounded-xl border text-xs cursor-pointer transition-all flex flex-col justify-between ${
                      isSelected
                        ? 'border-secondary bg-secondary/10 text-text-main ring-1 ring-secondary'
                        : 'border-border bg-raised hover:border-border/80 text-text-muted'
                    }`}
                  >
                    <div className="flex justify-between items-start gap-1">
                      <span className="font-bold text-text-main">{srv.name}</span>
                      {isSelected && <CheckCircle2 className="w-3.5 h-3.5 text-secondary shrink-0" />}
                    </div>
                    <span className="font-mono text-secondary mt-1">Rp{srv.price.toLocaleString('id-ID')}</span>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="flex justify-between items-center pt-3 border-t border-border">
            <Link
              href="/queue/form"
              className="text-xs text-text-muted hover:text-secondary underline"
            >
              Buka Form Lengkap →
            </Link>

            <div className="flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => setIsWalkInModalOpen(false)}
              >
                Batal
              </Button>
              <Button
                type="submit"
                variant="primary"
                size="sm"
                isLoading={isSubmittingWalkIn}
              >
                Daftarkan Sekarang
              </Button>
            </div>
          </div>
        </form>
      </Modal>

      {/* Modal: Queue Card Details */}
      {queueDetail && (
        <Modal
          isOpen={true}
          onClose={() => setQueueDetail(null)}
          title={`Detail Antrean • ${queueDetail.queueNo}`}
          description="Rincian lengkap pelanggan, kapster yang bertugas, dan kontrol status."
        >
          <div className="space-y-4 py-1">
            <div className="grid grid-cols-2 gap-4 text-sm bg-raised/40 p-4 rounded-xl border border-border">
              <div>
                <p className="text-text-muted text-xs">Nomor Antrean</p>
                <p className="font-semibold font-mono text-secondary text-[18px] mt-0.5">{queueDetail.queueNo}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Posisi Kolom</p>
                <div className="mt-1">
                  {queueDetail.columnStatus === 'waiting' && <Badge variant="warning" label="Menunggu" />}
                  {queueDetail.columnStatus === 'in_progress' && <Badge variant="accent" label="Sedang Dicukur" />}
                  {queueDetail.columnStatus === 'completed' && <Badge variant="success" label="Selesai" />}
                </div>
              </div>
              <div>
                <p className="text-text-muted text-xs">Nama Pelanggan</p>
                <p className="font-semibold text-text-main mt-0.5">{queueDetail.customerName}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Kapster Bertugas</p>
                <p className="font-semibold text-text-main mt-0.5">{queueDetail.kapsterName}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Layanan &amp; Tarif</p>
                <p className="font-semibold text-success mt-0.5">{queueDetail.serviceDetail}</p>
              </div>
              <div>
                <p className="text-text-muted text-xs">Waktu Kedatangan</p>
                <p className="font-mono text-xs text-text-muted mt-0.5">{queueDetail.checkInTime || 'Terkonfirmasi'}</p>
              </div>
            </div>

            {/* Quick Actions from inside Modal */}
            <div className="flex flex-wrap items-center justify-between gap-2 pt-2 border-t border-border">
              <Button
                variant="danger"
                size="sm"
                icon={<Trash2 className="w-3.5 h-3.5" />}
                onClick={() => {
                  setQueueToDelete(queueDetail);
                  setQueueDetail(null);
                }}
              >
                Batalkan Antrean
              </Button>

              <div className="flex items-center gap-2 ml-auto">
                {queueDetail.columnStatus === 'waiting' && (
                  <Button
                    variant="primary"
                    size="sm"
                    icon={<Scissors className="w-3.5 h-3.5" />}
                    onClick={() => {
                      if (queueDetail.id) handleMoveItem(queueDetail.id, 'in_progress');
                      setQueueDetail(null);
                    }}
                  >
                    Mulai Cukur
                  </Button>
                )}

                {queueDetail.columnStatus === 'in_progress' && (
                  <>
                    <Button
                      variant="outline"
                      size="sm"
                      icon={<RotateCcw className="w-3.5 h-3.5" />}
                      onClick={() => {
                        if (queueDetail.id) handleMoveItem(queueDetail.id, 'waiting');
                        setQueueDetail(null);
                      }}
                    >
                      Kembalikan ke Menunggu
                    </Button>
                    <Button
                      variant="primary"
                      size="sm"
                      icon={<CheckCircle2 className="w-3.5 h-3.5" />}
                      onClick={() => {
                        if (queueDetail.id) handleMoveItem(queueDetail.id, 'completed');
                        setQueueDetail(null);
                      }}
                    >
                      Selesaikan Cukur
                    </Button>
                  </>
                )}

                {queueDetail.columnStatus === 'completed' && (
                  <Button
                    variant="outline"
                    size="sm"
                    icon={<RotateCcw className="w-3.5 h-3.5" />}
                    onClick={() => {
                      if (queueDetail.id) handleMoveItem(queueDetail.id, 'in_progress');
                      setQueueDetail(null);
                    }}
                  >
                    Buka Kembali
                  </Button>
                )}

                <Button variant="outline" size="sm" onClick={() => setQueueDetail(null)}>
                  Tutup
                </Button>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Modal: Confirm Cancel / Delete Queue */}
      <Modal
        isOpen={Boolean(queueToDelete)}
        onClose={() => setQueueToDelete(null)}
        title="Batalkan Antrean Pelanggan"
        description={`Apakah Anda yakin ingin membatalkan antrean ${queueToDelete?.queueNo} untuk pelanggan "${queueToDelete?.customerName}"?`}
        variant="destructive"
        confirmText="Ya, Batalkan"
        cancelText="Kembali"
        onConfirm={handleConfirmDelete}
      />

      {/* Floating notification Toast */}
      {toastMsg && (
        <div className="fixed bottom-6 right-6 z-50">
          <Toast
            variant="info"
            title="Pemberitahuan Antrean"
            description={toastMsg}
            onClose={() => setToastMsg(null)}
          />
        </div>
      )}
    </div>
  );
}
