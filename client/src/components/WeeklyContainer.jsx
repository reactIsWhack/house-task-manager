import React, { useEffect, useState } from 'react';
import { selectMergedTasks } from '../redux/features/tasks/taskSlice';
import { useSelector } from 'react-redux';

function WeeklyContainer() {
  const mergedTasks = useSelector(selectMergedTasks);

  const groupedByWeek = mergedTasks.reduce((acc, task) => {
    const week = task.week - 1; // Replace 'week' with the actual property name
    console.log(week, 'week');

    if (!acc[week]) {
      acc[week] = [];
    }
    console.log(acc);

    acc[week].push(task);
    return acc;
  }, {});

  return (
    <div className="weekly-task-container">
      <h2>Weekly Tasks</h2>

      <table border="1">
        <thead>
          <tr>
            <th>Stats</th>
            <th>Week 1</th>
            <th>Week 2</th>
            <th>Week 3</th>
            <th>Week 4</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Total</td>
            <td>{groupedByWeek[0] && groupedByWeek[0].length}</td>
            <td>{groupedByWeek[1] && groupedByWeek[1].length}</td>
            <td>{groupedByWeek[2] && groupedByWeek[2].length}</td>
            <td>{groupedByWeek[3] && groupedByWeek[3].length}</td>
          </tr>
          <tr>
            <td>Completed</td>
            <td>
              {groupedByWeek[0] &&
                groupedByWeek[0].filter((task) => task.completed).length}
            </td>
            <td>
              {groupedByWeek[1] &&
                groupedByWeek[1].filter((task) => task.completed).length}
            </td>
            <td>
              {groupedByWeek[2] &&
                groupedByWeek[2].filter((task) => task.completed).length}
            </td>
            <td>
              {groupedByWeek[3] &&
                groupedByWeek[3].filter((task) => task.completed).length}
            </td>
          </tr>
          <tr>
            <td>Incomplete</td>
            <td>
              {groupedByWeek[0] &&
                groupedByWeek[0].filter((task) => !task.completed).length}
            </td>
            <td>
              {groupedByWeek[1] &&
                groupedByWeek[1].filter((task) => !task.completed).length}
            </td>
            <td>
              {groupedByWeek[2] &&
                groupedByWeek[2].filter((task) => !task.completed).length}
            </td>
            <td>
              {groupedByWeek[3] &&
                groupedByWeek[3].filter((task) => !task.completed).length}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default WeeklyContainer;
