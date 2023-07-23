import React, { useState } from "react";
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
        name="titleInput"
        placeholder="Add todo"
        value={titleValue}
        onChange={handleOnChange}
      />
      {titleValue.length == 0 ? (
        <button disabled className={styles.disabled_button}>
          Save
        </button>
      ) : (
        <button className={styles.primary_button} onClick={handleOnClick}>
          Save
        </button>
      )}
      <button className={styles.secondary_button} onClick={handleOnCancel}>
        Cancel
      </button>
    </div>
  );
};

export default Form;
