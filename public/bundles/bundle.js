/******/ (() => {
	// webpackBootstrap
	/******/ var __webpack_modules__ = {
		/***/ './src/controllers/header.controller.js':
			/*!**********************************************!*\
  !*** ./src/controllers/header.controller.js ***!
  \**********************************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					angular.module('stockApp').controller('HeaderCtrl', HeaderCtrl);

					function HeaderCtrl() {
						var vm = this;
						vm.tada = 'tada';
					}
				})(window, window.angular);

				/***/
			},

		/***/ './src/controllers/stocks.controller.js':
			/*!**********************************************!*\
  !*** ./src/controllers/stocks.controller.js ***!
  \**********************************************/
			/***/ () => {
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

				/***/
			},

		/***/ './src/directives/language-switcher.directive.js':
			/*!*******************************************************!*\
  !*** ./src/directives/language-switcher.directive.js ***!
  \*******************************************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					angular.module('stockApp').directive('languageSwitcher', LanguageSwitcherDirective);

					LanguageSwitcherDirective.$inject = ['LanguageService'];

					function LanguageSwitcherDirective(LanguageService) {
						return {
							restrict: 'E',
							template: `
				<div class="language-switcher">
					<label class="language-switcher-option" ng-repeat="lang in languages">
						<input type="radio" ng-model="selectedLanguage" ng-value="{{lang}}" ng-change="changeLanguage()">
						{{ lang }}
					</label>
				</div>
			`,
							link: LanguageSwitcherLink,
						};

						function LanguageSwitcherLink(scope) {
							scope.languages = LanguageService.getAvailableLanguages();
							scope.selectedLanguage = LanguageService.getCurrentLanguage();

							scope.changeLanguage = function () {
								LanguageService.setCurrentLanguage(scope.selectedLanguage);
							};
						}
					}
				})(window, window.angular);

				/***/
			},

		/***/ './src/filters/translate.filter.js':
			/*!*****************************************!*\
  !*** ./src/filters/translate.filter.js ***!
  \*****************************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					angular.module('stockApp').filter('translate', translateFilter);

					translateFilter.$inject = ['LanguageService'];

					function translateFilter(LanguageService) {
						return function (input) {
							return LanguageService.translate(input);
						};
					}
				})(window, window.angular);

				/***/
			},

		/***/ './src/services/language.service.js':
			/*!******************************************!*\
  !*** ./src/services/language.service.js ***!
  \******************************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					angular.module('stockApp').service('LanguageService', LanguageService);

					LanguageService.$inject = ['$rootScope'];

					function LanguageService($rootScope) {
						// // Default language
						let currentLanguage = $rootScope.currentLanguage; //$rootScope.lang
						// // Set the initial language on $rootScope
						// $rootScope.currentLanguage = currentLanguage;
						// const availableLanguages = ['en', 'ru', 'pt-BR'];

						const translations = {
							'Securities Portfolio Calculator': {
								en: 'Securities Portfolio Calculator',
								ru: 'Калькулятор портфеля ценных бумаг',
								'pt-BR': 'Calculadora de carteira de títulos',
							},
							All: {
								en: 'All',
								ru: 'Все',
								'pt-BR': 'Todas',
							},
							Profit: {
								en: 'Profit',
								ru: 'Прибыльные',
								'pt-BR': 'Lucrativas',
							},
							Loss: {
								en: 'Loss',
								ru: 'Убыточные',
								'pt-BR': 'Não lucrativas',
							},
							Profitable: {
								en: 'Profitable',
								ru: 'Прибыльных',
								'pt-BR': 'Lucrativas',
							},
							Unprofitable: {
								en: 'Unprofitable',
								ru: 'Убыточных',
								'pt-BR': 'Não lucrativas',
							},
							Summary: {
								en: 'Summary',
								ru: 'Сводка',
								'pt-BR': 'Resumo',
							},
							Name: {
								en: 'Name',
								ru: 'Наименование',
								'pt-BR': 'Nome',
							},
							'Name of a stock': {
								en: 'Name of a stock',
								ru: 'Наименование акции',
								'pt-BR': 'Nome de uma ação',
							},
							'Purchase price': {
								en: 'Purchase price',
								ru: 'Цена покупки',
								'pt-BR': 'Preço de compra',
							},
							Quantity: {
								en: 'Quantity',
								ru: 'Количество',
								'pt-BR': 'Quantidade',
							},
							Qty: {
								en: 'Qty',
								ru: 'Кол-во',
								'pt-BR': 'Quant',
							},
							Add: {
								en: 'Add',
								ru: 'Добавить',
								'pt-BR': 'Adicionar',
							},
							'Average price': {
								en: 'Avg price',
								ru: 'Средняя цена',
								'pt-BR': 'Preço médio',
							},
							'Current price': {
								en: 'Current price',
								ru: 'Тек.цена',
								'pt-BR': 'Preço atual',
							},
							'Income/Loss': {
								en: 'Income/Loss',
								ru: 'Доход/Убыток',
								'pt-BR': 'Renda/Perda',
							},
							'Set price': {
								en: 'Set price',
								ru: 'Задать цену',
								'pt-BR': 'Definir preço',
							},
							Price: {
								en: 'Price',
								ru: 'Цена',
								'pt-BR': 'Preço',
							},
							Ok: {
								en: 'Ok',
								ru: 'Ok',
								'pt-BR': 'OK',
							},
							'Click to change price': {
								en: 'Click to change price',
								ru: 'Кликните для изменения цены',
								'pt-BR': 'Clique para alterar o preço',
							},
							'Set your price first': {
								en: 'Set your price first',
								ru: 'Сначала задайте цену',
								'pt-BR': 'Defina seu preço primeiro',
							},
							'Total papers': {
								en: 'Total papers',
								ru: 'Всего бумаг',
								'pt-BR': 'Total de artigos',
							},
							'Current portfolio price': {
								en: 'Current portfolio price',
								ru: 'Текущая цена портфеля',
								'pt-BR': 'Preço atual do portfólio',
							},
							'Portfolio value distribution': {
								en: 'Portfolio value distribution',
								ru: 'Распределение стоимости портфеля',
								'pt-BR': 'Distribuição de valor do portfólio',
							},
							'Percentage of portfolio value': {
								en: 'Percentage of portfolio value',
								ru: 'Процент от стоимости портфеля',
								'pt-BR': 'Porcentagem do valor do portfólio',
							},
							Value: {
								en: 'Value',
								ru: 'Cтоимость',
								'pt-BR': 'Valor',
							},
						};

						return {
							getAvailableLanguages() {
								return $rootScope.availableLanguages;
							},
							translate: function (input) {
								return translations[input][$rootScope.currentLanguage];
							},
							getCurrentLanguage: function () {
								return $rootScope.currentLanguage;
							},
							setCurrentLanguage: function (language) {
								currentLanguage = language;
								// // Update $rootScope
								$rootScope.currentLanguage = language;
							},
						};
					}
				})(window, window.angular);

				/***/
			},

		/***/ './src/services/stock.service.js':
			/*!***************************************!*\
  !*** ./src/services/stock.service.js ***!
  \***************************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					angular.module('stockApp').service('Stock', function () {
						return Stock;
					});

					// Конструктор акций
					function Stock(name, average, quantity) {
						this.name = name; // имя данной акции
						this.average = average; // средняя цена данной акции
						this.quantity = quantity; //
						this.newprice = average; // новая цена изначально имеет значение средней
						this.marker = null; // подсветка строки таблицы для данной акции
						this.percent = 0; // процент от стоимости портфеля
						this.profit = 0; // доходность по данной акции
						this.isSetPrice = true; // состояние, когда текущая рыночная стоимость данной акции не указана
						this.isChangePrice = false; // состояние, когда была указана текущая рыночная стоимость данной акции
						this.isNewPrice = false; // состояние, когда указывается новая рыночная стоимость данной акции
					}
				})(window, window.angular);

				/***/
			},

		/***/ './src/services/stocks.collection.factory.js':
			/*!***************************************************!*\
  !*** ./src/services/stocks.collection.factory.js ***!
  \***************************************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					angular.module('stockApp').factory('StocksCollection', StocksCollection);

					// Коллекция акций, созданных конструктором Stock
					function StocksCollection() {
						return {
							stocks: [],

							get: function (value /* name or index */) {
								// можно указать имя искомой акции
								if (angular.isString(value)) {
									var i = this.stocks.length;
									while (i--) {
										if (this.stocks[i].name === value) {
											return this.stocks[i];
										} else {
											return null;
										}
									}
								}
								// или её порядковый номер в таблице (начиная с 0)
								if (angular.isNumber(value)) {
									return this.stocks[value];
								}
							},

							add: function (stock) {
								var i = this.stocks.length;
								while (i--) {
									// если акция уже есть в коллекции, то будет высчитываться среднее
									if (this.stocks[i].name === stock.name) {
										this.stocks[i].average = (this.stocks[i].average + stock.average) / 2;
										this.stocks[i].quantity =
											Number(this.stocks[i].quantity) + Number(stock.quantity);
										this.stocks[i].newprice = this.stocks[i].average;
										return;
									}
								}
								this.stocks.push(stock);
							},

							setPriceState: function (stock) {
								stock.isSetPrice = false;
								stock.isChangePrice = true;
							},

							changePriceState: function (stock) {
								stock.isChangePrice = false;
								stock.isNewPrice = true;
							},

							newPriceState: function (stock) {
								stock.isNewPrice = false;
								stock.isChangePrice = true;
							},

							priceHasChanged: function (stock) {
								if (stock.average - stock.newprice < 0) {
									return (stock.marker = 'bg-success');
								}
								if (stock.average - stock.newprice === 0) {
									return (stock.marker = null);
								}
								if (stock.average - stock.newprice > 0) {
									return (stock.marker = 'bg-danger');
								}
							},

							currentPrice: function (stock) {
								return stock.newprice * stock.quantity;
							},

							totalCount: function () {
								return this.stocks.length;
							},

							totalPrice: function () {
								var i = this.stocks.length,
									result = 0;
								while (i--) {
									result += this.stocks[i].newprice * this.stocks[i].quantity;
								}
								return result;
							},

							totalProfit: function () {
								var i = this.stocks.length,
									result = 0;
								while (i--) {
									result += this.profitCalc(this.stocks[i]);
								}
								return result;
							},

							percentOf: function (stock) {
								return (stock.percent = (
									(stock.newprice * stock.quantity * 100) /
									this.totalPrice()
								).toFixed(2));
							},

							profitCalc: function (stock) {
								return (stock.profit =
									stock.newprice * stock.quantity - stock.average * stock.quantity);
							},
						};
					}
				})(window, window.angular);

				/***/
			},

		/***/ './src/services/tabs.collection.factory.js':
			/*!*************************************************!*\
  !*** ./src/services/tabs.collection.factory.js ***!
  \*************************************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					angular.module('stockApp').factory('TabsCollection', TabsCollection);

					var Tabs = {
						All: {
							id: 'All',
							href: '#/',
							titleKey: 'All',
							// title: 'Все',
						},
						Profit: {
							id: 'Profit',
							href: '#/profit',
							titleKey: 'Profit',
							// title: 'Прибыльные',
						},
						Loss: {
							id: 'Loss',
							href: '#/loss',
							titleKey: 'Loss',
							// title: 'Убыточные',
						},
						Summary: {
							id: 'Summary',
							href: '#/summary',
							titleKey: 'Summary',
							// title: 'Сводка',
						},
					};

					function TabsCollection() {
						return {
							tabs: Object.values(Tabs),
							currentTab: Tabs.All,
							clickOnTab: function (id) {
								this.currentTab = typeof id === 'string' ? Tabs[id] : Tabs.All;
							},
							isActiveTab: function (id) {
								return this.currentTab.id === id;
							},
						};
					}
				})(window, window.angular);

				/***/
			},

		/***/ './src/stockapp.module.js':
			/*!********************************!*\
  !*** ./src/stockapp.module.js ***!
  \********************************/
			/***/ () => {
				(function (window, angular, undefined) {
					'use strict';

					const app = angular.module('stockApp', ['ngRoute']);

					app.run([
						'$rootScope',
						'$window',
						function ($rootScope, $window) {
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
				})(window, window.angular);

				/***/
			},

		/******/
	};
	/************************************************************************/
	/******/ // The module cache
	/******/ var __webpack_module_cache__ = {};
	/******/
	/******/ // The require function
	/******/ function __webpack_require__(moduleId) {
		/******/ // Check if module is in cache
		/******/ var cachedModule = __webpack_module_cache__[moduleId];
		/******/ if (cachedModule !== undefined) {
			/******/ return cachedModule.exports;
			/******/
		}
		/******/ // Create a new module (and put it into the cache)
		/******/ var module = (__webpack_module_cache__[moduleId] = {
			/******/ // no module.id needed
			/******/ // no module.loaded needed
			/******/ exports: {},
			/******/
		});
		/******/
		/******/ // Execute the module function
		/******/ __webpack_modules__[moduleId](module, module.exports, __webpack_require__);
		/******/
		/******/ // Return the exports of the module
		/******/ return module.exports;
		/******/
	}
	/******/
	/************************************************************************/
	var __webpack_exports__ = {};
	// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
	(() => {
		/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
		__webpack_require__(/*! ./stockapp.module.js */ './src/stockapp.module.js');
		__webpack_require__(/*! ./controllers/header.controller.js */ './src/controllers/header.controller.js');
		__webpack_require__(/*! ./controllers/stocks.controller.js */ './src/controllers/stocks.controller.js');
		__webpack_require__(
			/*! ./directives/language-switcher.directive.js */ './src/directives/language-switcher.directive.js'
		);
		__webpack_require__(/*! ./filters/translate.filter.js */ './src/filters/translate.filter.js');
		__webpack_require__(/*! ./services/language.service.js */ './src/services/language.service.js');
		__webpack_require__(/*! ./services/stock.service.js */ './src/services/stock.service.js');
		__webpack_require__(
			/*! ./services/stocks.collection.factory.js */ './src/services/stocks.collection.factory.js'
		);
		__webpack_require__(/*! ./services/tabs.collection.factory.js */ './src/services/tabs.collection.factory.js');
	})();

	/******/
})();
//# sourceMappingURL=bundle.js.map
