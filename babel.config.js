module.exports = function (api) {
	api.cache(true);
	return {
		presets: [
			'@babel/preset-env',
			'@babel/preset-react',
			'@babel/preset-typescript'
		],
		plugins: [
			'@babel/plugin-transform-runtime',
			'@babel/plugin-proposal-class-properties',
			'@babel/plugin-proposal-private-methods',
			'@babel/plugin-transform-regenerator',
			'@babel/plugin-transform-async-to-generator'
		]
	};
};