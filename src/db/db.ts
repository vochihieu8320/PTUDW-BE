import mongoose from 'mongoose';

const host_db :string = process.env.db || "mongodb+srv://1803:1803@cluster0.dwvix.mongodb.net/Auction";


async function connect(){

    try 
    {
        await mongoose.connect(host_db);
        console.log("connect to mongoDB");    
    } catch (error) {
        console.log("error", error)
    }
}

export default connect