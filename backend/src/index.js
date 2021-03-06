import { GraphQLServer, PubSub } from 'graphql-yoga';
import Query from './resolvers/Query';
import Mutation from "./resolvers/Mutation";
import Subscription from "./resolvers/Subscription";
import User from "./resolvers/User";
import ChatBox from "./resolvers/ChatBox";
import Message from "./resolvers/Message";
import * as db from './db';
import jwt from 'jsonwebtoken';
import { AuthenticationError } from "apollo-server-core";


const pubsub = new PubSub();


const autheticate = async (resolve, root, args, context, info) => {
    let me;
    if (context.request){
        if (context.request.get("Authorization")) {
            try {
                me = await jwt.verify(context.request.get("Authorization"), process.env.SECRET);
            } catch (e) {
                return new AuthenticationError("Your session expired. Sign in again.");
            }
        }
    } else {
        if(context.connection.context.Authorization) {
            try {
                me = await jwt.verify(context.connection.context.Authorization, process.env.SECRET);
            } catch (e) {
                return new AuthenticationError("Your session expired. Sign in again.");
            }
        }
    }



    context = { ...context, me };
    const result = await resolve(root, args, context, info);
    return result;
};

const server = new GraphQLServer({
    typeDefs: './src/schema.graphql',
    resolvers: {
        Query,
        Mutation,
        Subscription,
        User,
        ChatBox,
        Message,
    },
    context: (req) => ({ ...req, db, pubsub}),
    middlewares: [autheticate]
})


server.start({port: process.env.PORT || 5000}, () => {
    console.log(`The server is up on port ${process.env.PORT || 5000}!`);

});
