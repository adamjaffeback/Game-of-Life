module.exports = {
	parserOptions: {
		ecmaVersion: 2018,
		ecmaFeatures: {
			jsx: true,
		},
	},
	env: {
		browser: true,
		node: true,
		es6: true,
	},
	extends: [
		'eslint:recommended',
		'plugin:flowtype/recommended',
		'plugin:react/recommended',
		'plugin:import/errors',
		'plugin:import/warnings',
	],
	plugins: ['react', 'react-hooks', 'flowtype', 'import'],
	settings: {
		react: {
			// https://github.com/yannickcr/eslint-plugin-react#configuration
			version: 'detect',
		},
		'import/resolver': {
			node: {
				extensions: ['.js', '.jsx'],
			},
		},
	},
	rules: {
		'react-hooks/rules-of-hooks': 'error',
		'react-hooks/exhaustive-deps': 'warn',
	},
};
