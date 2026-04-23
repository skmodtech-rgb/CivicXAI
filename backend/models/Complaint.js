const mongoose = require('mongoose');

const complaintSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  category: { 
    type: String, 
    required: true,
    enum: ['Garbage', 'Water Leakage', 'Illegal Parking', 'Road Damage', 'Fraud', 'Women Safety', 'Public Toilet', 'Street Light', 'Other']
  },
  status: { 
    type: String, 
    default: 'Submitted',
    enum: ['Submitted', 'Under Review', 'Assigned', 'In Progress', 'Resolved', 'Rejected']
  },
  priority: { type: String, enum: ['Low', 'Medium', 'High', 'Critical'], default: 'Medium' },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  assignedTo: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  location: {
    lat: { type: Number },
    lng: { type: Number },
    address: { type: String }
  },
  imageUrl: { type: String },
  resolutionProof: { type: String }
}, { timestamps: true });

module.exports = mongoose.model('Complaint', complaintSchema);
