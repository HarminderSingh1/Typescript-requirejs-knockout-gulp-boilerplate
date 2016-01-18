/// <reference path="../../3rdParty/Jasmine/Jasmine.d.ts"/>
/// <reference path="../../3rdParty/Requirejs/Require.d.ts"/>

describe("Web UX Tests", function(){
    var testRequire;
    var textContext = "testContext;"
    var config = (<any>window).requireConfig;
   beforeEach(function(){       
       config.context = textContext;       
       testRequire = require.config(config);
   });
   
   afterEach(function(){
       testRequire = undefined;
       delete config.context;
       delete (<any>require).s.contexts[textContext];
   });
   
   it("Client returns message", function(done){
        testRequire(["jquery", "main/WebUx"], function($, ux){
           var webUx = new ux.WebUx($("#test_div"));
           expect(webUx.getMessage()).toBeTruthy();
           done();
       });
   });
});
