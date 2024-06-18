// eslint-disable-next-line no-undef
module.exports = {
	'env': {
		'browser': true,
		'es2021': true
	},
	'extends': 'eslint:recommended',
	'parserOptions': {
		'ecmaVersion': 'latest',
		'sourceType': 'module'
	},
	'rules': {
		'linebreak-style': [
			'error',
			'unix'
		],
		'semi': [
			'error',
			'always'
		],
		'capitalized-comments': 'error',
		'no-inline-comments': 'error',
		'multiline-comment-style': ['error', 'separate-lines'],
		'max-len': ['error', { 'code' : 120 }],
		'no-mixed-spaces-and-tabs': 'error',
		'indent':['error', 'tab', { 'SwitchCase': 1 }],
		'object-curly-spacing': ['error', 'always', { 'arraysInObjects': false } ],
		'comma-dangle': ['error', 'never'],
		'dot-notation': 'error',
		'new-cap': 'error',
		'object-curly-newline': ['error', { 'consistent': true }],
		'no-multi-spaces': 'error',
		'quotes': ['error', 'single'],
		'camelcase': 'error',
		'no-var' : 'error',
		'space-before-blocks': 'error',
		'brace-style': 'error',
		'curly': 'error',
		'prefer-const': 'error',
		'eqeqeq': 'error',
		'comma-spacing': ['error', { 'before': false, 'after': true }]
	}
};
