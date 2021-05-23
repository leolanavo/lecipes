import fp from 'fastify-plugin';

import type { HomeModel, Reply } from '../../../typings';

const recipes = [
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
];


const HomeConverter = {
  convert(): HomeModel {
    const tagList = Array.from(new Set(
      recipes.reduce((acc, r) => acc.concat(r.tags), [])
    ));

    return { 
      RecipesList: { recipes },
      FilterPills: { tagList }
    };
  }
};

export default fp((app, _opts, next) => {
  app.get('/', (_request, reply: Reply) => {
    reply.view('Home', HomeConverter.convert());
  });
  
  next();
});