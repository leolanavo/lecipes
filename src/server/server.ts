import Fastify from 'fastify';
import FastifyStatic from 'fastify-static';
import fs from 'fs';
import path from 'path';

import TemplatePlugin from './template';

const prod = process.env.NODE_ENV === 'production';

const fastify = Fastify({
  ignoreTrailingSlash: true,
  logger: { prettyPrint: !prod },
});

fastify.register(FastifyStatic, {
  root: path.join(__dirname, '../public'),
});

fastify.register(TemplatePlugin);

const start = async () => {
  const controllerSrcs = fs.readdirSync(path.join(__dirname, 'controllers'));
  const controllers = await Promise.all(
    controllerSrcs.map(src => import(`./controllers/${src}`).then(m => m.default)),
  );

  controllers.forEach(entry => fastify.register(entry));

  try {
    await fastify.ready();
    await fastify.listen(8080, '0.0.0.0');
    fastify.log.info(`Server listening on ${fastify.server.address().toString()}`);
  } catch (e) {
    fastify.log.error(e);
    throw new Error(e);
  }
};

start();
