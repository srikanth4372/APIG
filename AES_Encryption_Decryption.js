const crypto = require('crypto');
var encryptionKey = '1234567890123456';
var iv = '1234567890123456';
var plainText = 'c3Jpa2FudGhAeW9wbWFpbC5jb206cTEyMzQ1Njc4';
//Creating Cipheriv for AES encryption with provided encryptionKey and iv
var cipher = crypto.createCipheriv('aes128-cbc',Buffer.from(encryptionKey, 'utf8'),Buffer.from(iv, 'utf8'));
cipher.update(plainText);
var encipherData = cipher.final('hex');
console.error(encipherData);
//Creating Decipheriv for AES encryption with provided encryptionKey and iv
var decipher = crypto.createDecipheriv('aes128-cbc', Buffer.from(encryptionKey, 'utf8'),Buffer.from(iv, 'utf8')); 
decipher.update(encipherData,'hex');
var originalPlainText = decipher.final();
console.error(originalPlainText.toString());
