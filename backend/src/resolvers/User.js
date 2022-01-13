const User = {
    notificationList(parent, args, { db }, info) {
        return Promise.all(
            parent.notificationList.map(
                (nId) => db.NotificationModel.findById(nId)
            )
        );
    },

    chatBoxPayloadList(parent, args, { db }, info) {
        return Promise.all(
            parent.chatBoxPayloadList.map(
                (cId) => db.ChatBoxPayloadModel.findById(cId)
            )
        )
    }
};


export default User;