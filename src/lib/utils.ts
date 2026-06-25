import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getWeatherCondition(code: number) {
  // WMO Weather interpretation codes
  if (code === 0) return { label: "Clear Sky", iconType: "Sun", color: "text-amber-400" };
  if (code === 1 || code === 2 || code === 3) return { label: "Partly Cloudy", iconType: "CloudSun", color: "text-sky-400" };
  if (code === 45 || code === 48) return { label: "Fog", iconType: "CloudFog", color: "text-slate-400" };
  if (code >= 51 && code <= 67) return { label: "Rain", iconType: "CloudRain", color: "text-blue-400" };
  if (code >= 71 && code <= 77) return { label: "Snow", iconType: "CloudRain", color: "text-white" };
  if (code >= 80 && code <= 82) return { label: "Showers", iconType: "CloudRain", color: "text-blue-500" };
  if (code >= 95 && code <= 99) return { label: "Thunderstorm", iconType: "CloudLightning", color: "text-purple-400" };
  
  return { label: "Unknown", iconType: "CloudSun", color: "text-slate-400" };
}
