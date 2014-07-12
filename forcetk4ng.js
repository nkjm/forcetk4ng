angular.module('forcetk4ng', [])
.service('force', function($http, $q){
    this.apiVersion = 'v30.0';

    var headers = {}; 
    headers['Content-Type'] = 'application/json';

    this.setAccessToken = function(accessToken){
        this.accessToken = accessToken;
        headers['Authorization'] = 'OAuth ' + this.accessToken;
    }

    this.setApiVersion = function(apiVersion){
        this.apiVersion = apiVersion;
    }

    this.ajax = function(path, method, responseType){
        var d = $q.defer();

        $http({
            method: method || 'GET',
            url: 'https://' + location.hostname + path,
            headers: headers,
            responseType: responseType || 'text/json'
        })
        .success(function(data, status, headers, config){
            d.resolve(data);
        })
        .error(function(data, status, headers, config){
            d.reject(data);
        });

        return d.promise;   
    }

    this.query = function(soql){
        var d = $q.defer();

        $http({
            method: 'GET',
            url: 'https://' + location.hostname + '/services/data/' + this.apiVersion + '/query/?q=' + escape(soql),
            headers: headers,
            responseType: 'text/json'
        })
        .success(function(data, status, headers, config){
            d.resolve(data.records);
        })
        .error(function(data, status, headers, config){
            d.reject(data);
        });

        return d.promise;
    }

    this.retrieve = function(objectType, id, fields){
        var d = $q.defer();

        if (fields != null && fields.length > 0){
            var fieldsInCsv = '';
            angular.forEach(fields, function(field, key){
                fieldsInCsv += field + ',';
            })
            fieldInCsv = fieldInCsv.slice(0, fieldInCsv.length - 1);
            fieldsInCsvInUri = fieldsInCsv ? '?fields=' + fieldsInCsv : '';
        } else {
            fieldsInCsvInUri = '';
        }

        $http({
            method: 'GET',
            url: 'https://' + location.hostname + '/services/data/' + this.apiVersion + '/sobjects/' + objectType + '/' + id + fieldsInCsvInUri,
            headers: headers,
            responseType: 'text/json'
        })
        .success(function(data, status, headers, config){
            d.resolve(data);
        })
        .error(function(data, status, headers, config){
            d.reject(data);
        });

        return d.promise;
    }

    this.create = function(objectType, record){
        var d = $q.defer();

        $http({
            method: 'POST',
            url: 'https://' + location.hostname + '/services/data/' + this.apiVersion + '/sobjects/' + objectType + '/',
            headers: headers,
            responseType: 'text/json',
            data: record
        })
        .success(function(data, status, headers, config){
            d.resolve(data);
        })
        .error(function(data, status, headers, config){
            d.reject(data);
        });

        return d.promise;
    }

    this.update = function(objectType, record){
        var d = $q.defer();

        var params = {};
        params['_HttpMethod'] = 'PATCH';

        var id = record.Id;
        delete record.$$hashKey;
        delete record.Id;

        $http({
            method: 'PATCH',
            url: 'https://' + location.hostname + '/services/data/' + this.apiVersion + '/sobjects/' + objectType + '/' + id,
            headers: headers,
            responseType: 'text/json',
            data: record,
            params: params
        })
        .success(function(data, status, headers, config){
            d.resolve(data);
        })
        .error(function(data, status, headers, config){
            d.reject(data);
        });

        return d.promise;
    }

    this.upsert = function(objectType, extIdField, extId, record){
        var d = $q.defer();

        var params = {};
        params['_HttpMethod'] = 'PATCH';

        var id = record.Id;
        delete record.$$hashKey;
        delete record.Id;

        $http({
            method: 'PATCH',
            url: 'https://' + location.hostname + '/services/data/' + this.apiVersion + '/sobjects/' + objectType + '/' + extIdField + '/' + extId,
            headers: headers,
            responseType: 'text/json',
            data: record,
            params: params
        })
        .success(function(data, status, headers, config){
            d.resolve(data);
        })
        .error(function(data, status, headers, config){
            d.reject(data);
        });

        return d.promise;
    }

    this.delete = function(objectType, id){
        var d = $q.defer();

        $http({
            method: 'DELETE',
            url: 'https://' + location.hostname + '/services/data/' + this.apiVersion + '/sobjects/' + objectType + '/' + id,
            headers: headers,
            responseType: 'text/json'
        })
        .success(function(data, status, headers, config){
            d.resolve(data);
        })
        .error(function(data, status, headers, config){
            d.reject(data);
        });

        return d.promise;
    }
});
