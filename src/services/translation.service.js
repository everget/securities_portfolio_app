angular.module('stockApp').service('TranslationService', TranslationService);

TranslationService.$inject = ['$rootScope'];

function TranslationService($rootScope) {
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
		translate(input) {
			return translations[input][$rootScope.currentLanguage];
		},
		getCurrentLanguage() {
			return $rootScope.currentLanguage;
		},
		setCurrentLanguage(language) {
			$rootScope.currentLanguage = language;
		},
	};
}
