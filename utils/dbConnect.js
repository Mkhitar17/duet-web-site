// import mongoose from 'mongoose';

// const MONGODB_URI = process.env.MONGODB_URI;

// if (!MONGODB_URI) {
//   throw new Error('Please define the MONGODB_URI environment variable in .env.local');
// }

// let cached = global.mongoose;

// if (!cached) {
//   cached = global.mongoose = { conn: null, promise: null };
// }

// async function dbConnect() {
//   if (cached.conn) {
//     return cached.conn;
//   }

// console.log('Connecting to MongoDB:', process.env.MONGODB_URI);

//   if (!cached.promise) {
//     const opts = {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       dbName: 'Duet', // Ensure the Duet database is explicitly used
//     };

//     cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
//       return mongoose;
//     });
//   }

//   cached.conn = await cached.promise;
//   return cached.conn;
// }

// export default dbConnect;




import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable in .env.local');
}

async function dbConnect() {
  console.log('Connecting to MongoDB:', process.env.MONGODB_URI);

  const opts = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'Duet', // Ensure the Duet database is explicitly used
  };

  // Always connect from scratch without caching
  const connection = await mongoose.connect(MONGODB_URI, opts);
  return connection;
}

export default dbConnect;
