import fs from 'fs';
import path from 'path';

const rootDir = '../public/build';

export default (page: string) => {
	const ssrModule = require(`${rootDir}/ssr/${page}.js`);

	const jsFilename =
		fs.readdirSync(path.join(__dirname, `${rootDir}/js/pages`))
		.find(filename =>
			filename.split('.')[1] === 'js' &&
			filename.includes(page));

	const { html, head } = ssrModule.render();
	return `
		<html lang="en">
			<head>
				<meta charset='utf-8'>
				<meta name='viewport' content='width=device-width,initial-scale=1'>

				<title>Lecipes</title>
				<link rel='icon' type='image/png' href='/favicon.png'>
				<link rel="preconnect" href="https://fonts.gstatic.com">
				<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

				<link rel="stylesheet" href="/build/css/bundle.css"/>
				<link rel="stylesheet" href="/global.css"/>
				<script defer src="/public/build/js/pages/${jsFilename}"></script>

				${head}
			</head>
			<body>
				${html}
			</body>
		</html>
	`;
};
