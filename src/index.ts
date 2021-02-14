import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server';
import { buildSchema } from 'type-graphql';
import { UserResolver } from './resolvers/userResolver';
const { env } = require('./config/config'); 
import Auth from './utils/Auth' 

async function runServer() {
  const connection = await createConnection();
  const schema = await buildSchema({
    resolvers: [
      UserResolver
    ]
  });

  const server = new ApolloServer({ 
    schema,  
    context: Auth
 });
  const port = env.PORT;
  await server.listen(`${port}`);

  console.log('🚀 Server started at port ::'+`${port} 🚀`);
}


runServer();