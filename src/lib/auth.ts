// Sessão simples de admin: um cookie assinado (HMAC), sem tabela de usuário.
// Usa Web Crypto (funciona tanto em rota normal quanto no middleware/edge).

const SEVEN_DAYS = 60 * 60 * 24 * 7;
export const ADMIN_COOKIE = "bc_admin_session";

function getSecret(): string {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET não configurado no .env");
  return secret;
}

async function hmac(data: string): Promise<string> {
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(getSecret()),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["sign"]
  );
  const sig = await crypto.subtle.sign("HMAC", key, new TextEncoder().encode(data));
  return Buffer.from(sig).toString("hex");
}

export async function createSessionToken(): Promise<string> {
  const issuedAt = Date.now().toString();
  const sig = await hmac(issuedAt);
  return `${issuedAt}.${sig}`;
}

export async function isValidSessionToken(token: string | undefined | null): Promise<boolean> {
  if (!token) return false;
  const [issuedAt, sig] = token.split(".");
  if (!issuedAt || !sig) return false;
  const expected = await hmac(issuedAt);
  if (expected !== sig) return false;
  const age = (Date.now() - Number(issuedAt)) / 1000;
  return age >= 0 && age < SEVEN_DAYS;
}

export function checkAdminPassword(password: string): boolean {
  return password === process.env.ADMIN_PASSWORD;
}
