import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import path from 'path';
import { typeDefs, resolvers } from './schemas';
// import authMiddleware from '../middleware/auth';

const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const startApolloServer = async () => {
  await server.start();

  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(
    '/graphql',
    expressMiddleware(server, {
      // context: authMiddleware,
    }),
  );

  if (process.env.NODE_ENV === 'production') {
    const clientDistPath = path.join(__dirname, '../frontend/dist');
    app.use(express.static(clientDistPath));

    app.get('*', (req, res) => {
      res.sendFile(path.join(clientDistPath, 'index.html'));
    });
  }

  return app;
};

export default startApolloServer();
