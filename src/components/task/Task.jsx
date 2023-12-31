import React, { useState, useEffect } from "react";
import styles from "./Task.module.scss";
import { ClipLoader } from "react-spinners";
import { Modal } from "../alerts/Alerts";

const Task = ({
  id,
  title,
  date,
  isDone,
  handleOnChange,
  handleOnDelete,
  handleOnHide,
  loading,
}) => {
  const [isDelete, setIsDelete] = useState(false);

  return (
    <div className={styles.task}>
      <div className={styles.task_b}>
        {loading === id ? (
          <div className={styles.input_loader}>
            <ClipLoader color="#9333EA" size={15} />
          </div>
        ) : (
          <input
            type="checkbox"
            defaultChecked={isDone}
            onChange={handleOnChange}
          />
        )}

        <div className={styles.task_b_info}>
          <p>
            {title} <br /> <span>{date}</span>
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
        <Modal
          handleOnClick={() => setIsDelete((prev) => false)}
          handleOnDelete={handleOnDelete}
          handleOnHide={handleOnHide}
        />
      )}
    </div>
  );
};

export default Task;
