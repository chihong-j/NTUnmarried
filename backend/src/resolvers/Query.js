import {readStreamToDataUrl, retrieveImage} from "./utility";


const Query = {
    async user(parent, { id }, { db }, info) {
        const queryUser = await db.UserModel.findOne({_id: id});
        let readStream;
        const { name, gender, age } = queryUser;
        if (!queryUser.images) return { id, name, gender, age, images: []};
        const images = [];
        for (let i = 0; i < queryUser.images.length; ++i) {
            console.log(queryUser.images);
            readStream = await retrieveImage(db, queryUser.images[i]);
            images.push(await readStreamToDataUrl(readStream));
        }
        return { id, name, gender, age, images};
    }
}

export default Query;