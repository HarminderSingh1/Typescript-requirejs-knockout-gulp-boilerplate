/// <reference path="../../3rdParty/Jasmine/Jasmine.d.ts"/>
/// <reference path="../../3rdParty/Requirejs/Require.d.ts"/>

describe("Client Tests", function(){
    it("get message result has expected properties ", function(done){
       require(["../../generated/client/client"], function(client){
           var c = new client.Client();
           var message = c.getMessage();         
            expect(message.clientId).toBeTruthy();            
            done();
       });
    });
    
});