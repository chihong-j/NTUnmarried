import mongoose, {mongo} from 'mongoose';
import { createModel } from "mongoose-gridfs";
import { connection } from "./mongo";
const Schema = mongoose.Schema;

const CreateFileModel = (container) => {
    connection.once('open', () => {
        console.log("connection success!");
        container.push(createModel({
            modelName: 'image',
            connection
        }))
    })
}

const UserSchema = new Schema({
    email: { type: String, required: true},
    name: { type: String, required: true},
    gender: { type: Boolean, required: true},
    age: { type: Number, required: true},
    aboutMe: { type: String, required: true},
    department: { type: String, required: true},
    images: [{ type: mongoose.Types.ObjectId }],
    password: { type: String, required: true },
    likeList: [{ type: mongoose.Types.ObjectId, ref: 'Like' }],
    notificationList: [{type: mongoose.Types.ObjectId, ref: 'Notification'}],
    chatBoxPayloadList: [{ type: mongoose.Types.ObjectId, ref: 'ChatBoxPayload'}]
})

const NotificationListSchema = new Schema({
    name: { type: String },
    image: { type: String }
})

const LikeSchema = new Schema({
    stranger: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    isLike: { type: Boolean, required: true}
})

const MessageSchema = new Schema({
    sender: { type: mongoose.Types.ObjectId, ref: "User" },
    body: { type: String, required: true},
});

const ChatBoxSchema = new Schema({
    name: { type: String, required: true},
    messages: [{ type: mongoose.Types.ObjectId, ref: "Message"}],
});

const ChatBoxPayloadSchema = new Schema({
    name: { type: String },
    friendName: { type: String },
    friendImage: { type: String },
    friendEmail: { type: String }
})

const container = []
CreateFileModel(container);


const UserModel = mongoose.model('User', UserSchema);
const LikeModel = mongoose.model('Like', LikeSchema);
const NotificationModel = mongoose.model('Notification', NotificationListSchema);
const MessageModel = mongoose.model('Message', MessageSchema);
const ChatBoxModel = mongoose.model('ChatBox', ChatBoxSchema);
const ChatBoxPayloadModel = mongoose.model('ChatBoxPayload', ChatBoxPayloadSchema);
export { UserModel, container, LikeModel, NotificationModel, MessageModel, ChatBoxModel, ChatBoxPayloadModel };
