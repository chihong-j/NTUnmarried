import {AuthenticationError} from "apollo-server-core";

const Subscription = {
    notification: {
        subscribe(parent, {email}, { db, me, pubsub }, info) {
            // if (!me) throw new AuthenticationError('Not logged in');
            return pubsub.asyncIterator(email);
        },
    },

    message: {
        subscribe(parent, { from, to }, { pubsub }, info) {
          let chatBoxName = makeName(from, to);
          return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
        },
      },
};

export default Subscription;
