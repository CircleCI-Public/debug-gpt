import CryptoJS from 'crypto-js';

export const encrypt = (plaintext: string, passphrase: string): string => {
  return CryptoJS.AES.encrypt(plaintext, passphrase).toString();
};

export const decrypt = (ciphertext: string, passphrase: string): string => {
  const bytes = CryptoJS.AES.decrypt(ciphertext, passphrase);
  const originalText = bytes.toString(CryptoJS.enc.Utf8);
  return originalText;
};
