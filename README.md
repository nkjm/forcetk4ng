PREREQUISITES
==============
- AngularJS ($http and $q which should be supported in modern releases are required.)
- Visualforce (Current version of forcetk4ng only runs on Visualforce.)

Getting Started
===============
Step 1. Upload angular.min.js and forcetk4ng as Static Resource.
-------------------------------------------------------------------
    angular.min.js
        Name: angular_min_js
        Cache Control: Public

    forcetk4ng.js
        Name: forcetk4ng_js
        Cache Control: Public

Step 2. Load the script.
-------------------------------------------------------------------
    <script src="{!$Resource.angular_min_js"></script>
    <script src="{!$Resource.forcetk4ng_js"></script>

Step 3. Load the module.
---------------------------------------------
    angular.module('yourApp', ['forcetk4ng'])

Step 4. Declare Depedency in controller.
------------------------------------------------------------------------------------------------------
    .controller('yourCtl', function($scope, force){

Step 5. Set Session ID
    force.setAccessToken('{!$Api.Session_ID}');

Step 5. Use the service. (Get records of certain object.)
----------------------------------------------------------------
    $scope.getRecordsOfYourObj = function(){
        var soql = "select Id, Name from yourObj";
        force.query(soql)
        .then(
            function(records){
                console.log(records);
            },
            function(event){
                console.log(event);
            }
        );
    }

Sample Code
===========
    <apex:page standardStylesheets="false" showHeader="false" applyHtmlTag="false" applyBodyTag="false" docType="html-5.0">
    <html ng-app="ngbootcamp">
    <head>
    <script src="{!$Resource.angular_min_js}"></script>
    <script src="{!$Resource.forcetk4ng_js}"></script>

    <script>
    angular.module('ngbootcamp', ['forcetk4ng'])
    .controller('guestCtl', function($scope, force){
    
        force.setAccessToken('{!$Api.Session_ID}');
        $scope.guest = {};
        
        $scope.getGuests = function(){
            var soql = "select Id, Name from guest__c";
            force.query(soql)
            .then(
                function(records){
                    $scope.guest.records = records;
                },
                function(event){
                    console.log(event);
                }
            );
        }
    });
    </script>
    </head>
    
    <body>
        <div ng-controller="guestCtl">
            <button ng-click="getGuests()">Retrieve Guests</button>
            <div ng-repeat="record in guest.records">
                {{record.Name}}
            </div>
        </div>
    </body>
    </html>
    </apex:page>


Supported Methods
=================
- force.setAccessToken(ACCESS_TOKEN)
- force.setApiVersion(API_VERSION)
- force.ajax(PATH, METHOD, RESPONSE_TYPE)
- force.query(SOQL)
- force.retrieve(OBJECT_TYPE, RECORD_ID, FIELDS)
- force.create(OBJECT_TYPE, RECORD)
- force.update(OBJECT_TYPE, RECORD)
- force.upsert(OBJECT_TYPE, EXTERNAL_ID_FIELD, EXTERNAL_ID, RECORD)
- force.delete(OBJECT_TYPE, RECORD_ID)
- force.describe(OBJECT_TYPE)
