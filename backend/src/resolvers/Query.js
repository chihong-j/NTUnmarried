import {readStreamToDataUrl, retrieveImage} from "./utility";


const Query = {
    async user(parent, { email }, { db }, info) {
        const queryUser = await db.UserModel.findOne({ email });
        let readStream;
        console.log(queryUser);
        const { _id: id, name, gender, age, aboutMe, department, password, pairedEmail, pairedName} = queryUser;
        if (!queryUser.images) return { id, email, name, gender, age, aboutMe, department, images: [], password, pairedEmail, pairedName};
        const images = [];
        for (let i = 0; i < queryUser.images.length; ++i) {
            readStream = await retrieveImage(db, queryUser.images[i]);
            images.push(await readStreamToDataUrl(readStream));
        }
        return { id, email, name, gender, age, aboutMe, department, images, password, pairedEmail, pairedName};
    },

    async stranger(parent, { email }, { db, me }, info) {
        const users = await db.UserModel.find({});
        const userMe = await db.UserModel.findOne({email: me.email});

        const isMeet = (strangerId, likeList) => {
            for (let i = 0; i < likeList.length; ++i) {
                if (users[i]._id === likeList[i].stranger) return true;
            }
            return false;
        }
        const strangers = users.filter((stranger) => {
            return !isMeet(stranger, userMe.likeList);
        })
        console.log(strangers.length);
        return strangers.map(async (stranger) => {
            let readStream;
            const { _id: id, name, gender, age, aboutMe, department } = stranger;
            if (!stranger.images) return { id, email, name, gender, age, aboutMe, department, images: []};
            const images = [];
            for (let i = 0; i < stranger.images.length; ++i) {
                readStream = await retrieveImage(db, stranger.images[i]);
                images.push(await readStreamToDataUrl(readStream));
            }
            console.log({ id, email, name, gender, age, aboutMe, department})
            return { id, email, name, gender, age, aboutMe, department, images};
        })


    }
}

export default Query;