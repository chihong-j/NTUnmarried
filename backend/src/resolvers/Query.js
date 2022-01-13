import {readStreamToDataUrl, retrieveImage} from "./utility";
import {AuthenticationError} from "apollo-server-core";


const Query = {
    async user(parent, { email }, { db }, info) {
        const queryUser = await db.UserModel.findOne({ email });
        let readStream;
        const { _id: id, name, gender, age, aboutMe, department, password, notificationList, chatBoxPayloadList} = queryUser;
        if (!queryUser.images) return { id, email, name, gender, age, aboutMe, department, images: [], password, notificationList, chatBoxPayloadList};
        const images = [];
        for (let i = 0; i < queryUser.images.length; ++i) {
            readStream = await retrieveImage(db, queryUser.images[i]);
            images.push(await readStreamToDataUrl(readStream));
        }

        return { id, email, name, gender, age, aboutMe, department, images, password, notificationList, chatBoxPayloadList};
    },
    async stranger(parent, {email: userEmail}, { db, me}, info) {
        if (!me) throw new AuthenticationError('Not logged in');
        console.log("ok")
        const users = await db.UserModel.find({});
        const userMe = await db.UserModel.findOne({email: userEmail}).populate({
            path: 'likeList',
            populate: {
                path: 'stranger',
            }
            }
        );
        const isMeet = (stranger, likeList) => {
            for (let i = 0; i < likeList.length; ++i) {
                if (stranger.email === likeList[i].stranger.email) return true;
            }
            return false;
        }
        const strangers = [];
        for (let i = 0; i < users.length; ++i) {//m
            if (users[i].email === userMe.email) continue;
            if (!isMeet(users[i], userMe.likeList)) {
                strangers.push(users[i]);
            }
        }
        return strangers.map(async (stranger) => {
            let readStream;
            const { _id: id, email, name, gender, age, aboutMe, department } = stranger;
            if (!stranger.images) return { id, email, name, gender, age, aboutMe, department, images: []};
            const images = [];
            for (let i = 0; i < stranger.images.length; ++i) {
                readStream = await retrieveImage(db, stranger.images[i]);
                images.push(await readStreamToDataUrl(readStream));
            }
            return { id, email, name, gender, age, aboutMe, department, images};
        })
    },
    async chatBox(parent, {name}, {db, pubsub}, info) {
        let chatBox = await checkChatBox(db, name, "QueryChatBox");
        if(!chatBox) {
          console.log("ChatBox does not exist for QueryChatBox: " + name);
        }
        return chatBox;
      }
    // async stranger(parent, args, { db, me }, info) {
    //     if (!me) throw new AuthenticationError('Not logged in');
    //     const users = await db.UserModel.find({});
    //     const userMe = await db.UserModel.findOne({email: me.email});
    //     const isMeet = async (stranger, likeList) => {
    //         let like;
    //         let likePerson;
    //         for (let i = 0; i < likeList.length; ++i) {
    //             like = await db.LikeModel.findById(likeList[i]);
    //             likePerson = await db.UserModel.findById(like.stranger);
    //             if (stranger.email === likePerson.email) return true;
    //         }
    //         return false;
    //     }
    //     const strangers = [];
    //     for (let i = 0; i < users.length; ++i) {
    //         if (users[i].email === userMe.email) continue;
    //         if (! await isMeet(users[i], userMe.likeList)) {
    //             strangers.push(users[i]);
    //         }
    //     }
    //     return strangers.map(async (stranger) => {
    //         let readStream;
    //         const { _id: id, email, name, gender, age, aboutMe, department } = stranger;
    //         if (!stranger.images) return { id, email, name, gender, age, aboutMe, department, images: []};
    //         const images = [];
    //         for (let i = 0; i < stranger.images.length; ++i) {
    //             readStream = await retrieveImage(db, stranger.images[i]);
    //             images.push(await readStreamToDataUrl(readStream));
    //         }
    //         return { id, email, name, gender, age, aboutMe, department, images};
    //     })
    // },

}

export default Query;
