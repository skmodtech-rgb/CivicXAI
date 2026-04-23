const express = require('express');
const Complaint = require('../models/Complaint');
const User = require('../models/User');
const { protect, officialOrAdmin } = require('../middleware/authMiddleware');

const router = express.Router();

// Create complaint
router.post('/', protect, async (req, res) => {
  try {
    // Basic AI detection simulation
    let assignedPriority = 'Medium';
    const text = req.body.description.toLowerCase();
    if (text.includes('urgent') || text.includes('emergency') || text.includes('accident')) {
      assignedPriority = 'Critical';
    } else if (text.includes('leak') || text.includes('fire')) {
      assignedPriority = 'High';
    }

    const complaint = await Complaint.create({
      ...req.body,
      priority: assignedPriority,
      user: req.user._id
    });

    // Add points for raising complaint
    await User.findByIdAndUpdate(req.user._id, { $inc: { points: 10 } });

    res.status(201).json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all complaints for citizen
router.get('/my', protect, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all complaints (Admin/Official)
router.get('/', protect, officialOrAdmin, async (req, res) => {
  try {
    const complaints = await Complaint.find().populate('user', 'name email').sort({ createdAt: -1 });
    res.json(complaints);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Update complaint status
router.put('/:id/status', protect, officialOrAdmin, async (req, res) => {
  try {
    const { status, resolutionProof } = req.body;
    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });

    complaint.status = status;
    if (resolutionProof) complaint.resolutionProof = resolutionProof;
    if (status === 'Resolved') {
      // Add points to user when resolved
      await User.findByIdAndUpdate(complaint.user, { $inc: { points: 50 } });
    }

    await complaint.save();
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get complaint by ID
router.get('/:id', protect, async (req, res) => {
  try {
    const complaint = await Complaint.findById(req.params.id).populate('user', 'name email');
    if (!complaint) return res.status(404).json({ message: 'Complaint not found' });
    res.json(complaint);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
