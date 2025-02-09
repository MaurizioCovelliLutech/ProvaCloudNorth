sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/SearchField",
    "sap/m/Dialog",
    "sap/m/List",
    "sap/m/StandardListItem",
	"sap/ui/model/odata/v2/ODataModel",
	"sap/ui/model/json/JSONModel",
	"sap/ui/core/Fragment",
	"sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator"

], function(Controller, SearchField, Dialog, List, StandardListItem,ODataModel,JSONModel,Fragment,MessageBox,Filter,FilterOperator) {
    "use strict";

    const sURL = "/V2/Northwind/Northwind.svc/";

    return Controller.extend("progetto1.controller.View1", {

        onInit: function () {

			const oRouter = this.getOwnerComponent().getRouter();
            oRouter.getRoute("RouteView1").attachPatternMatched(this.onRouteMatched, this);
        },

        onRouteMatched: async function () {

            var oModel = new ODataModel(sURL);

            const oData = await new Promise((resolve, reject) => {
                oModel.read("/Customers", {
                success: function(oData, response) {
                    resolve(oData);
                },
                    error: function(error) {
                }
        });
    });  
    
             this.getView().setModel(new JSONModel(oData.results), "modCustomer");

        },

        onTestSearch: function(oEvent) {

            var sQuery = oEvent.getSource().getValue();
            var oBinding = this.byId("customerTab").getBinding("items")

            var aFilters = [];

            if (sQuery) {
                aFilters.push(new Filter("CustomerID", FilterOperator.Contains, sQuery));
                aFilters.push(new Filter("CompanyName", FilterOperator.Contains, sQuery));
                aFilters.push(new Filter("City", FilterOperator.Contains, sQuery));
                aFilters.push(new Filter("Fax", FilterOperator.Contains, sQuery));
                oBinding.filter(new Filter(aFilters, false));
            } else {
                oBinding.filter([]);
            }
        },

        onNavigazione: function(oEvent){
            
            //var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            //oRouter.navTo("RouteView2");
            const oCustomerContext = oEvent.getSource().getBindingContext("modCustomer");
            const sCustomerId = oCustomerContext.getProperty("CustomerID");
            const sCompanyName = oCustomerContext.getProperty("CompanyName");
            const sContactName = oCustomerContext.getProperty("ContactName");
            const sContactTitle = oCustomerContext.getProperty("ContactTitle");
            const sAddress = oCustomerContext.getProperty("Address");
            const sPostalCode = oCustomerContext.getProperty("PostalCode");
          
            const oRouter = sap.ui.core.UIComponent.getRouterFor(this);
            oRouter.navTo("RouteView2", {
                customerId: sCustomerId,
                companyName: sCompanyName,
                contactName: sContactName,
                contactTitle: sContactTitle,
                address: sAddress,
                postalCode: sPostalCode
                
            });
              

            }

        });
    })