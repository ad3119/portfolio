var app = angular.module('portfolioApp', ['ngRoute', 'ngSanitize']);
app.config(function($routeProvider) {
    $routeProvider
    	.when('/admin', {
    		templateUrl: 'pages/admin.html',
            controller: 'PortalCtrl'
    	})
    	.when('/design', {
    		templateUrl: 'pages/designer.html',
            controller: 'DesignCtrl'
    	})
        .when('/rules', {
            templateUrl: 'pages/rules.html',
            controller: 'DesignCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'pages/dashboard.html',
            controller: 'DesignCtrl'
        })
        .when('/dashboard', {
            templateUrl: 'pages/dashboard.html',
            controller: 'DesignCtrl'
        })
        .otherwise({
            redirectTo: '/dashboard'
        });

});
app.controller('PortalCtrl', ['$scope','$http', function ($scope,$http) {
    $scope.pages = ["Home", "Product", "Cart", "Camera"];
    $scope.align = ["Horizontal","Vertical"];
    var showError = false;
   // var defaultAlign = $scope.align[0]; 
    var getWidgets = function() {
    	$http({
            url: adminConfig.widgetsBaseURL+'/getPortalWidgets',
            method:  'GET',
            async:   false
        }).
        success(function(data, status, headers, config) {
		if(data.code == "500" && data.object != null){
        	$scope.widgets = data.object;
        	console.log("data fetched::"+JSON.stringify(data.object));
        	for(var i = 0; i < $scope.widgets.length; i++) {
        		$scope.widgets[i].addDisable = $scope.widgets[i].addedToPage;
        		$scope.widgets[i].deleteDisable = !$scope.widgets[i].addedToPage;
        		$scope.widgets[i].showError = showError;
        		$scope.widgets[i].selectedPages = $scope.widgets[i].pagesList;
                if($scope.widgets[i].align == "Vertical") {
                	console.log("Inside vertical" + $scope.widgets.align);
                	$scope.widgets[i].selectedAlignment =  $scope.align[1];
                }
                else {
                	console.log("Inside horizontal"+$scope.widgets.align);
                	$scope.widgets[i].selectedAlignment =  $scope.align[0];
                }
        	}
		}
		else {
			alert("Error in getting widgets")
		}
        })
    }
    
    getWidgets();
    
    $scope.addWidget = function(widget) {
    	if(widget.selectedPages.length != "0") {
            widget.showError = false;
        	var data = {
        		widgetId : widget.widgetId,
        		pages : widget.selectedPages, 
        		align : widget.selectedAlignment
         	}
        	$http({
                url: adminConfig.widgetsBaseURL+'/addToPage',
                method:  'POST',
                async:   false,
                data:data
            }).success(function(data){
				if(data.code == "500") {
					widget.addDisable = true;
					widget.deleteDisable = false;
				}
				else {
					alert("Error while adding")
				}
            });
        }
        else {
            widget.showError = true;
        }
    }
    $scope.deleteWidget = function(widget) {
    	$http({
            url: adminConfig.widgetsBaseURL + '/deleteFromPage',
            method:  'POST',
            async:   false,
            data:widget.widgetId
        }).
        success(function(data, status, headers, config) {
		if(data.code == "500") {
        	 console.log('Inisde deleteWidget:'+widget);
        	 widget.selectedPages = "";
             widget.addDisable = false;
             widget.deleteDisable = true;
		}
		else {
			alert("Error while deleting")
		}
        });
     }
}]);

