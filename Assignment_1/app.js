(function() {
    'use strict'

    angular.module('LunchCheck', [])
        .controller('LunchCheckController', LunchCheckController);

    LunchCheckController.$inject = ['$scope'];

    function LunchCheckController($scope) {
        $scope.lunchMenu = "";
        $scope.message = "";
        $scope.lunchStyle = "";

        $scope.LunchMessage = function() {
            var menuMsg = CheckLunchMenu($scope.lunchMenu);
            $scope.message = menuMsg;
            $scope.lunchStyle = SetStyle(menuMsg);
        };

        //Set font and border color based on message.
        function SetStyle(message) {
            var style = "";

            switch (message) {
                case "Enjoy!":
                case "Too much!":
                    style = "green";
                    break;
                case "Please enter data first":
                    style = "red"
            }

            return style;
        }; //end of SetStyle function

        //Note: I do not consider an item if it is empty comma seprated items such as ,,,,
        function CheckLunchMenu(lunch) {
            //split funciton will return 1 if there is no items at all
            var lunchItems = lunch.split(",");

            return SetMessage(lunchItems);
        }; //end of CheckLunchMenu function

        //Function to set message accordingly
        function SetMessage(lunchItems) {

            var lunchMessage = "";

            //check for empty item
            var numOfEmptyItems = 0;
            numOfEmptyItems = CheckForEmptyItem(lunchItems);

            //split function will return 1 even if there is no items at all.
            switch (lunchItems.length) {

                case 1:
                case 2:
                case 3:

                    if (numOfEmptyItems < lunchItems.length) {
                        lunchMessage = "Enjoy!";
                    } else {
                        lunchMessage = "Please enter data first";
                    }
                    break;

                default:

                    if ((lunchItems.length - numOfEmptyItems) <= 3 && (lunchItems.length - numOfEmptyItems) > 0) {
                        //user entered at least one item.
                        lunchMessage = "Enjoy!";
                    } else if ((lunchItems.length - numOfEmptyItems) > 3) {
                        //user entered mored then 3 valid items. 
                        lunchMessage = "Too much!";
                    } else {
                        //No items entered. Let user know he/she should enter at least one item
                        lunchMessage = "Please enter data first";
                    }

                    break;
            }

            return lunchMessage;
        } //end of SetMessage function

        //Funciton to check for empty items
        function CheckForEmptyItem(lunchItems) {
            var numEmptyItems = 0;
            for (var i = 0; i < lunchItems.length; i++) {
                if (lunchItems[i] === "") {
                    numEmptyItems += 1;
                }
            }

            return numEmptyItems;
        } //end of CheckForEmptyItem function   

    }; // end of controller


})();