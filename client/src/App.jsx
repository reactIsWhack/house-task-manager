import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Form from './components/Form';
import WeeklyContainer from './components/WeeklyContainer';
import MonthlyContainer from './components/MonthlyContainer';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useSelector, useDispatch } from 'react-redux';
import { getTasks } from './redux/features/tasks/taskSlice';
import { selectIsLoading } from './redux/features/tasks/taskSlice';
import loadingGif from './assets/loader.gif';
import PaginationButtons from './components/PaginationButtons';
import Task from './components/Task';

function App() {
  const dispatch = useDispatch();
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(getTasks());
  }, []);

  if (isLoading) {
    return (
      <div className="loader-img">
        <img src={loadingGif} alt="loading-gif" />
      </div>
    );
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route index element={<Form />}></Route>
          <Route path="/weeklytasks" element={<PaginationButtons />}>
            <Route index element={<WeeklyContainer />}></Route>
            <Route path=":id" element={<Task />}></Route>
          </Route>
          <Route path="/monthlytasks" element={<MonthlyContainer />}></Route>
        </Route>
      </Routes>
      <ToastContainer />
    </div>
  );
}

export default App;
