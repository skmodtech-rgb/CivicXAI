const mongoose = require('mongoose');
const dotenv = require('dotenv');
const User = require('./models/User');
const Complaint = require('./models/Complaint');

dotenv.config();

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB Connected for Seeding');

    // Clear existing data
    await User.deleteMany();
    await Complaint.deleteMany();

    // Create Admin
    const admin = await User.create({
      name: 'Admin User',
      email: 'admin@civicx.com',
      password: 'password123',
      role: 'admin'
    });

    // Create Official
    const official = await User.create({
      name: 'City Official',
      email: 'official@civicx.com',
      password: 'password123',
      role: 'official',
      department: 'General'
    });

    // Create Citizen
    const citizen = await User.create({
      name: 'John Citizen',
      email: 'citizen@civicx.com',
      password: 'password123',
      role: 'citizen',
      points: 120
    });

    // Create some dummy complaints
    await Complaint.create([
      {
        title: 'Huge pothole on Main Street',
        description: 'There is a dangerous pothole that caused multiple accidents.',
        category: 'Road Damage',
        status: 'Submitted',
        priority: 'High',
        user: citizen._id,
        location: { lat: 34.0522, lng: -118.2437, address: 'Main St, Downtown' }
      },
      {
        title: 'Water leaking from fire hydrant',
        description: 'Water has been leaking for 2 days straight. Urgent fix needed.',
        category: 'Water Leakage',
        status: 'In Progress',
        priority: 'Critical',
        user: citizen._id,
        assignedTo: official._id,
        location: { lat: 34.0522, lng: -118.2437, address: '2nd Ave, Westside' }
      },
      {
        title: 'Garbage not collected for a week',
        description: 'The bins are overflowing and causing a bad smell.',
        category: 'Garbage',
        status: 'Resolved',
        priority: 'Medium',
        user: citizen._id,
        assignedTo: official._id,
        location: { lat: 34.0522, lng: -118.2437, address: 'Pine Road' }
      }
    ]);

    console.log('Data Seeded Successfully');
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();
