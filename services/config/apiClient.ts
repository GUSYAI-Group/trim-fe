// Karena kita masih tahap slicing dan backend (Express) belum siap,
// kita mock dulu fetch logic-nya. Nanti tinggal ganti dengan axios instance.

export const apiClient = {
  get: async (url: string) => {
    console.log(`[Mock API GET] Request to: ${url}`);
    
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return { data: null };
  }
};
