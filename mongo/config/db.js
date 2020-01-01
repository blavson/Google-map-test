const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.DATABASE_URL,  
       { useNewUrlParser: true , 
         useUnifiedTopology: true  ,
         useFindAndModify:  false ,
         useCreateIndex: true });
     console.log(`Connected to Host : ${conn.connection.host}`);            
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

module.exports=connectDB