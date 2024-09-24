"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { NewUser, users } from "@/lib/db/schema";
import { hashPassword, setSession } from "@/lib/auth/session";

import { formSchemaRegister } from "@/types/user";

interface RegisterUserProps {
  values: z.infer<typeof formSchemaRegister>;
  isAuth: boolean;
}

export const registerUser = async ({ values, isAuth }: RegisterUserProps) => {
  try {
    const { name, email, password } = values;

    const user = await db
      .select()
      .from(users)
      .where(and(eq(users.email, email)))
      .limit(1);

    if (user.length > 0) {
      return {
        response: "error",
        message: "El usuario ya se encuentra registrado",
      };
    }

    const passwordHash = await hashPassword(password);

    const newUser: NewUser = {
      name,
      email,
      password: passwordHash,
      role: "default",
    };

    const [createdUser] = await db.insert(users).values(newUser).returning();

    if (!createdUser) {
      return {
        response: "error",
        message: "Error al crear el usuario. Por favor intentalo de nuevo.",
      };
    }

    if (isAuth) {
      await setSession(createdUser);
    }

    return { response: "success", message: "Usuario registrado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
