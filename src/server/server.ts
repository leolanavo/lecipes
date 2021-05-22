import path from 'path';

import Fastify from 'fastify';
import FastifyStatic from 'fastify-static';

import template from './template';

const fastify = Fastify({
	ignoreTrailingSlash: true,
	logger: true,
});

fastify.register(FastifyStatic, {
	root: path.join(__dirname, '../public'),
});


fastify.route({
	method: 'GET',
	url: '/',
	handler: (_request, reply) => {
		reply.header('Content-Type', 'text/html');
		reply.send(template('Home', {
			name: 'Amigurumi',
		}));
	},
});

fastify.listen('8080', '0.0.0.0', (err, addr) => {
	if (err) {
		fastify.log.error(err);
		process.exit(1);
	}

	fastify.log.info(`Server listening on ${addr}`);
	console.log(`Server listening on ${addr}`);
});

