import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity } from "../lib/weatherApi";
import { CitySearchForm } from "./CitySearchForm";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingIndicator } from "./LoadingIndicator";
import { WeatherResultSection } from "./WeatherResultSection";
import { Card } from "./ui/card";

function readCityFromUrl() {
  if (typeof window === "undefined") {
    return "";
  }
  return new URLSearchParams(window.location.search).get("city")?.trim() ?? "";
}

function writeCityToUrl(city: string) {
  if (typeof window === "undefined") {
    return;
  }

  const params = new URLSearchParams(window.location.search);
  if (city) {
    params.set("city", city);
  } else {
    params.delete("city");
  }

  const query = params.toString();
  const nextUrl = query ? `${window.location.pathname}?${query}` : window.location.pathname;
  window.history.replaceState({}, "", nextUrl);
}

export function WeatherTopPage() {
  const [city, setCity] = useState("");

  useEffect(() => {
    const initialCity = readCityFromUrl();
    if (initialCity) {
      setCity(initialCity);
    }
  }, []);

  const weatherQuery = useQuery({
    queryKey: ["weather", city],
    queryFn: () => fetchWeatherByCity(city),
    enabled: city.length > 0,
  });

  const errorMessage = useMemo(() => {
    if (!weatherQuery.isError) {
      return "";
    }
    if (weatherQuery.error instanceof Error) {
      return weatherQuery.error.message;
    }
    return "天気情報の取得に失敗しました";
  }, [weatherQuery.error, weatherQuery.isError]);

  const handleSearch = (nextCity: string) => {
    setCity(nextCity);
    writeCityToUrl(nextCity);
  };

  return (
    <main className="relative min-h-screen overflow-hidden px-4 py-6 sm:px-6 sm:py-10">
      <div className="pointer-events-none absolute -top-20 left-[-30px] h-64 w-64 animate-drift rounded-full bg-pastel-peach/70 blur-3xl" />
      <div className="pointer-events-none absolute right-[-20px] top-1/3 h-72 w-72 animate-drift rounded-full bg-pastel-mint/70 blur-3xl [animation-delay:1s]" />
      <div className="pointer-events-none absolute bottom-[-30px] left-1/3 h-72 w-72 animate-drift rounded-full bg-pastel-sky/70 blur-3xl [animation-delay:2s]" />

      <div className="relative mx-auto w-full max-w-4xl space-y-5">
        <Card className="space-y-4">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="inline-flex rounded-full border border-white/80 bg-white/65 px-3 py-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                2026 Modern Weather
              </p>
              <h1 className="mt-3 text-3xl font-bold tracking-tight text-slate-800 sm:text-4xl">
                天気検索
              </h1>
            </div>
          </div>
          <p className="text-sm leading-relaxed text-slate-600 sm:text-base">
            都市名を入力して現在の天気を確認できます。
          </p>
          <CitySearchForm defaultCity={city} onSearch={handleSearch} />
        </Card>

        {weatherQuery.isLoading ? <LoadingIndicator /> : null}
        {weatherQuery.isError ? <ErrorMessage message={errorMessage} /> : null}
        {weatherQuery.data ? <WeatherResultSection weather={weatherQuery.data} /> : null}
      </div>
    </main>
  );
}
