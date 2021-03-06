import type { FastifyInstance } from 'fastify';
import fp from 'fastify-plugin';

import type { NextFn } from '../../typings';

const rootDir = '../public';

export default fp((app: FastifyInstance, _opts: never, next: NextFn) => {
  app.decorateReply('view', async function(page: string, model: Record<string, any>) {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    const ssrModule = require(`${rootDir}/ssr/${page}.js`);

    const { html, head } = ssrModule.render({ model });
    const rendered = `
			<html lang="en">
				<head>
					<meta charset='utf-8'>
					<meta name='viewport' content='width=device-width,initial-scale=1'>

					<title>Lecipes</title>
					<link rel='icon' type='image/png' href='/favicon.png'>
					<link rel="preconnect" href="https://fonts.gstatic.com">
					<link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">

					<link rel="stylesheet" href="/ssr/${page}.css"/>
					<link rel="stylesheet" href="/global.css"/>
					<script>import('/hydrate.js').then(({ default: f }) => f());</script>

					${head}
				</head>
				<body>
					${html}
				</body>
			</html>
		`;

    this.header('Content-Type', 'text/html');
    this.type('text/html').send(rendered);
  });

  next();
});

