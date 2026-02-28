import { useEffect } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { citySchema, type CityFormValues } from "../lib/validation";
import { Button } from "./ui/button";
import { Input } from "./ui/input";

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
      <label className="block text-sm font-semibold text-slate-700" htmlFor="city">
        都市名
      </label>
      <div className="flex flex-col gap-3 sm:flex-row">
        <Input
          id="city"
          type="text"
          placeholder="例: 東京 / Osaka"
          className="flex-1"
          {...register("city")}
        />
        <Button type="submit" disabled={isSubmitting} className="sm:w-32">
          検索する
        </Button>
      </div>
      {errors.city ? <p className="text-sm font-medium text-rose-600">{errors.city.message}</p> : null}
    </form>
  );
}
