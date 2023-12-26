import React, { useState } from 'react';
import { toggle } from '../redux/features/modal/popUp';
import { useDispatch } from 'react-redux';
import { updatetask } from '../redux/features/tasks/taskSlice';

function Modal({ setFormData, formData, id }) {
  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const editTask = () => {
    dispatch(updatetask({ id, name: formData.name, week: formData.week }));
    dispatch(toggle({ toggle: 'close' }));
  };

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Edit Task</h4>
        <input
          type="text"
          placeholder="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
        />
        <select name="week" value={formData.week} onChange={handleChange}>
          <option value={1}>Week 1</option>
          <option value={2}>Week 2</option>
          <option value={3}>Week 3</option>
          <option value={4}>Week 4</option>
        </select>
        <div className="btn-container">
          <button type="button" className="btn confirm-btn" onClick={editTask}>
            save
          </button>
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => dispatch(toggle({ toggle: 'close' }))}
          >
            cancel
          </button>
        </div>
      </div>
    </aside>
  );
}

export default Modal;
