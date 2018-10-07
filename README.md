# APIG


var serverStatusResponse = apim.getvariable('Verified.body');


var status = serverStatusResponse.Result.STATUS;

    
     var resp = apim.getvariable('request.body');
 var it = resp.item(0).toBuffer().toString();


if(status === 'ACTIVE'|| it.includes('public')){
    var its = it.split("&");
    var itsa = its[0].split("=");
    var itsb = its[1].split("=");



apim.setvariable('switch1',true);
apim.setvariable('message.headers.content-type','application/x-www-form-urlencoded');
apim.setvariable('message.body.undefined','grant_type='+itsa[1]+'&realm='+itsb[1]);
}
else{
apim.setvariable('switch1',false);
 var ResponseMessage = new Object();
 ResponseMessage.error = "unauthorized_client";
 
 ResponseMessage.error_description = serverStatusResponse.Result.MESSAGE;
 var jsonString= JSON.stringify(ResponseMessage);
apim.setvariable('message.body',jsonString);
apim.setvariable('message.status.code',401);
}


00045010
00045028
00045044
00045077
00045085


const crypto = require('crypto');
var encryptionKey = '1234567890123456';
var iv = '1234567890123456';
var plainText = 'c3Jpa2FudGhAeW9wbWFpbC5jb206cTEyMzQ1Njc4';
var cipher = crypto.createCipheriv('aes128-cbc',Buffer.from(encryptionKey, 'utf8'),Buffer.from(iv, 'utf8'));
cipher.update(plainText);
var encipherData = cipher.final('hex');
console.error(encipherData);
var decipher = crypto.createDecipheriv('aes128-cbc', Buffer.from(encryptionKey, 'utf8'),Buffer.from(iv, 'utf8')); 
decipher.update(encipherData,'hex');
var originalPlainText = decipher.final();
console.error(originalPlainText.toString());

var reqIp = apim.getvariable('request.headers.x-client-ip');
var reqBody = apim.getvariable('request.body');

var webserverIP1 = apim.getvariable('webserverIP1');
var webserverIP2 = apim.getvariable('webserverIP2');
if (reqIp === webserverIP1 || reqIp === webserverIP2 ) {
         
            var reqHeader = apim.getvariable('request.headers.authorization');
			var plainauth = new Buffer(decrypt(reqHeader), 'base64').toString('ascii');
            apim.setvariable('plainauth',plainauth);
}

function decrypt(reqHeader) {
	const crypto = require('crypto');
	var encryptionKey = '1234567890123456';
	var iv = '1234567890123456';
	console.error(reqHeader);
	var decipher = crypto.createDecipheriv('aes128-cbc', Buffer.from(encryptionKey, 'utf8'),Buffer.from(iv, 'utf8')); 
	decipher.update(reqHeader,'hex');
	return decipher.final();
}
 
  
 apim.setvariable('request.headers.content-type','application/x-www-form-urlencoded');
 var resp = apim.getvariable('request.body');
  var it = resp.item(0).toBuffer().toString();
    var its = it.split("&");
    var itsa = its[0].split("=");
    var itsb = its[1].split("=");
  
    apim.setvariable('message.body.undefined','grant_type='+itsa[1]+'&realm='+itsb[1]);
    
    
    var auth = apim.getvariable('request.headers.Authorization);

if (auth === undefined) {
  session.reject("Authorization header missing");
  return;
}

if (auth.substr(0,6) !== "Basic ") {
  session.reject("Authorization header Basic missing");
  return;
}

var decode = new Buffer(auth.substr(6), 'base64').toString('ascii');

var user = decode.split(":")[0];
var pass = decode.split(":")[1];




var serverStatusResponse = apim.getvariable('Verified.body');
var status = serverStatusResponse.Result[0].STATUS;
apim.setvariable('switch1',false);

if(status != 'ACTIVE'){
apim.setvariable('switch1',true);
}

console.error('Invoking LDB');
apim.setvariable('message.headers.content-type','application/json');


var auth = apim.getvariable('request.headers.Authorization);

if (auth === undefined) {
  session.reject("Authorization header missing");
  return;
}

if (auth.substr(0,6) !== "Basic ") {
  session.reject("Authorization header Basic missing");
  return;
}

var decode = new Buffer(auth.substr(6), 'base64').toString('ascii');

var user = decode.split(":")[0];
var pass = decode.split(":")[1];

console.error(user);
console.error(pass);

var reqBody = {
	"USERNAME": user,
	"PASSWORD": pass
}
   

apim.setvariable('message.body.data',reqBody);


