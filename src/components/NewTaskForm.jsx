import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ handleOnSubmit }) => {
  const [title, setTaskTitle] = useState('');

  const handleAddTitle = (event) => {
    setTaskTitle(event.target.value);
  };

  const onHandleOnSubmit = (event) => {
    event.preventDefault();
    const newTask = {
      title,
      description: '',
    };
    handleOnSubmit(newTask);
    setTaskTitle('');
  };

  return (
    <form onSubmit={onHandleOnSubmit}>
      <label htmlFor='title'>Task title: </label>
      <input type='text' id='title' name='title' value={title} onChange={handleAddTitle}/>
      <div>
        <input type='submit' value='Add a task'/>
      </div>
    </form>
  );
};

NewTaskForm.propTypes = {
  handleOnSubmit: PropTypes.func.isRequired,
};

export default NewTaskForm;