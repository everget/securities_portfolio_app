angular.module('stockApp').factory('TabsCollection', TabsCollection);

const Tabs = {
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
		// eslint-disable-next-line no-sequences
		tabs: Object.keys(Tabs).reduce((acc, key) => (acc.push(Tabs[key]), acc), []), // Object.values(Tabs),
		currentTab: Tabs.All,
		clickOnTab(id) {
			this.currentTab = typeof id === 'string' ? Tabs[id] : Tabs.All;
		},
		isActiveTab(id) {
			return this.currentTab.id === id;
		},
	};
}
