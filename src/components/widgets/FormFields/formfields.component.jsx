import React from "react";

import classes from "./formfields.module.css";

const FormFields = ({ formData, change, id }) => {
  const showError = () => {
    let errorMessage = null;

    if (formData.validation && !formData.valid) {
      errorMessage = (
        <div className={classes.labelError}>{formData.validationMessage}</div>
      );
    }

    return errorMessage;
  };

  const renderTemplate = () => {
    let template = null;

    switch (formData.element) {
      case "input":
        template = (
          <div>
            <input
              {...formData.config}
              value={formData.value}
              onBlur={(e) => change({ e, id, blur: true })}
              onChange={(e) => change({ e, id, blur: false })}
            />
            {showError()}
          </div>
        );
        break;

      case "select":
        template = (
          <select
            value={formData.value}
            name={formData.config.name}
            onBlur={(e) => change({ e, id, blur: true })}
            onChange={(e) => change({ e, id, blur: false })}
          >
            {formData.config.options.map((el, i) => (
              <option key={i} value={el.id}>
                {el.name}
              </option>
            ))}
          </select>
        );
        break;

      default:
        template = null;
        break;
    }

    return template;
  };

  return <div>{renderTemplate()}</div>;
};

export default FormFields;
