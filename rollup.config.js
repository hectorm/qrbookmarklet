import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';

const bookmarklet = () => {
	return {
		name: 'bookmarklet',
		renderChunk: code => `javascript:(function(){${code}})()`
	};
};

export default {
	input: './src/main.js',
	output: [
		{
			name: 'qrbookmarklet',
			file: './dist/qrbookmarklet.txt',
			format: 'umd'
		}
	],
	plugins: [
		nodeResolve(),
		commonjs(),
		babel({
			babelHelpers: 'bundled'
		}),
		terser({
			output: {
				/* eslint-disable camelcase */
				ascii_only: true,
				comments: false,
				max_line_len: false
				/* eslint-enable */
			}
		}),
		bookmarklet()
	]
};