app.controller('DesignCtrl',['$scope','$http','$sce', function ($scope,$http,$sce) {
    $scope.image = "widget1.png"
    $scope.editDivShow = false;
    $scope.availableWidgets = [];
    $scope.newWidgetHeader = '';
    $scope.newWidgetPreviewDiv = '';
    var getWidgets = function() {
    	$http({
            url: adminConfig.widgetsBaseURL+'/fetchAllWidgets',
            method:  'GET',
            async:   false
        }).
        success(function(data, status, headers, config) {
		if(data.code == "500" && data.object != null) {
        	$scope.availableWidgets = data.object;
        	for(var i = 0; i <= $scope.availableWidgets.length -1 ; i++) {
                $scope.availableWidgets[i].addDesignerDisable = $scope.availableWidgets[i].addedToPortal;
            	$scope.availableWidgets[i].deleteDesignerDisable = !$scope.availableWidgets[i].addedToPortal;
                $scope.availableWidgets[i].image = "widget"+$scope.availableWidgets[i].widgetId+".png" ;
            }
            $scope.clickedWidget = $scope.availableWidgets[0];
            $scope.addDisabled = $scope.clickedWidget.addDesignerDisable;
            $scope.deleteDisabled = !$scope.addDisabled;
            $scope.image = $scope.clickedWidget.image;
            $scope.snippet = $scope.clickedWidget.previewDivContent;
        }
		else {
			alert("Error while fetching widgets");
		}
		});
		
    }
    
    getWidgets();
     
    $scope.showPreview = function (widget) {
        $scope.clickedWidget = widget;
        $scope.image=$scope.clickedWidget.image;
        console.log(widget.previewDivContent);
        $scope.snippet = widget.previewDivContent;
        $scope.addDisabled = widget.addDesignerDisable;
        $scope.deleteDisabled = widget.deleteDesignerDisable;
        
    }
    $scope.addToPortal = function (argument) {
    	
    	$http({
            url: adminConfig.widgetsBaseURL+'/addToPortal',
            method:  'POST',
            async:   false,
            data:$scope.clickedWidget.widgetId
        }).
        success(function(data, status, headers, config) {
		if(data.code == "500") {
        	$scope.clickedWidget.addDesignerDisable = true;
        	$scope.addDisabled = $scope.clickedWidget.addDesignerDisable;
        	$scope.deleteDisabled = !$scope.addDisabled;
        	$scope.clickedWidget.deleteDesignerDisable = !$scope.clickedWidget.addDesignerDisable;
		}
		else  {
			alert("Error while adding");
		}
        });
    	
    }
    
    $scope.itemClass = function(item) {
        return item ===  $scope.clickedWidget ? 'active' : undefined;
    }
    
    $scope.add = function () {
    	$scope.editDivShow = !$scope.editDivShow
    }
    
    $scope.addNewWidget = function() {
    	console.log("Inside Add Widget");
		if($scope.availableWidgets != undefined) {
			widgetID  = $scope.availableWidgets.length+1;
		}
		else  {
			widgetID  = 1;
		}
        var jsonData = {
			widgetId : widgetID,
			addedToPortal : false,
            widgetHeader : $scope.newWidgetHeader,
            previewDivContent : $scope.newWidgetPreviewDiv
        }
        
        $http({
            url: adminConfig.widgetsBaseURL+'/addNewWidget',
            method:  'POST',
            async:   false,
            data:jsonData
        }).
        success(function(data, status, headers, config) {
        	$scope.add();
        	$scope.availableWidgets.push(jsonData);
        })
    }
    
    $scope.deleteFromPortal = function () {
    	console.log("Inisde delete from Portal"+$scope.clickedWidget.widgetId);
        $http({
            url: adminConfig.widgetsBaseURL+'/deleteFromPortal',
            method:  'POST',
            async:   false,
            data:$scope.clickedWidget.widgetId
        }).
        success(function(data, status, headers, config) {
		if(data.code == "500") {
            $scope.clickedWidget.addDesignerDisable = !$scope.clickedWidget.addDesignerDisable ;
            $scope.addDisabled = $scope.clickedWidget.addDesignerDisable;
            $scope.clickedWidget.deleteDesignerDisable =!$scope.clickedWidget.deleteDesignerDisable;
            $scope.deleteDisabled = $scope.clickedWidget.deleteDesignerDisable;
        }
		else{
			alert("Error while deleting")
		}
		})
    }
}]);

