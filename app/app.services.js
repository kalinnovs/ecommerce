'use strict';

angular.module('eCommerce')
  .service('UserService', function ($http, $rootScope, ENDPOINT_URI) {
    var service = this;
    
    service.GetAll = function(url) {
        return $http.get(url).then(service.handleSuccess, service.handleError('Error getting all users'));
    }

    service.GetById = function(id) {
        return $http.get('/api/users/' + id).then(service.handleSuccess, service.handleError('Error getting user by id'));
    }
 
    service.GetByUsername = function(username) {
        return $http.get('/api/users/' + username).then(service.handleSuccess, service.handleError('Error getting user by username'));
    }
 
    service.Create = function(user) {
        return $http.post('/api/user/register', user);
    }
 
    service.Update = function(url, user) {
        return $http.put(url, user).then(service.handleSuccess, service.handleError('Error updating user'));
    }
 
    service.Delete = function(id) {
        return $http.delete('/api/users/' + id).then(service.handleSuccess, service.handleError('Error deleting user'));
    }
 
    // private functions
 
    service.handleSuccess = function(res) {
        service.set(res);
        return res.data;
    }
 
    service.handleError = function(res) {
        return function () {
            return { success: false, message: res.message };
        };
    }

    service.get = function() {
        return service.data;
    }

    service.set = function(data_) {
        service.data = data_;
        $rootScope.$broadcast('event:data-change');
    }

  });
