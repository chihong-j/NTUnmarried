import dotenv from 'dotenv-defaults';
import mongoose from 'mongoose';


dotenv.config();

mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then((res) => {
    console.log("mongo db connection created");

});

const connection = mongoose.connection

export { connection };


