import {AuthenticationError} from "apollo-server-core";

const Subscription = {
    notification: {
        subscribe(parent, {email}, { db, me, pubsub }, info) {
            // if (!me) throw new AuthenticationError('Not logged in');
            return pubsub.asyncIterator(email);
        },
    },
};

export default Subscription;