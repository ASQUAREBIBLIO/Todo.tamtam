import React, { useState } from "react";
import styles from "./Task.module.scss";

const Task = ({
  title,
  date,
  isDone,
  handleOnChange,
  handleOnDelete,
  handleOnHide,
}) => {
  const [isDelete, setIsDelete] = useState(false);
  const checkDate = () => {
    if (date == new Date()) date = "Today";
    checkDate();
  };

  return (
    <div className={styles.task}>
      <div className={styles.task_b}>
        <input
          type="checkbox"
          defaultChecked={isDone}
          onChange={handleOnChange}
        />

        <div className={styles.task_b_info}>
          <p>
            {title} <br /> <span>{`${date}`}</span>
          </p>
        </div>
      </div>
      <div>
        <abbr title="Delete task">
          <span
            className={`bi bi-trash-fill ${styles.show_dialog}`}
            onClick={() => setIsDelete((prev) => true)}
          />
        </abbr>
      </div>
      {isDelete && (
        <>
          <div className={styles.backdrop}></div>
          <div className={styles.delete_dialog}>
            <span
              className={`bi bi-x-circle ${styles.dialog_icon}`}
              onClick={() => setIsDelete((prev) => false)}
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
        </>
      )}
    </div>
  );
};

export default Task;
