angular.module('stockApp').factory('StocksCollection', StocksCollection);

// Коллекция акций, созданных конструктором Stock
function StocksCollection() {
	return {
		stocks: [],

		get(value /* name or index */) {
			// можно указать имя искомой акции
			if (angular.isString(value)) {
				let i = this.stocks.length;
				// eslint-disable-next-line no-unreachable-loop
				while (i--) {
					if (this.stocks[i].name === value) {
						return this.stocks[i];
					}
					return null;
				}
			} else if (angular.isNumber(value)) {
				return this.stocks[value];
			}

			return null;
		},

		add(stock) {
			let i = this.stocks.length;
			while (i--) {
				// если акция уже есть в коллекции, то будет высчитываться среднее
				if (this.stocks[i].name === stock.name) {
					this.stocks[i].average = (this.stocks[i].average + stock.average) / 2;
					this.stocks[i].quantity = Number(this.stocks[i].quantity) + Number(stock.quantity);
					this.stocks[i].newprice = this.stocks[i].average;
					return;
				}
			}
			this.stocks.push(stock);
		},

		setPriceState(stock) {
			stock.isSetPrice = false;
			stock.isChangePrice = true;
		},

		changePriceState(stock) {
			stock.isChangePrice = false;
			stock.isNewPrice = true;
		},

		newPriceState(stock) {
			stock.isNewPrice = false;
			stock.isChangePrice = true;
		},

		priceHasChanged(stock) {
			if (stock.average - stock.newprice < 0) {
				stock.marker = 'bg-success';
			} else if (stock.average - stock.newprice > 0) {
				stock.marker = 'bg-danger';
			} else {
				stock.marker = null;
			}

			return stock.marker;
		},

		currentPrice(stock) {
			return stock.newprice * stock.quantity;
		},

		totalCount() {
			return this.stocks.length;
		},

		totalPrice() {
			let i = this.stocks.length;
			let result = 0;
			while (i--) {
				result += this.stocks[i].newprice * this.stocks[i].quantity;
			}
			return result;
		},

		totalProfit() {
			let i = this.stocks.length;
			let result = 0;
			while (i--) {
				result += this.profitCalc(this.stocks[i]);
			}
			return result;
		},

		percentOf(stock) {
			stock.percent = ((stock.newprice * stock.quantity * 100) / this.totalPrice()).toFixed(2);
			return stock.percent;
		},

		profitCalc(stock) {
			stock.profit = stock.newprice * stock.quantity - stock.average * stock.quantity;
			return stock.profit;
		},
	};
}
