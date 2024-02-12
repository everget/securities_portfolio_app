const app = angular.module('stockApp', ['ngRoute']);

app.run([
	'$rootScope',
	'$window',
	($rootScope, $window) => {
		const availableLanguages = ['en', 'ru', 'pt-BR'];
		const lang = $window.navigator.language || $window.navigator.userLanguage;
		$rootScope.currentLanguage = (availableLanguages.includes(lang) && lang) || 'en';
		$rootScope.availableLanguages = availableLanguages;
	},
]);

app.config(Router);
Router.$inject = ['$routeProvider'];
function Router($routeProvider) {
	const tableConfig = {
		templateUrl: 'src/views/stocks-table.view.html',
		controller: 'StocksCtrl',
		controllerAs: 'vm',
	};

	const summaryConfig = {
		templateUrl: 'src/views/summary.view.html',
		controller: 'StocksCtrl',
		controllerAs: 'vm',
	};

	// prettier-ignore
	$routeProvider
		.when('/', tableConfig)
		.when('/summary', summaryConfig)
		.when('/:status', tableConfig)
		.otherwise({
			redirectTo: '/',
		});
}
