
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  name: String,
  image: String,  // Stores the image path
  age: Number,
  status: {
    type: String,
    enum: ['Active', 'Inactive'],
    default: 'Active',
  },
});

const Student = mongoose.model('Student', studentSchema, 'students');
module.exports = Student;
