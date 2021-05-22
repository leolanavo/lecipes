import fs from 'fs';
import path from 'path';
import rimraf from 'rimraf';

import svelte from 'rollup-plugin-svelte';
import resolve from '@rollup/plugin-node-resolve';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import virtual from '@rollup/plugin-virtual';
import { terser } from 'rollup-plugin-terser';

// ---- SETUP ----
const production = !process.env.ROLLUP_WATCH;

const pagesComponentsDir = path.join(__dirname, 'src/views/pages');
const staticJsPagesDir = path.join(__dirname, 'public/build/js/pages');
const staticCssPagesDir = path.join(__dirname, 'public/build/css');
const ssrDir = path.join(__dirname, 'public/build/ssr');

const serverInputFile = path.join(__dirname, 'src/server/server.ts');
const serverOutDir = path.join(__dirname, 'dist');

const pagesComponentsFiles = fs.readdirSync(pagesComponentsDir);

rimraf.sync(ssrDir);
rimraf.sync(staticJsPagesDir);

const rollupConfig = [];

// ---- SCSS ----
const preprocess = sveltePreprocess({
	sourceMap: !production,
	scss: {
		includePaths: ['./src/scss'],
	},
});

// ---- SSR FILES ----
const ssrInputs = pagesComponentsFiles.map(filename => path.join(pagesComponentsDir, filename));

rollupConfig.push({
	input: ssrInputs,
	output: {
		dir: './public/build/ssr',
		format: 'cjs',
		entryFileNames: '[name].js',
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
const clientSideConfigs = pagesComponentsFiles.map(filename => {
	const name = filename.replace('.svelte', '');
	return {
		name,
		code: `
			import ${name} from '${path.join(pagesComponentsDir, filename)}';

			new ${name}({
				target: document.body,
				hydrate: true,
			});
		`,
	};
});

clientSideConfigs.forEach(c => {
	rollupConfig.push({
		input: c.name,
		output: {
			dir: staticJsPagesDir,
		},
		plugins: [
			virtual({
				[c.name]: c.code
			}),
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
});

// ---- TS Server ----
rollupConfig.push({
	input: serverInputFile,
	output: {
		dir: serverOutDir,
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
});


function serve() {
	let server;

	function toExit() {
		if (server) server.kill(0);
	}

	return {
		writeBundle() {
			console.log(server);

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

export default rollupConfig;

