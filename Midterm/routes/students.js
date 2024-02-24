
const express = require('express');
const router = express.Router();
const Student = require('../models/students');

// Read: Display a table with all the students
router.get('/', async (req, res) => {
  try {
    const students = await Student.find();
    res.render('students/index', { students });
  } catch (error) {
    console.error('Error fetching students:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;

