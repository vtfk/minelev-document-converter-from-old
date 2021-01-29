if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

module.exports = {
  NODE_ENV: process.env.NODE_ENV || 'development',
  MONGODB_CONNECTION: process.env.MONGODB_CONNECTION || null,
  MONGODB_COLLECTION_NEW: process.env.MONGODB_COLLECTION_NEW || '',
  MONGODB_NAME_NEW: process.env.MONGODB_NAME_NEW || '',
  MONGODB_COLLECTION_OLD: process.env.MONGODB_COLLECTION_OLD || '',
  MONGODB_NAME_OLD: process.env.MONGODB_NAME_OLD || ''
}
