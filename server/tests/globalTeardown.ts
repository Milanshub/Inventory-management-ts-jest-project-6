import mongoose from 'mongoose';

export default async function globalTeardown() {
  await mongoose.disconnect();

  // Access the MongoMemoryServer instance from the global context
  const mongoServer = (global as any).__MONGO_SERVER__;

  if (mongoServer) {
    await mongoServer.stop(); // Ensure `stop` is called on the instance
  }

  console.log('MongoDB in-memory server stopped');
}
