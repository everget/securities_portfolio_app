module.exports = {
	env: {
		browser: true,
		es6: true,
	},
	globals: {
        angular: 'readonly',
    },
	extends: [
		'eslint:recommended',
		'airbnb-base',
		'eslint-config-prettier'
	],
	rules: {
		"no-plusplus": "off",
		"no-use-before-define": "off",
		"no-param-reassign": ["error", { "props": false }],
	},
};
