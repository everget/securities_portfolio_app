(function (window, angular, undefined) {
	'use strict';

	angular.module('stockApp').factory('TabsCollection', TabsCollection);

	var Tabs = {
		All: {
			id: 'All',
			href: '#/',
			title: 'Все',
		},
		Profit: {
			id: 'Profit',
			href: '#/profit',
			title: 'Прибыльные',
		},
		Loss: {
			id: 'Loss',
			href: '#/loss',
			title: 'Убыточные',
		},
		Summary: {
			id: 'Summary',
			href: '#/summary',
			title: 'Сводка',
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
