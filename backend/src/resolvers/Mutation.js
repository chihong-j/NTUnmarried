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
        const user = await db.UserModel.findOne({ mail:me.email });
        const readStream1 = createReadStream();
        const readStream2 = createReadStream();
        const writeStream = await saveImage(db, readStream1, filename);
        user.images.push(writeStream.id);
        await user.save();
        return await readStreamToDataUrl(readStream2);
    },

    async getUser(parent, { email }, { db }, info) {
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
};

export default Mutation;
