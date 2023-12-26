const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const taskSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Please add an name'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  sorting: {
    type: Object,
    required: [true, 'Please add a sorting type'],
  },
  week: {
    type: Number,
    required: [true, 'Please add a week'],
  },
});

const Task = mongoose.model('task', taskSchema);
module.exports = Task;
