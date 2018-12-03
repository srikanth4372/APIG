**** Sample XML ****

 <Routing>        
    <partner name="Partner A" key="1">
        <from_ID>PartnerA-KEY1-INT</from_ID>
        <to_ID>PartnerA-KEY1-EXT</to_ID>
        <destination>PartnerA-KEY1-DESTINATION</destination>
    </partner>  
    <partner name="Partner B" key="2">
        <from_ID>PartnerB-KEY2-INT</from_ID>
        <to_ID>PartnerB-KEY2-EXT</to_ID>
        <destination>PartnerB-KEY2-DESTINATION</destination>
    </partner>
    <partner name="Partner C" key="3">
        <from_ID>PartnerC-KEY3-INT</from_ID>
        <to_ID>PartnerC-KEY3-EXT</to_ID>
        <destination>PartnerC-KEY3-DESTINATION</destination>
    </partner>  
</Routing>

 **** Corresponing Gateway Script *****

 var fs = require('fs');
 var transform = require('transform');
 var inputKey = 2; // for testing purpose, can be read from input
 fs.readAsXML(apim.getvariable('XMLResponse1.body'), function (error, xml) {
     if (error) {
         console.error(JSON.stringify(error));
         session.reject("Exception occured reading the input");
         return;
     } else {
         var options = {
             'expression': "/Routing/partner[@key='" + inputKey + "']",
             'xmldom': xml
         };
         transform.xpath(options, function (err, xmlNodeList) {           
                 var objType = xmlNodeList.item(0); // Element

                 var from_ID = objType.getElementsByTagName("from_ID");
                 var to_ID = objType.getElementsByTagName("to_ID");
                 var destination = objType.getElementsByTagName("destination");

                 var from_IDcont = from_ID.item(0).textContent;
                 var to_IDcont = to_ID.item(0).textContent;
                 var destinationcont = destination.item(0).textContent;           
         });
     }
 });

**** Response ******

from_IDcont = PartnerB-KEY2-INT
to_IDcont = PartnerB-KEY2-EXT
destinationcont = PartnerB-KEY2-DESTINATION 

*********************

var response = apim.getvariable('message.body');

var objType = response.item(0);

console.error(objType.getElementsByTagName("AFC_STATUS").item(0).textContent);
