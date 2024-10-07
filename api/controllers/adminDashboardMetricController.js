const express = require('express');
const router = express.Router();
const AdminDashboardMetric = require('../models/AdminDashboardMetrics');

// CREATE Admin Dashboard Metric
router.post('/addMetric', async (req, res) => {
  try {
    const newMetric = new AdminDashboardMetric(req.body);
    const metric = await newMetric.save();
    res.status(201).json(metric);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ All Metrics
router.get('/getAllMetrics', async (req, res) => {
  try {
    const metrics = await AdminDashboardMetric.find();
    res.status(200).json(metrics);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// READ Metric by ID
router.get('/getMetricById/:id', async (req, res) => {
  try {
    const metric = await AdminDashboardMetric.findById(req.params.id);
    if (!metric) return res.status(404).json({ msg: 'Metric not found' });
    res.status(200).json(metric);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// UPDATE Metric
router.put('/updateMetric/:id', async (req, res) => {
  try {
    const metric = await AdminDashboardMetric.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!metric) return res.status(404).json({ msg: 'Metric not found' });
    res.status(200).json(metric);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE Metric
router.delete('/deleteMetric/:id', async (req, res) => {
  try {
    const metric = await AdminDashboardMetric.findByIdAndDelete(req.params.id);
    if (!metric) return res.status(404).json({ msg: 'Metric not found' });
    res.status(200).json({ msg: 'Metric deleted' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
