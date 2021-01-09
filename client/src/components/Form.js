import React from "react";

/*
The Form component is rendered on a number of pages, including the
"Create Course", "Update Course", "Sign Up" and "Log In" pages.

This function receives the relevant submit & cancel functions, button text,
errors and form elements from it's parent.
*/

const Form = (props) => {
  const { cancel, errors, submit, submitButtonText, elements } = props;

  /*
    Both the handleSumbmit and handleCancel functions prevent the page from
    directing to another page using the event.preventDefault() function. The
    relevant function is then called from the parent component.
  */
  function handleSubmit(event) {
    event.preventDefault();
    submit();
  }

  function handleCancel(event) {
    event.preventDefault();
    cancel();
  }

  /*
    If any errors are returned from the rest API, these will be displayed above the form
    as validation errors via the function ErrorsDisplay. Beneath the form elements, the 
    submit and cancel buttons are also rendered.
  */

  return (
    <div>
      <ErrorsDisplay errors={errors} />
      <form onSubmit={handleSubmit}>
        {elements()}
        <div className="pad-bottom">
          <button className="button" type="submit">
            {submitButtonText}
          </button>
          <button className="button button-secondary" onClick={handleCancel}>
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
};

export default Form;

/*
  This function is called to display any errors returned from the REST API.
*/

function ErrorsDisplay({ errors }) {
  let errorsDisplay = null;

  if (errors.length) {
    errorsDisplay = (
      <div>
        <h2 className="validation--errors--label">Validation errors</h2>
        <div className="validation-errors">
          <ul>
            {errors.map((error, i) => (
              <li key={i}>{error}</li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return errorsDisplay;
}
