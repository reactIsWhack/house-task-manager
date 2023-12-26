import axios from 'axios';

export const createTask = async (formData) => {
  const { name, monthly, week } = formData;
  const response = await axios.post(
    'https://house-task-manager-server.onrender.com/api/tasks',
    {
      name,
      type: monthly ? 'monthly' : 'weekly',
      week: Number(week),
    }
  );
  return response.data;
};

export const getAllTasks = async () => {
  const { data } = await axios.get(
    'https://house-task-manager-server.onrender.com/api/tasks'
  );
  return data;
};

export const completePatch = async (id) => {
  const { data } = await axios.patch(
    `https://house-task-manager-server.onrender.com/api/tasks/completetask/${id}`
  );
  return data;
};

export const taskDeleted = async (id) => {
  const response = await axios.delete(
    `https://house-task-manager-server.onrender.com/api/tasks/deletetask/${id}`
  );
  return response;
};

export const editTask = async (formData) => {
  const { id, name, week } = formData;
  const { data } = await axios.patch(
    `https://house-task-manager-server.onrender.com/api/tasks/updatetask/${id}`,
    {
      name,
      week: Number(week),
    }
  );
  return data;
};

export const moveTask = async (data) => {
  const { id, week } = data;
  const response = await axios.patch(
    `https://house-task-manager-server.onrender.com/api/tasks/movetask/${id}`,
    {
      week: Number(week),
    }
  );
  return response.data;
};
