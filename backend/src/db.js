import mongoose from 'mongoose';
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
    likeList: [{ type: mongoose.Types.ObjectId, ref: 'Like' }]
})

const LikeScheme = new Schema({
    stranger: { type: mongoose.Types.ObjectId, required: true, ref: 'User'},
    isLike: { type: Boolean, required: true}
})


const container = []
CreateFileModel(container);


const UserModel = mongoose.model('User', UserSchema);
const LikeModel = mongoose.model('Like', LikeScheme);

export { UserModel, container, LikeModel };
