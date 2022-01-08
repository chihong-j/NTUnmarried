import {checkUser, newUser, saveImage, readStreamToDataUrl} from "./utility";


const Mutation = {
    async createUser(parent, {name, gender, age}, {db, pubsub}, info) {
        const user = await newUser(db, name, gender, age, []);

        return user;
    },

    async uploadFile(parent, { file, userId }, { db }, info) {
        const { createReadStream, filename, mimetype, encoding } = await file;
        const user = await db.UserModel.findOne({_id: userId});
        const readStream1 = createReadStream();
        const readStream2 = createReadStream();
        const writeStream = await saveImage(db, readStream1, filename);
        user.images.push(writeStream.id);
        await user.save();
        return await readStreamToDataUrl(readStream2);
    }
};

export default Mutation;