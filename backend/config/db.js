const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const username = encodeURIComponent(process.env.USER_NAME)
        const password = encodeURIComponent(process.env.PASSWORD)
        await mongoose.connect(`mongodb+srv://${username}:${password}@cluster0.yqd3ckv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`);
        console.log("MongoDB Connected");
    } catch (err) {
        console.error(err.message);
        process.exit(1);
    }
};

module.exports = connectDB;
