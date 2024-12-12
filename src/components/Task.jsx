import PropTypes from 'prop-types';
import './Task.css';

const Task = ({ id, title, isComplete, onCompleteTask, onRemoveTask }) => {
  const onTaskClicked = () => {
    onCompleteTask(id);
  };

  const onDeleteBtnClicked = () => {
    onRemoveTask(id);
  };

  const buttonClass = isComplete ? 'tasks__item__toggle--completed' : '';

  return (
    <li className="tasks__item">
      <button
        className={`tasks__item__toggle ${buttonClass}`}
        onClick={onTaskClicked}
      >
        {title}
      </button>
      <button className="tasks__item__remove button" onClick={onDeleteBtnClicked}>x</button>
    </li>
  );
};

Task.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  isComplete: PropTypes.bool.isRequired,
  onCompleteTask: PropTypes.func.isRequired,
  onRemoveTask: PropTypes.func.isRequired,
};

export default Task;
