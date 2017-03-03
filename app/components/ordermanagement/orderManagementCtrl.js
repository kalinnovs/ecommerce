'use strict';

angular.module('eCommerce')
	.controller('OrderDetailCtrl', function($scope, OrderDetailService, $rootScope) {
		
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
				if(data.operationStatus){
					$rootScope.$broadcast("updateFlash", {"alertType": "success", "message": "Data savedd successfully."});
				}
			});
		}
	});