/**
 * CryptoJS好像不支持GCM模式，所以这里使用了Node-Forge库
 */
import * as forge from "node-forge";

const keyStr = 'olwPE16ZnqHjPX5y'; // 这里我用的是base64所以没有对密钥进行转换，直接赋值，如果是16进制需要转换一下。

/**
 * @author huaqiang
 * @param word 加密数据
 * @description 加密数据
 */
export function encryptData(word: any) {
    const src = JSON.stringify(word);
    const iv = forge.random.getBytesSync(12); // 生成随机iv 12字节
    const cipher = forge.cipher.createCipher('AES-GCM', keyStr); // 生成AES-GCM模式的cipher对象 并传入密钥
    cipher.start({
        iv,
    });
    cipher.update(forge.util.createBuffer(forge.util.encodeUtf8(src)));
    cipher.finish();
    const encrypted = cipher.output;
    const {tag} = cipher.mode;
    return window.btoa(iv + encrypted.data + tag.data);
}


/**
 * @author huaqiang
 * @param word 解密数据
 * @description 解密数据
 */
export function decryptData(word: any) {
    const sss = decodeURIComponent(word.toString()); // 进行解码
    const data_msg = window.atob(sss);
    const iv = data_msg.slice(0, 12);
    const tag = data_msg.slice(-16);
    const data = data_msg.slice(12, data_msg.length - 16);
    const decipher = forge.cipher.createDecipher('AES-GCM', keyStr);
    decipher.start({
        iv,
        // @ts-ignore
        tag,
    });
    decipher.update(forge.util.createBuffer(data));
    decipher.finish();
    return decipher.output.toString();
}
