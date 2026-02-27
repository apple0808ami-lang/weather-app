import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { citySchema, type CityFormValues } from "../lib/validation";

type CitySearchFormProps = {
  defaultCity?: string;
  onSearch: (city: string) => void;
};

export function CitySearchForm({ defaultCity = "", onSearch }: CitySearchFormProps) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CityFormValues>({
    resolver: zodResolver(citySchema),
    defaultValues: {
      city: defaultCity,
    },
  });

  useEffect(() => {
    reset({ city: defaultCity });
  }, [defaultCity, reset]);

  const submitHandler = (values: CityFormValues) => {
    onSearch(values.city);
  };

  return (
    <form className="space-y-3" onSubmit={handleSubmit(submitHandler)}>
      <label className="block text-sm font-medium text-slate-700" htmlFor="city">
        都市名
      </label>
      <div className="flex gap-2">
        <input
          id="city"
          type="text"
          placeholder="例: Tokyo"
          className="w-full rounded-lg border border-slate-300 px-3 py-2 text-slate-900 outline-none ring-sky-200 focus:ring"
          {...register("city")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="rounded-lg bg-sky-500 px-4 py-2 font-medium text-white hover:bg-sky-600 disabled:cursor-not-allowed disabled:opacity-70"
        >
          検索
        </button>
      </div>
      {errors.city ? <p className="text-sm text-rose-600">{errors.city.message}</p> : null}
    </form>
  );
}
