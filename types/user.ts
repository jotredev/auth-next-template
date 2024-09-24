import { z } from "zod";

export const formSchemaLogin = z.object({
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z.string().min(8, {
    message: "La contraseña es requerida",
  }),
});

export const formSchemaRegister = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z.string().min(8, {
    message: "La contraseña debe contener al menos 8 caracteres",
  }),
});

export const formSchemaEditUser = z.object({
  name: z.string().min(2, {
    message: "El nombre es requerido",
  }),
  email: z
    .string()
    .min(2, {
      message: "El email es requerido",
    })
    .email({
      message: "El email no es válido",
    }),
  password: z
    .string()
    .optional()
    .refine((value) => !value || value.length >= 8, {
      message: "La contraseña debe tener al menos 8 caracteres",
    }),
});
