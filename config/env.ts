export const ENV = {
  API_URL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000/api",
  BACKEND_URL: process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000",
  APP_NAME: process.env.NEXT_PUBLIC_APP_NAME || "UpGrade",
  APP_VERSION: process.env.NEXT_PUBLIC_APP_VERSION || "1.0.0",
  API_TIMEOUT: parseInt(process.env.NEXT_PUBLIC_API_TIMEOUT || "10000"),
};

export const isDevelopment = process.env.NODE_ENV === "development";