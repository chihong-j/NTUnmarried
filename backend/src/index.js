import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from "./resolvers/Mutation";
import * as db from './db';




const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
    },
    context: {
        db,
        pubsub
    }
})

server.start({port: process.env.PORT || 5000}, () => {
    console.log(`The server is up on port ${process.env.PORT || 5000}!`);

});