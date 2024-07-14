import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("AOWQ4P0YEC4YXUKS");  //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('O3V2GCL1K2HNZ9Y7');   //十六位十六进制数作为密钥偏移量

//解密方法
export function Decrypt(word: string) {
    let encryptedHexStr = CryptoJS.enc.Hex.parse(word);
    let srcs = CryptoJS.enc.Base64.stringify(encryptedHexStr);
    let decrypt = CryptoJS.AES.decrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
    return decryptedStr.toString();
}

//加密方法
export function Encrypt(word: string) {
    let srcs = CryptoJS.enc.Utf8.parse(word);
    let encrypted = CryptoJS.AES.encrypt(srcs, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
    return encrypted.ciphertext.toString().toUpperCase();
}
