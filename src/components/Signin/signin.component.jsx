import React, { Component } from "react";

import classes from "./signin.module.css";
import FormFields from "../widgets/FormFields/formfields.component";

import { firebase } from "../../firebase";

class Signin extends Component {
  state = {
    registerError: "",
    loading: false,
    formData: {
      email: {
        element: "input",
        value: "",
        config: {
          name: "email_input",
          type: "email",
          placeholder: "Enter your email",
        },
        validation: {
          required: true,
          email: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
      password: {
        element: "input",
        value: "",
        config: {
          name: "password_input",
          type: "password",
          placeholder: "Enter your password",
        },
        validation: {
          required: true,
          password: true,
        },
        valid: false,
        touched: false,
        validationMessage: "",
      },
    },
  };

  updateForm = (el) => {
    const newFormData = { ...this.state.formData };
    const newElement = {
      ...newFormData[el.id],
      value: el.e.target.value,
    };

    if (el.blur) {
      let validData = this.validate(newElement);
      newElement.valid = validData[0];
      newElement.validationMessage = validData[1];
    }
    newElement.touched = el.blur;
    newFormData[el.id] = newElement;
    this.setState({
      formData: newFormData,
    });
  };

  validate = (el) => {
    let error = [true, ""];

    if (el.validation.email) {
      // console.log("ISIDE");
      const valid = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(el.value);
      const message = `${!valid ? "Must be a valid email" : ""}`;
      error = !valid ? [valid, message] : error;
    }
    if (el.validation.password) {
      const valid = el.value.length >= 5;
      const message = `${!valid ? "Must be greater than 5" : ""}`;
      error = !valid ? [valid, message] : error;
    }
    if (el.validation.required) {
      // console.log("ISIDE");
      const valid = el.value.trim() !== "";
      const message = `${!valid ? "This field is required" : ""}`;
      error = !valid ? [valid, message] : error;
    }
    return error;
  };

  submitButton = () => {
    return this.state.loading ? (
      "Loading . . ."
    ) : (
      <div>
        <button onClick={(e) => this.submitForm(e, false)}>Register Now</button>
        <button onClick={(e) => this.submitForm(e, true)}>Login</button>
      </div>
    );
  };

  submitForm = (e, type) => {
    e.preventDefault();
    if (type !== null) {
      let dataToSubmit = {};
      let formIsValid = true;

      for (let key in this.state.formData) {
        dataToSubmit[key] = this.state.formData[key].value;
      }

      for (let key in this.state.formData) {
        formIsValid = this.state.formData[key].valid && formIsValid;
      }

      if (formIsValid) {
        this.setState({
          loading: true,
          registerError: "",
        });

        if (type) {
          firebase
            .auth()
            .signInWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history.push("/");
            })
            .catch((error) => {
              this.setState({
                loading: false,
                registerError: error.message,
              });
            });
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(
              dataToSubmit.email,
              dataToSubmit.password
            )
            .then(() => {
              this.props.history.push("/");
            })
            .catch((error) => {
              this.setState({
                loading: false,
                registerError: error.message,
              });
            });
        }
      }
    }
  };

  showError = () => {
    return this.state.registerError !== "" ? (
      <div className={classes.error}>{this.state.registerError}</div>
    ) : (
      ""
    );
  };

  render() {
    return (
      <div className={classes.signin}>
        <form onSubmit={(e) => this.submitForm(e, null)}>
          <h2>Register / Login</h2>
          <FormFields
            id={"email"}
            formData={this.state.formData.email}
            change={(el) => this.updateForm(el)}
          />

          <FormFields
            id={"password"}
            formData={this.state.formData.password}
            change={(el) => this.updateForm(el)}
          />

          {this.submitButton()}
          {this.showError()}
        </form>
      </div>
    );
  }
}

export default Signin;
