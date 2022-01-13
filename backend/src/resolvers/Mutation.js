import {checkUser, newUser, saveImage, readStreamToDataUrl, createToken, retrieveImage, populateImg} from "./utility";
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
        const userMe = await db.UserModel.findOne({ email:me.email}).populate({
            path: 'likeList',
            populate: {
                path: 'stranger',
            }
            }
        );
        const userStranger = await db.UserModel.findOne({ email: to}).populate({
            path: 'likeList',
            populate: {
                path: 'stranger',
            }
            }
        );
        const newLike = new db.LikeModel({stranger: userStranger, isLike});
        newLike.save();
        userMe.likeList.push(newLike);
        // race condition exists
        if (!isLike) return userMe;
        for (let i = 0; i < userStranger.likeList.length; ++i) {
            if (userStranger.likeList[i].stranger.email === userMe.email) {
                if (userStranger.likeList[i].isLike) {
                    const populatedUserMe = await populateImg(db, userMe, 1);
                    const populatedUserStranger = await populateImg(db, userStranger, 1);
                    const newNotificationStranger = await new db.NotificationModel({name: populatedUserMe.name, image: populatedUserMe.images[0]}).save()
                    const newNotificationMe = await  new db.NotificationModel({name: populatedUserStranger.name, image: populatedUserStranger.image[0]}).save()
                    userMe.notificationList = [newNotificationMe, ...userMe.notificationList];
                    userStranger.notificationList = [newNotificationStranger, ...userStranger.notificationList];
                    userMe.save();
                    userStranger.save();

                    pubsub.publish(to, {
                        notification: newNotificationStranger
                    });
                    pubsub.publish(userMe.email, {
                        notification: newNotificationMe
                    });
                }
                break;
            }
        }
        return userMe;
    },

    async createMessage(parent, {from, to, message}, {db, pubsub}, info) {
        const {chatBox, sender} = await checkMessage(
          db, from, to, message, "createMessage"
        );
        if(!chatBox) throw new Error("ChatBox not found for createMessage");
        if(!sender) throw new Error("User not found" + from);
        const chatBoxName = makeName(from, to);
        const newMsg = await newMessage(db, sender, message);
        console.log(newMsg.sender);
        chatBox.messages.push(newMsg);
        await chatBox.save();

        pubsub.publish(`chatBox ${chatBoxName}`, {
          message: newMsg,
        });
        return newMsg;
      },
};

export default Mutation;
