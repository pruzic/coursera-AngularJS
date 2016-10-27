(function() {
'use strict';

  angular.module("NarrowItDownApp", [])
  .controller("NarrowItDownController", NarrowItDownController)
  .service("MenuSearchService", MenuSearchService)
  .directive("foundItems", FoundItemsDirective)
  .constant("ApiBasePath", "https://davids-restaurant.herokuapp.com");


  function FoundItemsDirective(){
    var ddo = {
        templateUrl: 'foundItems.html',
      scope: {
        found: '<',
        onRemove: '&'
      },
      controller: NarrowItDownDirectiveController,
      controllerAs: 'narrowDown',
      bindToController: true
    };
    return ddo;
  } //end of FoundItemsDirective

  function NarrowItDownDirectiveController(){
    var foundMenu = this;
      foundMenu.foundMenuList = function(){
        if(foundMenu.found !== undefined){
          if(foundMenu.found.length === 0)
          {
              return true;
          }
          else
          {
            return false;
          }
        }
      };

      foundMenu.tableHeaderShow = function(){
        if(foundMenu.found !== undefined){
          if(foundMenu.found.length > 0){
           return true;
         }
         else {

           return false;
         }
        }
        else {

          return false;
        }
      };
  } //end of NarrowItDownDirectiveController

  NarrowItDownController.$inject = ['MenuSearchService'];
  function NarrowItDownController(MenuSearchService){
    var narrowDCntr = this;
    narrowDCntr.searchTerm = "";

    narrowDCntr.found;

    narrowDCntr.searchMenu = function(){
        //console.log(narrowDCntr.searchTerm);
      var promise = MenuSearchService.getMatchedMenuItems(narrowDCntr.searchTerm);
          promise.then(function(response){
            narrowDCntr.found = response;
          })
          .catch(function (erro){
            console.log(error);
          });
     };

     narrowDCntr.removeItem = function(itemIndex){
        narrowDCntr.found.splice(itemIndex, 1);
     };

  } //end of NarrowItDownController controller

  MenuSearchService.$inject = ['$http', '$q', 'ApiBasePath'];
  function MenuSearchService($http, $q, ApiBasePath){
    var service = this;

    service.getMatchedMenuItems = function(searchTerm) {
    var  deferred = $q.defer();

       return  $http({
           method: "GET",
           url: (ApiBasePath + "/menu_items.json")
         }).then(function(response){
          var foundItems = [];
          var data = response.data["menu_items"];
          for(var key in data)
        {
          if(data.hasOwnProperty(key)){
          var toFindItm = data[key];
          var desc = toFindItm["description"];
          if(desc.toLowerCase().indexOf(searchTerm.toLowerCase()) > 0){
              foundItems.push(toFindItm);
            }
          }
        }
          deferred.resolve();
          return foundItems;
      })
      .catch(function(error){
        deferred.reject(error);
      });

    };

  } //end of MenuSearchService service

}) ();
