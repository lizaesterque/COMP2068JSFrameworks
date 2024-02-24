const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  StudentNumber: {
    type: String,
    required: true,
  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String,
    required: true,
  },
  EmailAddress: {
    type: String,
    required: true,
  },
});

const student = mongoose.model('students', studentSchema);

module.exports = student;
