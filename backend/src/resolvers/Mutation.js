import {checkUser, newUser, saveImage, readStreamToDataUrl, createToken, retrieveImage} from "./utility";
import bcrypt from 'bcryptjs';
import {AuthenticationError} from "apollo-server-core";
import {UserModel} from "../db";

const Mutation = {
    async updateUser(parent, {email, gender, age, aboutMe, department}, {db, me}, info) {
        if (!me) throw new AuthenticationError('Not logged in');

        await db.UserModel.findOneAndUpdate({ email }, { gender, age, aboutMe, department});
        const user = db.UserModel.findOne({ email })
        return user;
    },

    async signup(parent, { email, name, password, gender, age, aboutMe, department }, { db }, info) {
        const user = await newUser(db, email, name, password, gender, age, aboutMe, department);
        console.log(user);
        return user ;
    },

    async login(parent, { email }, { db }, info) {
        const user = await db.UserModel.findOne({ email });
        if (!user) {
            throw new Error(`Email: ${email} not found!`)
        } else {
            console.log('create token');
            return {
                token: createToken(user, process.env.SECRET),
                password: user.password
            }
        }
    },

    async uploadFile(parent, { file }, { db, me }, info) {
        if (!me) throw new AuthenticationError('Not logged in');
        const { createReadStream, filename, mimetype, encoding } = await file;


        const user = await db.UserModel.findOne({ email:me.email });
        const readStream1 = createReadStream();
        const readStream2 = createReadStream();
        const writeStream = await saveImage(db, readStream1, filename);
        user.images.push(writeStream.id);
        await user.save();
        return await readStreamToDataUrl(readStream2);
    },


    async createLike(parent, { to, isLike}, { db, me, pubsub}, info) {
        if (!me) throw new AuthenticationError('Not logged in');
        const userMe = await db.UserModel.findOne({ email:me.email}).populate('Like');
        const userStranger = await db.UserModel.findOne({ email: to}).populate('Like');
        userMe.likeList.push(new db.LikeModel({stranger: userStranger, isLike})).save();
        // race condition exists
        if (!isLike) return userMe;
        for (let i = 0; i < userStranger.likeList.length; ++i) {
            if (userStranger.likeList[i].stranger.email === userMe.email) {
                if (userStranger.likeList[i].isLike) {
                    pubsub.publish(to, {
                        user: userMe
                    });
                    pubsub.publish(userMe.email, {
                        user: userStranger
                    });
                }
                break;
            }
        }
        return userMe;
    }
};

export default Mutation;
