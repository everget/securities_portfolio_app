(function (window, angular, undefined) {
	'use strict';

	angular.module('stockApp').config(TabsRouter);

	TabsRouter.$inject = ['$routeProvider'];

	function TabsRouter($routeProvider) {
		var tableConfig = {
			templateUrl: 'stocks.table.view.html',
			controller: 'StocksCtrl',
			controllerAs: 'vm',
		};

		var summaryConfig = {
			templateUrl: 'summary.view.html',
			controller: 'StocksCtrl',
			controllerAs: 'vm',
		};

		$routeProvider
			.when('/', tableConfig)
			.when('/summary', summaryConfig)
			.when('/:status', tableConfig)
			.otherwise({
				redirectTo: '/',
			});
	}
})(window, window.angular);
