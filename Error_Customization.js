try{
//Reading past invoke response body
var serverStatusResponse = apim.getvariable('Verified.body');
var status = serverStatusResponse.Result.STATUS;
//Reading request body paramters 
//Content-type application/x-www-form-urlencoded
var resp = apim.getvariable('request.body');
var it = resp.item(0).toBuffer().toString();
if (status === 'ACTIVE' || it.includes('public')) {
    var its = it.split("&");
    var itsa = its[0].split("=");
    var itsb = its[1].split("=");
    apim.setvariable('switch1', true);
    apim.setvariable('message.headers.content-type', 'application/x-www-form-urlencoded');
    apim.setvariable('message.body.undefined', 'grant_type=' + itsa[1] + '&realm=' + itsb[1]);
} else {
    apim.setvariable('switch1', false);
    //Creating custom error message 
    var ResponseMessage = new Object();
    ResponseMessage.error = "unauthorized_client";
    ResponseMessage.error_description = serverStatusResponse.Result.MESSAGE;
    var jsonString = JSON.stringify(ResponseMessage);
    //setting response object and status code
    apim.setvariable('message.body', jsonString);
    apim.setvariable('message.status.code', 401);
}


 }
catch(err) {
    apim.error('MyError', 500, 'Internal Error', 'One of the backend service is not as expected.');
}
