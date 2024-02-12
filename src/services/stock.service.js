angular.module('stockApp').service('Stock', () => Stock);

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
