import TaskList from './components/TaskList.jsx';
import NewTaskForm from './components/NewTaskForm.jsx';
import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

const kBaseUrl = 'http://localhost:5000/';

const convertFromApi = (apiTask) => {
  const newTask = {
    ...apiTask,
    title: apiTask.title,
    description: apiTask.description,
    isComplete: apiTask.is_complete,
  };
  delete newTask.is_complete;
  return newTask;
};

const getAllTasksApi = () => {
  return axios.get(`${kBaseUrl}/tasks`)
    .then(response => {
      const apiTask = response.data;
      const newTasks = apiTask.map(convertFromApi);
      return newTasks;
    })
    .catch(error => {
      console.log(error);
    });
};

const unregisterTaskApi = (id) => {
  return axios.delete(`${kBaseUrl}/tasks/${id}`)
    .catch(error => {
      console.log(error);
    });
};

const updateCompleteTaskApi = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_complete`)
    .then(response => {
      return response.data.task;
    })
    .catch(error => {
      console.log(error);
    });
};

const updateIncompleteTaskApi = (id) => {
  return axios.patch(`${kBaseUrl}/tasks/${id}/mark_incomplete`)
    .then(response => {
      return response.data.task;
    })
    .catch(error => {
      console.log(error);
    });
};

const App = () => {
  const [taskData, setTaskData] = useState([]);

  const getAllTasks = () => {
    getAllTasksApi()
      .then(tasks => {
        setTaskData(tasks);
      });
  };

  useEffect(() => {
    getAllTasks();
  }, []);

  const handleTask = (id) => {
    const taskToUpdate = taskData.find(task => task.id === id);
    updateCompleteTaskApi(id, !taskToUpdate.isComplete)
      .then(() => {
        const newTaskData = taskData.map(task => {
          if (task.id === id) {
            return { ...task, isComplete: !task.isComplete };
          }
          return task;
        });
        setTaskData(newTaskData);
      });
    updateIncompleteTaskApi(id, !taskToUpdate.isComplete)
      .then(() => {
        const newTaskData = taskData.map(task => {
          if (task.id === id) {
            return { ...task, isComplete: !task.isComplete };
          }
          return task;
        });
        setTaskData(newTaskData);
      });
  };

  const handleRemoveTask = (id) => {
    unregisterTaskApi(id)
      .then(() => {
        const newTaskData = taskData.filter(task => task.id !== id);
        setTaskData(newTaskData);
      });
  };

  const handleOnSubmit = (taskData) => {
    axios.post(`${kBaseUrl}/tasks`, taskData)
      .then((result) => {
        setTaskData((prevTasks) => [convertFromApi(result.data.task), ...prevTasks]);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Ada&apos;s Task List</h1>
      </header>
      <main>
        <div>
          <TaskList
            tasks={taskData}
            onCompleteTask={handleTask}
            onRemoveTask={handleRemoveTask}
          />
        </div>
        <NewTaskForm handleOnSubmit={handleOnSubmit}/>
      </main>
    </div>
  );
};

export default App;
