import type { WeatherData } from "../types/weather";

type GeocodingResponse = {
  results?: Array<{
    name: string;
    country: string;
    latitude: number;
    longitude: number;
  }>;
};

type GeocodingPlace = {
  name: string;
  country: string;
  latitude: number;
  longitude: number;
};

type ForecastResponse = {
  current?: {
    temperature_2m: number;
    wind_speed_10m: number;
    weather_code: number;
  };
};

const japaneseCityMap: Record<string, string> = {
  "東京": "Tokyo",
  "東京都": "Tokyo",
  "大阪": "Osaka",
  "大阪府": "Osaka",
  "名古屋": "Nagoya",
  "札幌": "Sapporo",
  "福岡": "Fukuoka",
  "横浜": "Yokohama",
  "京都": "Kyoto",
  "神戸": "Kobe",
  "仙台": "Sendai",
  "広島": "Hiroshima",
  "那覇": "Naha",
};

const weatherCodeMap: Record<number, { text: string; icon: string }> = {
  0: { text: "快晴", icon: "sunny" },
  1: { text: "晴れ", icon: "sunny" },
  2: { text: "晴れ時々くもり", icon: "partly-cloudy" },
  3: { text: "くもり", icon: "cloudy" },
  45: { text: "霧", icon: "fog" },
  48: { text: "霧氷", icon: "fog" },
  51: { text: "弱い霧雨", icon: "drizzle" },
  53: { text: "霧雨", icon: "drizzle" },
  55: { text: "強い霧雨", icon: "drizzle" },
  61: { text: "弱い雨", icon: "rain" },
  63: { text: "雨", icon: "rain" },
  65: { text: "強い雨", icon: "rain" },
  71: { text: "弱い雪", icon: "snow" },
  73: { text: "雪", icon: "snow" },
  75: { text: "強い雪", icon: "snow" },
  80: { text: "にわか雨", icon: "rain" },
  81: { text: "強いにわか雨", icon: "rain" },
  82: { text: "激しいにわか雨", icon: "rain" },
  95: { text: "雷雨", icon: "thunder" },
};

function toWeatherLabel(weatherCode: number) {
  return weatherCodeMap[weatherCode] ?? { text: "不明", icon: "unknown" };
}

function normalizeCityInput(city: string): string {
  return city.normalize("NFKC").replace(/\s+/g, " ").trim();
}

function buildCityQueryCandidates(city: string): string[] {
  const normalized = normalizeCityInput(city);
  const normalizedNoSuffix = normalized.replace(/[都道府県市]$/u, "");
  const mapped = japaneseCityMap[normalized] ?? japaneseCityMap[normalizedNoSuffix];

  if (!mapped) {
    return [normalized];
  }

  if (mapped.toLowerCase() === normalized.toLowerCase()) {
    return [normalized];
  }

  // Try the mapped English name first for Japanese inputs, then fallback to original.
  return [mapped, normalized];
}

export async function fetchWeatherByCity(city: string): Promise<WeatherData> {
  const queryCandidates = buildCityQueryCandidates(city);
  let place: GeocodingPlace | undefined;

  for (const query of queryCandidates) {
    const geoRes = await fetch(
      `https://geocoding-api.open-meteo.com/v1/search?name=${encodeURIComponent(query)}&count=1&language=ja&format=json`,
    );

    if (!geoRes.ok) {
      throw new Error("都市情報の取得に失敗しました");
    }

    const geoData = (await geoRes.json()) as GeocodingResponse;
    place = geoData.results?.[0];
    if (place) {
      break;
    }
  }

  if (!place) {
    throw new Error("都市が見つかりませんでした");
  }

  const forecastRes = await fetch(
    `https://api.open-meteo.com/v1/forecast?latitude=${place.latitude}&longitude=${place.longitude}&current=temperature_2m,wind_speed_10m,weather_code&timezone=auto`,
  );

  if (!forecastRes.ok) {
    throw new Error("天気情報の取得に失敗しました");
  }

  const forecastData = (await forecastRes.json()) as ForecastResponse;
  if (!forecastData.current) {
    throw new Error("現在天気データがありません");
  }

  const weatherCode = forecastData.current.weather_code;
  const label = toWeatherLabel(weatherCode);

  return {
    city: place.name,
    country: place.country,
    latitude: place.latitude,
    longitude: place.longitude,
    temperature: forecastData.current.temperature_2m,
    windSpeed: forecastData.current.wind_speed_10m,
    weatherCode,
    weatherText: label.text,
    weatherIcon: label.icon,
  };
}

export function getFortuneByWeatherCode(weatherCode: number): string {
  if (weatherCode <= 2) {
    return "運勢は好調。新しい予定を入れるのに向いています。";
  }
  if (weatherCode <= 55) {
    return "落ち着いて進める日。準備を丁寧にすると吉です。";
  }
  if (weatherCode <= 82) {
    return "予定は余裕を持って。移動時間を長めに確保すると安心です。";
  }
  return "無理をしない日。重要な判断は慎重に進めると安定します。";
}
