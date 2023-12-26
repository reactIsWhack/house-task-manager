import React from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { setPageType } from '../redux/features/modal/popUp';
import { useDispatch } from 'react-redux';

function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  return (
    <>
      <nav>
        <h1>Task Tracker</h1>
        <div>
          <h3 onClick={() => navigate('/')}>Home</h3>
          <h3
            onClick={() => {
              navigate('/weeklytasks');
              dispatch(setPageType('week'));
            }}
          >
            Weekly Tasks
          </h3>
          <h3
            onClick={() => {
              navigate('/monthlytasks');
              dispatch(setPageType('month'));
            }}
          >
            Monthly Tasks
          </h3>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Navbar;
