/// <reference path="../../3rdParty/Knockout/knockout.d.ts" />
// Knockout Component Registeration

import ko = require("knockout");
module ComponentRegistry
{
    ko.components.register("address", {
        viewModel: { require: 'Controls/Address/AddressViewModel' },
        template: { require: 'text!Controls/Address/Address.html' }
    });
    ko.components.register("test", {
        template: "<span>Knockout component with Text template</span>"
    });
}