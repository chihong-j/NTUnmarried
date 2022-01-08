import {checkUser, newUser, saveImage, readStreamToDataUrl, createToken} from "./utility";
import bcrypt from 'bcryptjs';
import {AuthenticationError} from "apollo-server-core";
import {UserModel} from "../db";

const Mutation = {
    async updateUser(parent, {email, name, gender, age}, {db, me}, info) {
        if (!me) throw new AuthenticationError('Not logged in');

        await db.UserModel.findOneAndUpdate({ email }, {name, gender, age});
        const user = db.UserModel.findOne({ email })
        return user;
    },

    async signup(parent, { email, name, gender, age, password }, { db }, info) {
        const user = await newUser(db, email, name, gender, age, password);
        return user ;
    },

    async login(parent, { email, password }, { db }, info) {
        const user = await db.UserModel.findOne({ email });
        if (!user) {
            throw new Error(`Email: ${email} not found!`)
        } else {
            // test
            if (password === user.password)
                return {
                    token: createToken(user, process.env.SECRET)
                }


            if (await bcrypt.compare(password, user.password)) {
                return {
                    token: createToken(user, process.env.SECRET)
                }
            } else {
                throw new Error('Wrong password!')
            }
        }
    },

    async uploadFile(parent, { file, userId }, { db, me }, info) {
        if (!me) throw new AuthenticationError('Not logged in');

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