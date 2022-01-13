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
          let chatBoxName = [from, to].sort().join('$');
          return pubsub.asyncIterator(`chatBox ${chatBoxName}`);
        },
      },

    chatBoxPayload: {
        subscribe(parent, { email }, { pubsub }, info) {
            return pubsub.asyncIterator(`chatBoxPayload ${email}`);
        }
    }
};

export default Subscription;
