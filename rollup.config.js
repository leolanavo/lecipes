import fs from 'fs';
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

const staticCssPagesDir = path.join(__dirname, 'public/build/css');

rimraf.sync(path.join(__dirname, 'public/build'));
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

const serverSideConfig = template => ({
	input: template,
	output: {
		file: template.replace('src', 'public/build/ssr').replace('svelte', 'js'),
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
		css({ output: 'bundle.css' }),
		resolve({
			dedupe: ['svelte']
		}),
		typescript({
			sourceMap: !production,
		}),
		production && terser(),
	],
	watch: true,
});

// ---- CLIENT SIDE ----
const hydrateTemplates = glob.sync(`src/views/components/**/*.svelte`);

const clientSideConfig = template => ({
	input: template,
	output: {
		file: template.replace('src', 'public/build/js').replace('svelte', 'js'),
	},
	plugins: [
		svelte({
			preprocess,
			compilerOptions: {
				dev: !production,
				hydratable: true,
			},
		}),
		css({
			output: (styles) => {
				rimraf.sync(staticCssPagesDir);
				fs.mkdirSync(staticCssPagesDir);
				fs.writeFileSync(path.join(staticCssPagesDir, 'bundle.css'), styles);
			}
		}),
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
});

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
			!production && serve(),
			production && terser(),
		],
		watch: true,
	};
}


function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			if (server) return;
			server = require('child_process').spawn('yarn', ['start'], {
				stdio: ['ignore', 'inherit', 'inherit'],
				shell: true
			});

			process.on('SIGTERM', toExit);
			process.on('exit', toExit);
		}
	};
}

export default [
	...templates.map(serverSideConfig),
	...hydrateTemplates.map(clientSideConfig),
	...serverFiles.map(serverConfig),
];

