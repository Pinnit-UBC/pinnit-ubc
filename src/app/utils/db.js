import mongoose from 'mongoose';
const username = process.env.NEXT_PUBLIC_DB_USERNAME;
const password = process.env.NEXT_PUBLIC_DB_PASSWORD;
const db = process.env.NEXT_PUBLIC_DB_NAME;
const cluster = process.env.NEXT_PUBLIC_CLUSTER_NAME;

const URI = `mongodb+srv://${username}:${password}@${cluster}.dvqbjnc.mongodb.net/${db}?retryWrites=true&w=majority&appName=Cluster0`

const pinnitDBConnection = async () => {
    try {
        await mongoose.connect(URI)
        console.log("Connected to pinnitDb")

    } catch (err){
        console.log("Can't connect to pinnitdB", err)
    }
}

export default pinnitDBConnection;