angular.module('stockApp').controller('StocksCtrl', StocksCtrl);

StocksCtrl.$inject = ['$scope', '$route', '$routeParams', '$filter', 'TabsCollection', 'Stock', 'StocksCollection'];

function StocksCtrl($scope, $route, $routeParams, $filter, TabsCollection, Stock, StocksCollection) {
	const vm = this;

	// Табы-вкладки
	// Контроллер получает массив табов с атрибутами
	vm.tabs = TabsCollection.tabs;

	vm.currentTab = TabsCollection.currentTab;

	vm.clickOnTab = function clickOnTab(title) {
		return TabsCollection.clickOnTab(title);
	};

	vm.isActiveTab = function isActiveTab(title) {
		return TabsCollection.isActiveTab(title);
	};

	// Контроллер использует сервис Stock и объект фабрики StocksCollection
	vm.stocks = StocksCollection.stocks;

	// Добавление акций в таблицу
	vm.addStock = (name, price, quantity) => {
		const stock = new Stock(name, price, quantity);

		StocksCollection.add(stock);

		// Поля чистятся
		vm.inputName = '';
		vm.inputPrice = '';
		vm.inputQuantity = '';
	};

	// Состояние ячейки 'Тек.цена' перед изменением цены
	vm.setPriceState = (stock) => StocksCollection.setPriceState(stock);

	// Состояние ячейки 'Тек.цена' после изменения цены
	vm.changePriceState = (stock) => StocksCollection.changePriceState(stock);

	// Состояние ячейки 'Тек.цена' при новом изменении цены
	vm.newPriceState = (stock) => StocksCollection.newPriceState(stock);

	// Для определения подсветки надо сравнить среднюю цену с текущей
	vm.priceHasChanged = (stock) => StocksCollection.priceHasChanged(stock);

	// Общее число позиций
	vm.totalCount = () => StocksCollection.totalCount();

	// Текущая стоимость отдельной позиции
	vm.currentPrice = (stock) => StocksCollection.currentPrice(stock);

	// Общая стоимость портфеля
	vm.totalPrice = () => StocksCollection.totalPrice();

	// Общий размер дохода/убытка по позициям
	vm.totalProfit = () => StocksCollection.totalProfit();

	// Процентное соотношение стоимости отдельной позиции к стоимости всего портфеля
	vm.percentOf = (stock) => StocksCollection.percentOf(stock);

	// Расчет дохода/убытка
	vm.profitCalc = (stock) => {
		const calc = StocksCollection.profitCalc(stock);
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
		() => {
			vm.profitCount = $filter('filter')(vm.stocks, { marker: 'bg-success' }).length;
			vm.lossCount = $filter('filter')(vm.stocks, { marker: 'bg-danger' }).length;
		},
		true
	);

	// При изменении пути фильтр акций получает соответствующий параметр - маркер позиции
	$scope.$on('$routeChangeSuccess', () => {
		const routeState = $routeParams.status || '';
		vm.statusFilter =
			// eslint-disable-next-line no-nested-ternary
			routeState === 'profit' ? { marker: 'bg-success' } : routeState === 'loss' ? { marker: 'bg-danger' } : {};
	});
}
