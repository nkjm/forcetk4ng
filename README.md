Overview
========
forcetk4ng is an AngularJS Module which provides easy access to Force.com REST API in your javascript code.

While Force.com Javascript REST Toolkit is already out there, forcetk4ng enables you to make your app a little bit more Angular way.
You can query/create/retrieve/update/upsert/delete/describe the object on Force.com using $q which is standard implementation of promise/deferred of AngularJS so that you can avoid deeply nested callback chain and keep your code clean when you do callout asyncronously.

And there is no dependency other than AngularJS itself.
You don't need jQuery or other library.

Please keep in mind that this tookit consumes API Call of Force.com on the contrary of RemoteTK which is included in Forc.ecom Javascript REST Toolkit.
If you have to be very sensitive about API Call consumption but need easy access to Force.com in your js code, you should go with RemoteTK.


Prerequisites
==============
- AngularJS ($http and $q which should be supported in modern releases are required.)
- Force.com Visualforce (Current version of forcetk4ng only runs on Visualforce.)

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

Step 2. Create Visualforce Page and Load the script.
-------------------------------------------------------------------
    <script src="{!$Resource.angular_min_js"></script>
    <script src="{!$Resource.forcetk4ng_js"></script>

Step 3. Inject forcetk4ng to your module.
---------------------------------------------
    angular.module('yourApp', ['forcetk4ng'])

Step 4. Declare Depedency in your controller.
------------------------------------------------------------------------------------------------------
    .controller('yourCtl', function($scope, force){

Step 5. Set Session ID
    force.setAccessToken('{!$Api.Session_ID}');

Step 5. Use the service. (Get records of certain object.)
----------------------------------------------------------------
    force.query("select Id, Name from yourObj")
    .then(
        // callback on success
        function(records){
            console.log(records);
        },
        // callback on failure
        function(event){
            console.log(event);
        }
    );

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
