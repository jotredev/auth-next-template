"use server";

import { db } from "@/lib/db/drizzle";
import { users } from "@/lib/db/schema";

export const getAllUsers = async () => {
  try {
    const res = await db.select().from(users);

    if (res.length <= 0) {
      return { response: "error", message: "Usuario no encontrado", data: [] };
    }
    return { response: "success", message: "Usuarios obtenidos", data: res };
  } catch (error) {
    return {
      response: "error",
      message: `Ha ocurrido un error: ${error}`,
      data: [],
    };
  }
};
