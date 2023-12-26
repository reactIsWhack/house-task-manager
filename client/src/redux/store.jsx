import { configureStore } from '@reduxjs/toolkit';
import tasksSlice from './features/tasks/taskSlice';
import popUpSlice from './features/modal/popUp';

const store = configureStore({
  reducer: {
    tasks: tasksSlice,
    modal: popUpSlice,
  },
});

export default store;
