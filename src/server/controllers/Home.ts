import fp from 'fastify-plugin';

import type { Reply } from '../../../typings';

export default fp((app, _opts, next) => {
  app.get('/', (_request, reply: Reply) => {
    reply.view('Home', {
      recipes: [
        {
          imageSrc: 'https://img.cybercook.com.br/receitas/731/lasanha-3.jpeg',
          tags: ['massa', 'italiana', 'salgado'],
          title: 'Lasanha',
        },
        {
          imageSrc: 'https://conteudo.imguol.com.br/c/entretenimento/04/2020/08/10/cheesecake-com-calda-de-frutas-vermelhas-1597080856359_v2_1000x667.jpg',
          tags: ['doce', 'morango', 'bolo', 'italiana'],
          title: 'Chessecake',
        },
      ],
    });
  });
  
  next();
});