import CryptoJS from "crypto-js";
import { StateStorage } from "zustand/middleware";
import { ENCRYPT_KEY } from "@/configs/constants";

function encrypt(data: string, secret: string) {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secret);
  return ciphertext.toString();
}

function decrypt(data: string, secret: string) {
  const bytes = CryptoJS.AES.decrypt(data, secret);
  return JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
}

export const encryptStorage: StateStorage = {
  getItem: async (name: string): Promise<string | null> => {
    const raw = localStorage.getItem(name);
    if (!raw) return null;
    return decrypt(raw, ENCRYPT_KEY);
  },
  setItem: async (name: string, value: string): Promise<void> => {
    const raw = encrypt(value, ENCRYPT_KEY);
    return localStorage.setItem(name, raw);
  },
  removeItem: async (name: string): Promise<void> => {
    await localStorage.removeItem(name);
  },
};
