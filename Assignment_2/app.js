(function() {

    "use strict";

    angular.module("ShoppingListCheckOff", [])
        .controller("AddItemController", AddItemController)
        .controller("ToBuyController", ToBuyController)
        .controller("AlreadyBoughtController", AlreadyBoughtController)
        .service("ShoppingListCheckOffService", ShoppingListCheckOffService);

    //inject service to controller
    AddItemController.$inject = ["ShoppingListCheckOffService"];
    function AddItemController(ShoppingListCheckOffService) {
        var adderItem = this;

        adderItem.name = "";
        adderItem.itemQuantity = "";

        adderItem.addItem = function() {
            //make sure correct data is entered
            if (isNumber(adderItem.itemQuantity) && adderItem.name.length > 0) {
                ShoppingListCheckOffService.addItem(adderItem.name, adderItem.itemQuantity);
            };

            adderItem.name = "";
            adderItem.itemQuantity = "";
        };
    } //End of AddItemController

    //Helper function to check if entered quantity value is number
    function isNumber(value) {

      var checkValue = false;

        if(value.length > 0)
        {
          checkValue = value % 1 === 0;
        }
        return checkValue;
    }; //End of isNumber function

    ToBuyController.$inject = ["ShoppingListCheckOffService"];
    function ToBuyController(ShoppingListCheckOffService) {
        var buyCntr = this;

        buyCntr.ItemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

        buyCntr.boughtItems = function(itemIndex){
            ShoppingListCheckOffService.itemBought(itemIndex);
          };
    } //End of ToBuyController

    AlreadyBoughtController.$inject = ["ShoppingListCheckOffService"];
    function AlreadyBoughtController(ShoppingListCheckOffService) {
      var boughtCntr = this;
      boughtCntr.ItemsBought = ShoppingListCheckOffService.getBoughtItems();
    } //End of AlreadyBoughtController

    //service
    function ShoppingListCheckOffService() {

        var service = this;

        var buyItems = [];
        var boughtItems = [];

        //prepopulate item
        buyItems = [
        {
            name: "Chocolate Chip Cookies",
            quantity: "3"
        },
        {
          name: "Double Chocolate Cookies",
          quantity: "5"
        },
        {
          name: "Cornflake Cookies",
          quantity: "10"
        },
        {
          name: "Raisin Cookies",
          quantity: "7"
        },
        {
          name: "Caramel Cookies",
          quantity: "10"
        }
      ];

        service.addItem = function(itemName, itemQuantity) {
            var item = {
                name: itemName,
                quantity: itemQuantity
            };

            buyItems.push(item);
        };

        service.itemBought = function(itemIndex) {
            boughtItems.push(buyItems[itemIndex]);
            buyItems.splice(itemIndex, 1);
        };

        service.getBoughtItems = function() {
            return boughtItems;
        };

        service.getItemsToBuy = function() {
            return buyItems;
        };

    }; //End of ShoppingListCheckOffService

})();
