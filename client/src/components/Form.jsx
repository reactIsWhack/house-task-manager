import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTask } from '../redux/features/tasks/taskSlice';
import {
  selectMergedTasks,
  selectMonthlyTasks,
  selectWeeklyTasksCompleted,
  getCompletedWeeklyTasks,
} from '../redux/features/tasks/taskSlice';

function Form() {
  const currentDate = new Date();
  const currentMonth = currentDate.toLocaleString('en-US', { month: 'long' });
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    monthly: false,
    week: 1,
  });
  const monthlyTasks = useSelector(selectMonthlyTasks);
  const mergedTasks = useSelector(selectMergedTasks);
  const completedWeeklyTasks = useSelector(selectWeeklyTasksCompleted);
  const [completedMonthlyTasks, setCompletedMonthlyTasks] = useState([]);
  console.log(completedMonthlyTasks);

  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    dispatch(addTask(formData));

    setFormData({ name: '', monthly: false, week: 1 });
  };

  useEffect(() => {
    dispatch(getCompletedWeeklyTasks());
    setCompletedMonthlyTasks(monthlyTasks.filter((task) => task.completed));
  }, [mergedTasks, monthlyTasks]);

  return (
    <>
      <div className="form-section">
        <h2>Add Task</h2>
        <form onSubmit={handleSubmit}>
          <label>Name</label>
          <input
            type="text"
            className="name-input"
            name="name"
            onChange={handleChange}
            value={formData.name}
          />
          <label>Week</label>
          <select name="week" onChange={handleChange}>
            <option value={1}>Week 1</option>
            <option value={2}>Week 2</option>
            <option value={3}>Week 3</option>
            <option value={4}>Week 4</option>
          </select>
          <div className="checkbox-container">
            <input
              type="checkbox"
              className="checkbox-input"
              name="monthly"
              checked={formData.monthly}
              onChange={handleChange}
            />
            monthly
          </div>
          <button>Save</button>
        </form>
        <h1>{currentMonth}</h1>
        <ul>
          <li>
            You have <strong>{monthlyTasks.length}</strong> total monthly
            task(s), and <strong>{mergedTasks.length}</strong> total weekly
            task(s)
          </li>
          <li>
            You have completed <strong>{completedMonthlyTasks.length}</strong>{' '}
            monthly task(s), and <strong>{completedWeeklyTasks.length}</strong>{' '}
            weekly task(s)
          </li>
        </ul>
      </div>
    </>
  );
}

export default Form;
