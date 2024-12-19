import PropTypes from 'prop-types';
import Task from './Task.jsx';
import './TaskList.css';

const TaskList = ({ tasks, onCompleteTask, onRemoveTask }) => {
  const getTaskListJSX = (tasks) => {
    return tasks.sort((task1, task2) => task1.id - task2.id).map(task => {
      return (
        <Task
          key={task.id}
          id={task.id}
          title={task.title}
          isComplete={task.isComplete}
          onCompleteTask={onCompleteTask}
          onRemoveTask={onRemoveTask}
        />
      );
    });
  };

  return <ul className="tasks__list no-bullet">{getTaskListJSX(tasks)}</ul>;
};

TaskList.propTypes = {
  tasks: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      isComplete: PropTypes.bool.isRequired,
    })
  ).isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
};

export default TaskList;
