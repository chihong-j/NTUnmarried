import {AuthenticationError} from "apollo-server-core";

const Subscription = {
    notification: {
        subscribe(parent, args, { db, me, pubsub }, info) {
            console.log("????")
            if (!me) throw new AuthenticationError('Not logged in');

            return pubsub.asyncIterator(`${me.email}`);
        },
    },
};

export default Subscription;