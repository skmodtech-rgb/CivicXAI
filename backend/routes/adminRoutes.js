const express = require('express');
const User = require('../models/User');
const Complaint = require('../models/Complaint');
const { protect, admin } = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/stats', protect, admin, async (req, res) => {
  try {
    const totalComplaints = await Complaint.countDocuments();
    const resolvedComplaints = await Complaint.countDocuments({ status: 'Resolved' });
    const pendingComplaints = await Complaint.countDocuments({ status: { $in: ['Submitted', 'Under Review', 'Assigned', 'In Progress'] } });
    
    const resolutionRate = totalComplaints === 0 ? 0 : ((resolvedComplaints / totalComplaints) * 100).toFixed(2);

    const categoryStats = await Complaint.aggregate([
      { $group: { _id: '$category', count: { $sum: 1 } } }
    ]);

    res.json({
      totalComplaints,
      resolvedComplaints,
      pendingComplaints,
      resolutionRate,
      categoryStats
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/users', protect, admin, async (req, res) => {
  try {
    const users = await User.find({}).select('-password');
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;
