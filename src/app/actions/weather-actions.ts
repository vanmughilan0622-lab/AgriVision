"use server";

export async function getWeather(lat: number, lon: number) {
  try {
    const url = `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lon}&current=temperature_2m,relative_humidity_2m,apparent_temperature,is_day,precipitation,rain,showers,snowfall,weather_code,cloud_cover,pressure_msl,surface_pressure,wind_speed_10m,wind_direction_10m,wind_gusts_10m,visibility,dew_point_2m&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max,uv_index_max&timezone=auto`;
    const res = await fetch(url, { next: { revalidate: 1800 } }); // Cache for 30 minutes
    if (!res.ok) {
      throw new Error(`Failed to fetch weather: ${res.statusText}`);
    }
    const data = await res.json();
    return { success: true, data };
  } catch (error: any) {
    console.error("Weather API error:", error);
    return { success: false, error: error.message };
  }
}

export async function getCoordinates(query: string) {
  try {
    const cleanQuery = query.replace(/\([^)]*\)/g, '').trim();
    let res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(cleanQuery)}&count=1`);
    if (!res.ok) throw new Error("Geocoding failed");
    let data = await res.json();
    if (data.results && data.results.length > 0) {
      return { success: true, lat: data.results[0].latitude, lon: data.results[0].longitude };
    }

    const firstWord = cleanQuery.split(' ')[0];
    if (firstWord && firstWord !== cleanQuery) {
        res = await fetch(`https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(firstWord)}&count=1`);
        if (res.ok) {
            data = await res.json();
            if (data.results && data.results.length > 0) {
                return { success: true, lat: data.results[0].latitude, lon: data.results[0].longitude };
            }
        }
    }

    return { success: false, error: "Not found" };
  } catch (error: any) {
    return { success: false, error: error.message };
  }
}


