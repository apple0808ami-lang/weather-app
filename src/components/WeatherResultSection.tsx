import { getFortuneByWeatherCode } from "../lib/weatherApi";
import type { WeatherData } from "../types/weather";

type WeatherResultSectionProps = {
  weather: WeatherData;
};

export function WeatherResultSection({ weather }: WeatherResultSectionProps) {
  const fortune = getFortuneByWeatherCode(weather.weatherCode);

  return (
    <section className="space-y-4 rounded-2xl border border-slate-200 bg-white/85 p-6 shadow-sm">
      <header>
        <h2 className="text-xl font-semibold text-slate-900">
          {weather.city}, {weather.country}
        </h2>
        <p className="text-sm text-slate-600">
          緯度: {weather.latitude.toFixed(2)} / 経度: {weather.longitude.toFixed(2)}
        </p>
      </header>

      <div className="grid gap-3 sm:grid-cols-2">
        <div className="rounded-xl bg-sky-50 p-4">
          <p className="text-sm text-slate-600">現在天気</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{weather.weatherText}</p>
          <p className="text-xs text-slate-500">icon: {weather.weatherIcon}</p>
        </div>

        <div className="rounded-xl bg-emerald-50 p-4">
          <p className="text-sm text-slate-600">気温</p>
          <p className="mt-1 text-2xl font-semibold text-slate-900">{weather.temperature} C</p>
        </div>

        <div className="rounded-xl bg-amber-50 p-4 sm:col-span-2">
          <p className="text-sm text-slate-600">風力</p>
          <p className="mt-1 text-lg font-semibold text-slate-900">{weather.windSpeed} km/h</p>
        </div>
      </div>

      <div className="rounded-xl border border-violet-100 bg-violet-50 p-4">
        <p className="text-sm text-slate-600">占い</p>
        <p className="mt-1 text-slate-900">{fortune}</p>
      </div>
    </section>
  );
}
