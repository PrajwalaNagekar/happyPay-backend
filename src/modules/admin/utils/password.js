import { createHash, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "node:crypto";
import { promisify } from "node:util";

const scrypt = promisify(scryptCallback);
const KEY_LENGTH = 64;

const hashPassword = async (password) => {
  const salt = randomBytes(16).toString("hex");
  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  return `${salt}:${Buffer.from(derivedKey).toString("hex")}`;
};

const verifyPassword = async (password, storedHash) => {
  const [salt, key] = storedHash.split(":");
  if (!salt || !key) return false;

  const derivedKey = await scrypt(password, salt, KEY_LENGTH);
  const storedKey = Buffer.from(key, "hex");
  const computedKey = Buffer.from(derivedKey);

  return storedKey.length === computedKey.length && timingSafeEqual(storedKey, computedKey);
};

const hashResetToken = (token) => createHash("sha256").update(token).digest("hex");

export { hashPassword, verifyPassword, hashResetToken };
