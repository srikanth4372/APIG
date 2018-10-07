//Get consumer IP address and request body
var reqIp = apim.getvariable('request.headers.x-client-ip');
var reqBody = apim.getvariable('request.body');

//Get static Consumer IP address which are defined in designer for decryption
var webserverIP1 = apim.getvariable('webserverIP1');
var webserverIP2 = apim.getvariable('webserverIP2');

//Logic for decrypting the request paramter based on consumer IP address
if (reqIp === webserverIP1 || reqIp === webserverIP2) {
    var reqHeader = apim.getvariable('request.headers.authorization');
    var plainauth = new Buffer(decrypt(reqHeader), 'base64').toString('ascii');
    apim.setvariable('plainauth', plainauth);
}

//AES decryption function for given encryptionKey and iv
function decrypt(reqHeader) {
    const crypto = require('crypto');
    var encryptionKey = '1234567890123456';
    var iv = '1234567890123456';
    console.error(reqHeader);
    var decipher = crypto.createDecipheriv('aes128-cbc', Buffer.from(encryptionKey, 'utf8'), Buffer.from(iv, 'utf8'));
    decipher.update(reqHeader, 'hex');
    return decipher.final();
}
