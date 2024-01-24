import serverPromise from './server/server';
import db from './database/connection';
import 'dotenv/config';

export const startServer = async () => {
  const { PORT } = process.env;

  if (!PORT) {
    throw new Error('Port not defined in .env file');
  }

  const server = await serverPromise;

  db.on('error', console.error.bind(console, 'connection error:'));
  db.once('open', () => {
    server.listen(PORT, () => {
      console.log(`Use GraphQL at http://localhost:${PORT}/graphql`);
    });
  });

  return server;
};

startServer();
