function safeParseInt(string: string | null, radix = 10) {
  if (!string) return null;
  const value = parseInt(string, radix);

  return Number.isNaN(value) ? null : value;
}

const { VITE_API_URL, VITE_API_TIMEOUT } = import.meta.env;

export const API_URL = (VITE_API_URL || "") as string;

export const API_TIMEOUT = safeParseInt(VITE_API_TIMEOUT) || 10000;
