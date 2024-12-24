const { MongoClient } = require('mongodb')
const bcrypt = require('bcryptjs')
require('dotenv').config({ path: '.env.local' })

async function createAdmin() {
  if (!process.env.MONGODB_URI) {
    console.error('Please set MONGODB_URI in .env.local')
    process.exit(1)
  }

  const client = new MongoClient(process.env.MONGODB_URI)

  try {
    await client.connect()
    const db = client.db('fabriq3d')

    const adminEmail = 'admin@fabriq3d.solutions'
    const adminPassword = 'admin123' // Changez ce mot de passe !

    const existingUser = await db.collection('users').findOne({ email: adminEmail })
    if (existingUser) {
      console.log('Admin user already exists')
      process.exit(0)
    }

    const hashedPassword = await bcrypt.hash(adminPassword, 10)
    await db.collection('users').insertOne({
      email: adminEmail,
      password: hashedPassword,
      name: 'Admin',
      role: 'admin',
      createdAt: new Date()
    })

    console.log('Admin user created successfully')
    console.log('Email:', adminEmail)
    console.log('Password:', adminPassword)
  } catch (error) {
    console.error('Error creating admin user:', error)
  } finally {
    await client.close()
  }
}

createAdmin()
