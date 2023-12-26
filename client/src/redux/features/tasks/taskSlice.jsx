import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import {
  createTask,
  getAllTasks,
  completePatch,
  taskDeleted,
  editTask,
  moveTask,
} from '../../../services/tasksService';
import { toast } from 'react-toastify';
import closeIcon from '../../../assets/closeIcon.svg';

const initialState = {
  monthlyTasks: [],
  mergedTasks: [],
  isLoading: false,
  completedWeeklyTasks: [],
};

const toastError = (message) =>
  toast.error(message, {
    className: 'custom-toast',
    closeButton: <CustomCloseButton />,
  });

const toastSuccess = (message) =>
  toast.success(message, {
    className: 'custom-toast',
    closeButton: <CustomCloseButton />,
  });
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (formData, thunkAPI) => {
    try {
      const response = await createTask(formData);
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const getTasks = createAsyncThunk(
  'tasks/getTasks',
  async (_, thunkAPI) => {
    try {
      const data = await getAllTasks();
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const completeTask = createAsyncThunk(
  'tasks/completeTask',
  async (id, thunkAPI) => {
    try {
      const response = await completePatch(id);
      thunkAPI.dispatch(getTasks());
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, thunkAPI) => {
    try {
      const response = await taskDeleted(id);
      thunkAPI.dispatch(getTasks());
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const updatetask = createAsyncThunk(
  'tasks/updateTask',
  async (formData, thunkAPI) => {
    try {
      const updatedTask = await editTask(formData);
      thunkAPI.dispatch(getTasks());
      return updatedTask;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const copyTask = createAsyncThunk(
  'tasks/copyTask',
  async (formData, thunkAPI) => {
    try {
      const data = await moveTask(formData);
      thunkAPI.dispatch(getTasks());
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {
    getCompletedWeeklyTasks(state) {
      state.completedWeeklyTasks = state.mergedTasks.filter(
        (task) => task.completed
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.isLoading = false;
        if (action.payload.sorting.monthly) {
          state.monthlyTasks = [...state.monthlyTasks, action.payload];
        } else {
          state.mergedTasks = [...state.mergedTasks, action.payload];
        }
        toastSuccess('Task Added!');
      })
      .addCase(addTask.rejected, (state, action) => {
        state.isLoading = false;
        toastError(action.payload);
      })
      .addCase(getTasks.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getTasks.fulfilled, (state, action) => {
        state.isLoading = false;
        state.monthlyTasks = action.payload.monthlyTasks;
        state.mergedTasks = action.payload.mergedTasks;
      })
      .addCase(getTasks.rejected, (state, action) => {
        state.isLoading = false;
        toastError(action.payload);
      })
      .addCase(completeTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(completeTask.fulfilled, (state, action) => {
        state.isLoading = false;
        toastSuccess('Task Completed');
      })
      .addCase(completeTask.rejected, (state, action) => {
        state.isLoading = false;
        toastError(action.payload);
      })
      .addCase(deleteTask.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.info(action.payload.msg, {
          className: 'custom-toast',
          closeButton: <CustomCloseButton />,
        });
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.isLoading = false;
        toastError(action.payload);
      })
      .addCase(updatetask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(updatetask.fulfilled, (state, action) => {
        state.isLoading = false;
        toastSuccess('Task Updated!');
      })
      .addCase(updatetask.rejected, (state, action) => {
        state.isLoading = false;
        toastError(action.payload);
      })
      .addCase(copyTask.pending, (state, action) => {
        state.isLoading = true;
      })
      .addCase(copyTask.fulfilled, (state, action) => {
        state.isLoading = false;
        toast.info('Task Copied to Weekly Tasks', {
          className: 'custom-toast',
          closeButton: <CustomCloseButton />,
        });
      })
      .addCase(copyTask.rejected, (state, action) => {
        state.isLoading = false;
        toastError(action.payload);
      });
  },
});

const CustomCloseButton = ({ closeToast }) => (
  <img className="close-icon" src={closeIcon} />
);

export default tasksSlice.reducer;

export const { getCompletedWeeklyTasks } = tasksSlice.actions;

export const selectMonthlyTasks = (state) => state.tasks.monthlyTasks;
export const selectMergedTasks = (state) => state.tasks.mergedTasks;
export const selectIsLoading = (state) => state.tasks.isLoading;
export const selectWeeklyTasksCompleted = (state) =>
  state.tasks.completedWeeklyTasks;
