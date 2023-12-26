import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { selectMergedTasks } from '../redux/features/tasks/taskSlice';
import { useParams } from 'react-router-dom';
import TaskCard from './TaskCard';

function Task() {
  const mergedTasks = useSelector(selectMergedTasks);
  const { id } = useParams();
  // gets the tasks in the week selected
  const weekTasks = mergedTasks.filter((task) => task.week === Number(id));

  const renderedWeeklyTasks = weekTasks.map((task) => {
    return <TaskCard key={task.id} {...task} sorting={task && task.sorting} />;
  });

  console.log(weekTasks);
  return (
    <>
      <h2 style={{ marginLeft: '20px' }}>Week {id} Tasks</h2>
      <h3 style={{ marginLeft: '20px' }}>
        You have {weekTasks.length} tasks this week
      </h3>
      {renderedWeeklyTasks}
    </>
  );
}

export default Task;
