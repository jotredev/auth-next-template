import { promises as fs } from "node:fs";
import readline from "node:readline";
import crypto from "node:crypto";
import path from "node:path";

function question(query: string): Promise<string> {
  const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout,
  });

  return new Promise((resolve) =>
    rl.question(query, (ans) => {
      rl.close();
      resolve(ans);
    })
  );
}

async function getPostgresURL(): Promise<string> {
  console.log("Paso 1: Configuración de Postgres");
  const dbChoice = await question(
    "Debes utilizar una instancia remota de Postgres, ¿Ya tienes tu string de conexión?(y/n):"
  );

  if (dbChoice.toLowerCase() === "y") {
    return await question("Ingresa tu POSTGRES_URL: ");
  } else {
    console.log(
      "Te recomendamos utilizar una instancia de Postgres en la nube. como Neon Tech, https://neon.tech/home"
    );
    process.exit(1);
  }
}

function generateAuthSecret(): string {
  console.log("Paso 2: Gerando AUTH_SECRET...");
  return crypto.randomBytes(32).toString("hex");
}

async function writeEnvFile(envVars: Record<string, string>) {
  console.log("Paso 3: Escribiendo variables de entorno en .env...");
  const envContent = Object.entries(envVars)
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");

  await fs.writeFile(path.join(process.cwd(), ".env"), envContent);
  console.log(".env archivo creado con las variables necesarias.");
}

async function main() {
  const POSTGRES_URL = await getPostgresURL();
  const BASE_URL = "http://localhost:3000";
  const AUTH_SECRET = generateAuthSecret();

  await writeEnvFile({
    POSTGRES_URL,
    BASE_URL,
    AUTH_SECRET,
  });

  console.log("🎉 Instalación completada con éxito!");
}

main().catch(console.error);
