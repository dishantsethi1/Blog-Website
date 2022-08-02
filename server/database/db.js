import mongoose from 'mongoose';

const Connection=async (URL)=>{
    
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