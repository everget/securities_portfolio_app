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
