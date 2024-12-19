import { useState } from 'react';
import PropTypes from 'prop-types';

const NewTaskForm = ({ handleOnSubmit }) => {
  const kDefaultFormState = {
    title: '',
    description: '',
  };

  const [formData, setFormData] = useState(kDefaultFormState);

  const handleChange = (event) => {
    const fieldName = event.target.name;
    const fieldValue = event.target.value;

    const newFormData = {...formData, [fieldName] : fieldValue};
    setFormData(newFormData);
  };

  const onHandleOnSubmit = (event) => {
    event.preventDefault();
    handleOnSubmit(formData);
    setFormData(kDefaultFormState);
  };

  return (
    <form onSubmit={onHandleOnSubmit}>
      <div>
        <label htmlFor='title'>Task title: </label>
        <input type='text' id='title' name='title' value={formData.title} onChange={handleChange}/>
      </div>
      <div>
        <label htmlFor='description'>Task description: </label>
        <input type='text' id='description' name='description' value={formData.description} onChange={handleChange}/>
      </div>
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