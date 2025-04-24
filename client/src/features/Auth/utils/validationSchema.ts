import { z } from "zod";

export const LoginValidation = z
  .object({
  email: z
    .string()
    .nonempty("メールアドレスは必須です")
    .email("正しいメールアドレスを入力してください"),
  password: z
    .string()
    .nonempty("パスワードは必須です")
    .min(6, "パスワードは6文字以上で入力してください"),
  });


export const RegisterValidation = z
  .object({
    name: z
      .string()
      .nonempty("名前は必須です")
      .min(4, "名前は4文字以上で入力してください"),
    email: z
      .string()
      .nonempty("メールアドレスは必須です")
      .email("正しい形式で入力してください"),
    password: z
      .string()
      .nonempty("パスワードは必須です")
      .min(6, "6文字以上で入力してください"),
    confirmPassword: z
      .string()
      .nonempty("確認用パスワードは必須です"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "パスワードが一致しません",
    path: ["confirmPassword"],
  });