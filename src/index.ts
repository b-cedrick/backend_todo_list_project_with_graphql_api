import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';


async function runServer() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [UserResolver]
  });

  const server = new ApolloServer({ schema });
  await server.listen(8000);

  console.log('Server started at port ::8000');
}


runServer();