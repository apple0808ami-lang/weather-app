import { getFortuneByWeatherCode } from "../lib/weatherApi";
import type { WeatherData } from "../types/weather";
import { Card } from "./ui/card";

type WeatherResultSectionProps = {
  weather: WeatherData;
};

function MetricCard({ title, value, tone }: { title: string; value: string; tone: string }) {
  return (
    <div
      className={`rounded-2xl border p-4 transition-transform duration-200 hover:-translate-y-0.5 ${tone}`}
    >
      <p className="text-xs font-medium uppercase tracking-wider text-slate-500">{title}</p>
      <p className="mt-1 text-xl font-semibold text-slate-800">{value}</p>
    </div>
  );
}

export function WeatherResultSection({ weather }: WeatherResultSectionProps) {
  const fortune = getFortuneByWeatherCode(weather.weatherCode);

  return (
    <Card className="space-y-5">
      <header className="flex flex-wrap items-start justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-slate-800">
            {weather.city}, {weather.country}
          </h2>
          <p className="text-sm text-slate-500">
            緯度 {weather.latitude.toFixed(2)} / 経度 {weather.longitude.toFixed(2)}
          </p>
        </div>
        <span className="rounded-full border border-white/80 bg-white/70 px-3 py-1 text-xs font-semibold text-slate-600">
          code: {weather.weatherCode}
        </span>
      </header>

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        <MetricCard
          title="現在天気"
          value={`${weather.weatherText} (${weather.weatherIcon})`}
          tone="border-sky-100 bg-gradient-to-b from-pastel-sky to-white"
        />
        <MetricCard
          title="気温"
          value={`${weather.temperature} C`}
          tone="border-emerald-100 bg-gradient-to-b from-pastel-mint to-white"
        />
        <MetricCard
          title="風力"
          value={`${weather.windSpeed} km/h`}
          tone="border-orange-100 bg-gradient-to-b from-pastel-cream to-white sm:col-span-2 lg:col-span-1"
        />
      </div>

      <div className="rounded-2xl border border-violet-100 bg-gradient-to-r from-pastel-lilac to-white p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-slate-500">占い</p>
        <p className="mt-1 text-sm leading-relaxed text-slate-700">{fortune}</p>
      </div>
    </Card>
  );
}
