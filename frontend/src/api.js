const rawApiUrl = import.meta.env.VITE_API_URL || "";
export const API = rawApiUrl.replace(/\/+$/, "");
