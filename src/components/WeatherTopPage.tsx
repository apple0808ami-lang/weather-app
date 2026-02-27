import { useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { fetchWeatherByCity } from "../lib/weatherApi";
import { CitySearchForm } from "./CitySearchForm";
import { ErrorMessage } from "./ErrorMessage";
import { LoadingIndicator } from "./LoadingIndicator";
import { WeatherResultSection } from "./WeatherResultSection";

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
    <main className="min-h-screen bg-gradient-to-b from-sky-100 via-emerald-50 to-amber-50 px-4 py-8">
      <div className="mx-auto w-full max-w-2xl space-y-6">
        <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
          <h1 className="mb-1 text-2xl font-bold text-slate-900">天気情報確認アプリ</h1>
          <p className="mb-4 text-sm text-slate-600">都市名を入力して現在の天気を確認できます。</p>
          <CitySearchForm defaultCity={city} onSearch={handleSearch} />
        </section>

        {weatherQuery.isLoading ? <LoadingIndicator /> : null}
        {weatherQuery.isError ? <ErrorMessage message={errorMessage} /> : null}
        {weatherQuery.data ? <WeatherResultSection weather={weatherQuery.data} /> : null}
      </div>
    </main>
  );
}
