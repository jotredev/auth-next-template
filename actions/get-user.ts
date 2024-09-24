"use server";

import { and, eq, isNull } from "drizzle-orm";
import { db } from "@/lib/db/drizzle";
import { User, users } from "@/lib/db/schema";

export async function getUserById(id: User["id"]) {
  try {
    const user = await db.query.users.findFirst({
      where: and(eq(users.id, id), isNull(users.deletedAt)),
    });

    if (!user) {
      return {
        response: "error",
        message: "Usuario no encontrado",
        data: null,
      };
    }

    return {
      response: "success",
      message: "Usuario encontrado",
      data: user,
    };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: null,
    };
  }
}
