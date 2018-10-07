apim.setvariable('request.headers.content-type', 'application/x-www-form-urlencoded');
//Get Request Body which is in x-www-form-urlencoded
var resp = apim.getvariable('request.body');
var it = resp.item(0).toBuffer().toString();
//example of it - grant_type=password&realm=webcustomer
var its = it.split("&");
//example of its - grant_type=password
var itsa = its[0].split("=");
//example of itsa - grant_type
var itsb = its[1].split("=");
//example of itsb - realm

apim.setvariable('message.body.undefined', 'grant_type=' + itsa[1] + '&realm=' + itsb[1]);
