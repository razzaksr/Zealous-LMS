const express = require('express');
const router = express.Router();
const Admin = require('../models/Admin');
const authenticate = require('../middleware/authenticate'); // Middleware to authenticate admins

// CREATE Admin
router.post('/addAdmin', authenticate, async (req, res) => {
  try {
    const newAdmin = new Admin(req.body);
    const admin = await newAdmin.save();
    res.status(201).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Admins
router.get('/getAllAdmins', authenticate, async (req, res) => {
  try {
    const admins = await Admin.find();
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Admin by ID
router.get('/getAdminById/:id', authenticate, async (req, res) => {
  try {
    const admin = await Admin.findById(req.params.id);
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Admin
router.put('/updateAdmin/:id', authenticate, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });
    res.status(200).json(admin);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Admin
router.delete('/deleteAdmin/:id', authenticate, async (req, res) => {
  try {
    const admin = await Admin.findByIdAndDelete(req.params.id);
    if (!admin) return res.status(404).json({ msg: 'Admin not found' });
    res.status(200).json({ msg: 'Admin deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
