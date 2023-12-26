import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { toggleWeekFrom } from '../redux/features/modal/popUp';
import { copyTask } from '../redux/features/tasks/taskSlice';

function WeekForm({ id }) {
  const dispatch = useDispatch();
  const [weekData, setWeekData] = useState(1);

  const handleClick = () => {
    console.log(weekData);
    dispatch(copyTask({ id, week: weekData }));

    dispatch(toggleWeekFrom({ toggle: 'close' }));

    setWeekData(1);
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <select onChange={(e) => setWeekData(e.target.value)}>
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
        </select>
        <div className="btn-container">
          <button
            type="button"
            className="btn confirm-btn"
            onClick={handleClick}
          >
            move task
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(toggleWeekFrom({ toggle: 'close' }))}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

export default WeekForm;
