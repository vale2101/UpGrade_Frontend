export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "https://upgrade-store.shop/api",
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "https://upgrade-store.shop/api",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "UpGrade",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
};

export const isDevelopment = process.env.NODE_ENV === "development";