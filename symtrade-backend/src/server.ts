import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import typeDefs from './typeDefs';
import resolvers from './resolvers';
import { validateSession } from './auth-middleware';
import connectToDb from './db-connection';


const startServer = async () => {
  const app = express();

  // Use the validateSession middleware for every request
  app.use(validateSession);

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ userId: req.userId }),
  });

  await server.start();
  server.applyMiddleware({ app: app as any });

  // Connect to the database and start the server
  await connectToDb();
  app.listen({ port: 4000 }, () =>
    console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer().catch(console.error);