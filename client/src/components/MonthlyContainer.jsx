import React from 'react';
import TaskCard from './TaskCard';
import { useSelector } from 'react-redux';
import { selectMonthlyTasks } from '../redux/features/tasks/taskSlice';

function MonthlyContainer() {
  const monthlyTasks = useSelector(selectMonthlyTasks);

  const renderedMonthlyTasks = monthlyTasks.map((task) => {
    return (
      <TaskCard
        key={task._id}
        name={task.name}
        completed={task.completed}
        sorting={task.sorting}
        _id={task._id}
      />
    );
  });

  return (
    <>
      <h2 style={{ marginLeft: '20px' }}>Monthly Tasks</h2>
      {renderedMonthlyTasks}
    </>
  );
}

export default MonthlyContainer;
