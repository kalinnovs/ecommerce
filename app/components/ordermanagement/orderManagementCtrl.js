'use strict';

angular.module('eCommerce')
	.controller('OrderDetailCtrl', function($scope, OrderDetailService) {
		
		$scope.getOrderList = function(){
			OrderDetailService.getOrderList().then(function(data){
				$scope.orderList = data.orderList
			});
		}
		
		$scope.saveOrder = function(order){
			var orderObj = {};
			orderObj.webOrderNumber = order.webOrderNumber;
			orderObj.trackId = order.trackId;
			orderObj.trackLink = order.trackURL;
			orderObj.state = order.orderState;

			OrderDetailService.saveOrder(orderObj).then(function(data){
				debugger;
				if(data.operationStatus){
					$scope
					$rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Data savedd successfully."});
				}
			});
		}
	});