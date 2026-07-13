import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getApiErrorMessage(error: unknown, fallback: string) {
  const axiosError = error as { response?: { data?: { message?: string } } };
  return axiosError.response?.data?.message || fallback;
}
