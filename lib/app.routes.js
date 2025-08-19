angular.module('app', ['ngRoute'])
    .config(function ($routeProvider) {
        $routeProvider
            // .when('/', {
            //     templateUrl: 'main/main.html',
            //     controller: 'mainController'
            // })
            .when('/multi_select', {
                templateUrl: 'milti_select/view/milti_select.html',
                controller: 'multi_selectController'
            })
            // .when('/contact', {
            //     templateUrl: 'views/contact.html',
            //     controller: 'ContactController',
            // })
            .otherwise({
                redirectTo: '/'
            });
    });

var app = angular.module('app');