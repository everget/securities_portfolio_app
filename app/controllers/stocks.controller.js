(function (window, angular, undefined) {
	'use strict';

	angular.module('stockApp').controller('StocksCtrl', StocksCtrl);

	StocksCtrl.$inject = [
		'$scope',
		'$route',
		'$routeParams',
		'$filter',
		'TabsCollection',
		'Stock',
		'StocksCollection',
	];

	function StocksCtrl(
		$scope,
		$route,
		$routeParams,
		$filter,
		TabsCollection,
		Stock,
		StocksCollection
	) {
		var vm = this;

		// Табы-вкладки
		// Контроллер получает массив табов с атрибутами
		vm.tabs = TabsCollection.tabs;

		vm.currentTab = TabsCollection.currentTab;

		vm.clickOnTab = function (title) {
			return TabsCollection.clickOnTab(title);
		};

		vm.isActiveTab = function (title) {
			return TabsCollection.isActiveTab(title);
		};

		// Контроллер использует сервис Stock и объект фабрики StocksCollection
		vm.stocks = StocksCollection.stocks;

		// Добавление акций в таблицу
		vm.addStock = function (name, price, quantity) {
			var stock = new Stock(name, price, quantity);

			StocksCollection.add(stock);

			// Поля чистятся
			vm.inputName = '';
			vm.inputPrice = '';
			vm.inputQuantity = '';
		};

		// Состояние ячейки 'Тек.цена' перед изменением цены
		vm.setPriceState = function (stock) {
			return StocksCollection.setPriceState(stock);
		};

		// Состояние ячейки 'Тек.цена' после изменения цены
		vm.changePriceState = function (stock) {
			return StocksCollection.changePriceState(stock);
		};

		// Состояние ячейки 'Тек.цена' при новом изменении цены
		vm.newPriceState = function (stock) {
			return StocksCollection.newPriceState(stock);
		};

		// Для определения подсветки надо сравнить среднюю цену с текущей
		vm.priceHasChanged = function (stock) {
			return StocksCollection.priceHasChanged(stock);
		};

		// Общее число позиций
		vm.totalCount = function () {
			return StocksCollection.totalCount();
		};

		// Текущая стоимость отдельной позиции
		vm.currentPrice = function (stock) {
			return StocksCollection.currentPrice(stock);
		};

		// Общая стоимость портфеля
		vm.totalPrice = function () {
			return StocksCollection.totalPrice();
		};

		// Общий размер дохода/убытка по позициям
		vm.totalProfit = function () {
			return StocksCollection.totalProfit();
		};

		// Процентное соотношение стоимости отдельной позиции к стоимости всего портфеля
		vm.percentOf = function (stock) {
			return StocksCollection.percentOf(stock);
		};

		// Расчет дохода/убытка
		vm.profitCalc = function (stock) {
			var calc = StocksCollection.profitCalc(stock);
			if (calc > 0) {
				vm.profitColor = 'text-success';
			} else if (calc < 0) {
				vm.profitColor = 'text-danger';
			}
			return calc;
		};

		// Вотч на число убыточных и доходных позиций
		$scope.$watch(
			'vm.stocks',
			function () {
				vm.profitCount = $filter('filter')(vm.stocks, { marker: 'bg-success' }).length;
				vm.lossCount = $filter('filter')(vm.stocks, { marker: 'bg-danger' }).length;
			},
			true
		);

		// При изменении пути фильтр акций получает соответствующий параметр - маркер позиции
		$scope.$on('$routeChangeSuccess', function () {
			var routeState = $routeParams.status || '';
			vm.statusFilter =
				routeState === 'profit'
					? { marker: 'bg-success' }
					: routeState === 'loss'
						? { marker: 'bg-danger' }
						: {};
		});
	}
})(window, window.angular);
