import path from 'path';
import rimraf from 'rimraf';
import glob from 'glob';

import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import { terser } from 'rollup-plugin-terser';

// ---- SETUP ----
const production = !process.env.ROLLUP_WATCH;

rimraf.sync(path.join(__dirname, 'public/js'));
rimraf.sync(path.join(__dirname, 'public/ssr'));
rimraf.sync(path.join(__dirname, 'dist'));

// ---- SCSS ----
const preprocess = sveltePreprocess({
	sourceMap: !production,
	scss: {
		includePaths: ['./src/scss'],
	},
});

// ---- SSR FILES ----
const templates = glob.sync('src/views/pages/**/*.svelte')

const serverSideConfig = template => {
	const match = template.match(/pages\/(?<name>.+).svelte/);
	const { name } = match.groups;

	return {
		input: template,
		output: {
			file: `public/ssr/${name}.js`,
			format: 'cjs',
		},
		plugins: [
			svelte({
				preprocess,
				compilerOptions: {
					dev: !production,
					generate: 'ssr',
					hydratable: true,
				}
			}),
			css({ output: `${name}.css` }),
			resolve({
				dedupe: ['svelte']
			}),
			typescript({
				sourceMap: !production,
			}),
			production && terser(),
		],
		watch: true,
	}
};

// ---- CLIENT SIDE ----
const hydrateTemplates = glob.sync(`src/views/components/**/*.svelte`);

const clientSideConfig = template => {
	const match = template.match(/components\/(?<name>.+)/);
	const { name } = match.groups;

	return {
		input: template,
		output: {
			file: `public/js/${name}.js`,
		},
		plugins: [
			svelte({
				preprocess,
				compilerOptions: {
					dev: !production,
					hydratable: true,
				},
			}),
			css({ output: `${name}.css` }),
			resolve({
				browser: true,
				dedupe: ['svelte'],
			}),
			typescript({
				sourceMap: !production,
				inlineSources: !production,
			}),
			production && terser(),
		],
		watch: true,
	};
}

// ---- TS Server ----
const serverFiles = glob.sync('./src/server/**/*.ts')

const serverConfig = file => {
	return {
		input: file,
		output: {
			file: file.replace('src/server', 'dist').replace('ts', 'js'),
			format: 'cjs',
		},
		plugins: [
			typescript({
				sourceMap: !production,
				inlineSources: !production,
			}),
			production && terser(),
		],
		watch: true,
	};
}

export default [
	...templates.map(serverSideConfig),
	...hydrateTemplates.map(clientSideConfig),
	...serverFiles.map(serverConfig),
];

