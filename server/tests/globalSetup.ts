import { MongoMemoryServer } from 'mongodb-memory-server';
import mongoose from 'mongoose';

let mongoServer: MongoMemoryServer;

export default async function globalSetup() {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();
  
  // Save the instance to global context to access it in globalTeardown
  (global as any).__MONGO_URI__ = uri;
  (global as any).__MONGO_SERVER__ = mongoServer;

  await mongoose.connect(uri);
  console.log('MongoDB in-memory server started');
}
