import React from "react";
import styles from "./Alerts.module.scss";

const Alerts = ({ message, handleOnClick }) => {
  return (
    <div className={styles.alert_success}>
      <span className="bi bi-check2-square" />
      <div>
        <strong>Success</strong>
        <p>{message}</p>
      </div>
      <i className="bi bi-x" onClick={handleOnClick} />
    </div>
  );
};

const Modal = ({ handleOnClick, handleOnDelete, handleOnHide }) => {
  return (
    <React.Fragment>
      <div className={styles.backdrop}></div>
      <div className={styles.delete_dialog}>
        <span
          className={`bi bi-x-circle ${styles.dialog_icon}`}
          onClick={handleOnClick}
        />
        <span className={styles.dialog_head}>Delete task</span>
        <div>
          <strong>Are you sure ?</strong>
          <p>This cannot be undone.</p>
        </div>
        <div className={styles.action_btn}>
          <div className={styles.hide_button} onClick={handleOnHide}>
            <span className={`bi bi-eye-slash-fill`} />
            <span>Delete</span>
          </div>
          <div className={styles.delete_button} onClick={handleOnDelete}>
            <span className={`bi bi-trash-fill`} />
            <span>Delete permanentaly</span>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export { Alerts, Modal };
