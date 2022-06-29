import mongoose from 'mongoose';

const Connection=async (username,password)=>{
    const URL=`mongodb+srv://${username}:${password}@cluster0.ft3sv.mongodb.net/?retryWrites=true&w=majority`;
    try{
        await mongoose.connect(URL,{
            useNewUrlParser:true
        })
        console.log('databaasae connected ')
    }catch(err){
        console.log('error while connecting with the database ',err);
    }
}
export default Connection;