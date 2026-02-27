import { z } from "zod";

export const citySchema = z.object({
  city: z
    .string()
    .trim()
    .min(1, "都市名は必須です")
    .max(100, "都市名は100文字以内で入力してください"),
});

export type CityFormValues = z.infer<typeof citySchema>;
