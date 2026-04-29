const mongoose = require('mongoose');
require('dotenv').config();

async function dropEmailIndex() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');

    const db = mongoose.connection.db;
    const collection = db.collection('players');

    // Drop the unique email index
    try {
      await collection.dropIndex('email_1');
      console.log('Successfully dropped email_1 index');
    } catch (error) {
      if (error.code === 27) {
        console.log('Index email_1 does not exist, skipping...');
      } else {
        throw error;
      }
    }

    console.log('Done!');
    process.exit(0);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  }
}

dropEmailIndex();
