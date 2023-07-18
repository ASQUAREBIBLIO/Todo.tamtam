import React from "react";
import styles from "./Form.module.scss";

const Form = ({
  titleValue,
  handleOnChange,
  handleOnClick,
  handleOnCancel,
}) => {
  return (
    <div className={styles.form}>
      <input
        type="text"
        name="title"
        placeholder="Add todo"
        value={titleValue}
        onChange={handleOnChange}
      />
      <button className={styles.primary_button} onClick={handleOnClick}>
        Save
      </button>
      <button className={styles.secondary_button} onClick={handleOnCancel}>
        Cancel
      </button>
    </div>
  );
};

export default Form;
