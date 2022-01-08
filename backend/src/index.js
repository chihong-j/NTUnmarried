import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from "./resolvers/Mutation";
import * as db from './db';
import jwt from 'jsonwebtoken';



const pubsub = new PubSub();

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
    },
    context: async ({ req }) => {
        const token = req.headers['x-token'];
        const secret = process.env.SECRET;
        const context = {db, pubsub, secret };
        if (token) {
            try {
                const me = await jwt.verify(token, process.env.SECRET);
                return { ...context, me };
            } catch (e) {
                throw new Error('Your session expired. Sign in again.');
            }
        }
        return context;
    }

})

server.start({port: process.env.PORT || 5000}, () => {
    console.log(`The server is up on port ${process.env.PORT || 5000}!`);

});