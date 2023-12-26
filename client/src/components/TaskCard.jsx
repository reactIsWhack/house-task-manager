import React, { useState } from 'react';
import checkIcon from '../assets/checkIcon.svg';
import trashIcon from '../assets/trashIcon.svg';
import editIcon from '../assets/editIcon.svg';
import { useDispatch, useSelector } from 'react-redux';
import { completeTask, deleteTask } from '../redux/features/tasks/taskSlice';
import Modal from './Modal';
import {
  selectIsOpen,
  selectWeekFormOpen,
} from '../redux/features/modal/popUp';
import { toggle, toggleWeekFrom } from '../redux/features/modal/popUp';
import WeekForm from './WeekForm';
import { selectPageType } from '../redux/features/modal/popUp';

function TaskCard({ name, completed, _id, sorting }) {
  const dispatch = useDispatch();
  const isOpen = useSelector(selectIsOpen);
  const weekFormOpen = useSelector(selectWeekFormOpen);
  const pageType = useSelector(selectPageType);
  const [formData, setFormData] = useState({
    name: '',
    week: 1,
  });

  const handleCompleteTask = async () => {
    dispatch(completeTask(_id));
  };

  const handleDeleteTask = async () => {
    dispatch(deleteTask(_id));
  };

  const toggleModal = (toggleType) => {
    dispatch(toggle({ toggle: toggleType }));
  };

  console.log(sorting.weekly);

  return (
    <>
      <div className="card-container">
        <ul>
          <li className={completed ? 'crossed-out' : 'incomplete'}>{name}</li>
        </ul>
        <div className="icons">
          <img src={checkIcon} onClick={handleCompleteTask} />
          <img src={trashIcon} onClick={handleDeleteTask} />
          <img src={editIcon} onClick={() => toggleModal('open')} />
          <div className="folder-icon">
            {sorting.monthly && pageType === 'month' && (
              <img
                onClick={() => dispatch(toggleWeekFrom({ toggle: 'open' }))}
                src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAACKklEQVR4nO2YO2gUQRyHv8QIaSxiEbu4iSI+EIsExEdqG8HGLmnsRcHGykYMmBRCDKKFjVikSyUiWKiNhYUIQYLERK9RsDAGE848zIaBCfwZ9vZm5+ZuZ2E++FU7szMfzBsikUikihwDngOfgaWMfAVeA9eBHgLjNLAOpJb5CAwQEK8KdH4vP4FzBMKq6NhFYCgjR4AbwIYoWwfGCYBUpBmjwC9RfgdYbjBvlhpEDcEZoL8MAcUgMO8w7FIjP3xJFBVQHABeeJB4VJaAYl+D+TLUJOOivU9lCriSiPa+2VYaBl7q5e+3ESkwoYdHUAJngc0C43IROBGSwBuHyfUHuBSKwJqocBLoy8hBYAz4K8puAzdDEEgLTNIzQM2os5Ixb/JSA2b1ftFxAcUh4L2HNX6lwaGv7QKKXn28blXiaVkCe/Q55LJob75sAReSJh3suMCkXsmmqipQF/XvVFHgiXH+v1Y1gf3GtVNtcFdCEhgEbgG3c3IP2BL/UTv2iKPAsPi+4EPgi+Mav2gh8D9jp5b36lkfAsuOAt8tBNKc/NNPOi0LHAfuAvdzMm0Mobq+4LsIbAEfgPM2nbcRsLk6zhnD4mpO+USUrWXs1OqYUohWBR4Y/1DvQ96vjO0UkM+ONrtxEprAQ30lfQx0VVFA0Y09iW8BOQQO035GRXvqub5l3jmu8z7yzIfABX1+6XTn14CjeEJtGm+NV4d2ZVU/op3y1flIJBKJYMsuVXQftH4pyVYAAAAASUVORK5CYII="
              />
            )}
            {weekFormOpen && sorting.monthly && <WeekForm id={_id} />}
          </div>
        </div>
      </div>
      {isOpen && (
        <Modal setFormData={setFormData} formData={formData} id={_id} />
      )}
    </>
  );
}

export default TaskCard;
