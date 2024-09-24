"use server";

import { z } from "zod";
import { and, eq } from "drizzle-orm";

import { db } from "@/lib/db/drizzle";
import { User, users } from "@/lib/db/schema";
import { hashPassword } from "@/lib/auth/session";

import { formSchemaEditUser } from "@/types/user";

interface EditUserProps {
  values: z.infer<typeof formSchemaEditUser>;
  id: User["id"];
}

export const editUser = async ({ values, id }: EditUserProps) => {
  try {
    const { name, email } = values;

    if (values.password && values.password !== "") {
      const passwordHash = await hashPassword(values.password);

      await db
        .update(users)
        .set({ name, email, password: passwordHash })
        .where(and(eq(users.id, id)))
        .returning();
    } else {
      await db
        .update(users)
        .set({ name, email })
        .where(and(eq(users.id, id)))
        .returning();
    }

    return { response: "success", message: "Usuario editado" };
  } catch (error) {
    return { response: "error", message: `Ha ocurrido un error: ${error}` };
  }
};
