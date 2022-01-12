import {readStreamToDataUrl, retrieveImage} from "./utility";


const Query = {
    async user(parent, { email }, { db }, info) {
        console.log(email);
        const queryUser = await db.UserModel.findOne({ email });
        let readStream;
        console.log(queryUser);
        const { _id: id, name, gender, age, aboutMe, department, password } = queryUser;
        if (!queryUser.images) return { id, email, name, gender, age, aboutMe, department, images: [], password};
        const images = [];
        for (let i = 0; i < queryUser.images.length; ++i) {
            readStream = await retrieveImage(db, queryUser.images[i]);
            images.push(await readStreamToDataUrl(readStream));
        }
        return { id, email, name, gender, age, aboutMe, department, images, password};
    },

    async stranger(parent, { email }, { db }, info) {
        const queryUser = await db.UserModel.findOne({ email: "jim12345@gmail.com" });
        let readStream;
        const { _id: id, name, gender, age, aboutMe, department } = queryUser;
        if (!queryUser.images) return { id, email, name, gender, age, aboutMe, department, images: []};
        const images = [];
        for (let i = 0; i < queryUser.images.length; ++i) {
            readStream = await retrieveImage(db, queryUser.images[i]);
            images.push(await readStreamToDataUrl(readStream));
        }
        return { id, email, name, gender, age, aboutMe, department, images};
    }
}

export default Query;