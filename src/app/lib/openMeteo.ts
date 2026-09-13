export interface MarineData {
  hourly: {
    time: string[];
    wave_height: number[];
    wave_direction: number[];
    wave_period: number[];
  };
}

export async function getMarineData(lat: string, lon: string): Promise<MarineData | null> {
  try {
    const url = `https://marine-api.open-meteo.com/v1/marine?latitude=${lat}&longitude=${lon}&hourly=wave_height,wave_direction,wave_period&timezone=Africa%2FCasablanca`;
    const res = await fetch(url, { next: { revalidate: 3600 } });
    if (!res.ok) return null;
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch marine data", error);
    return null;
  }
}
