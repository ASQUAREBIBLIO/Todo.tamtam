import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import Task from "../task/task";
import axios from "axios";
import Form from "../form/Form";
import TabItem from "../tabs/tab";

const menu = [
  {
    id: 1,
    title: "All",
    icon: "bi bi-calendar",
  },
  {
    id: 2,
    title: "Todo",
    icon: "bi bi-calendar-plus",
  },
  {
    id: 3,
    title: "Done",
    icon: "bi bi-calendar-check",
  },
];

const Aside = () => {
  const [data, setData] = useState([]);
  const [title, setTitle] = useState("");
  const [isDone, setIsDone] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [active, setActive] = useState(1);

  useEffect(
    (title) => {
      fetchData(title);
    },
    [isSubmitted]
  );

  useEffect(() => {
    setTimeout(() => {
      setIsUpdated(false);
      setIsCreated(false);
    }, 5000);
  });

  // Fetch the tasks
  const fetchData = (title) => {
    // All tasks
    axios
      .get("http://localhost:3030/tasks?isDeleted=false")
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));

    // Unchecked tasks
    if (title == "Todo") {
      axios
        .get(`http://localhost:3030/tasks?isDone=false&isDeleted=false`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }

    // Done tasks
    if (title == "Done") {
      axios
        .get(`http://localhost:3030/tasks?isDone=true&isDeleted=false`)
        .then((response) => setData(response.data))
        .catch((error) => console.log(error));
    }
  };

  // Handle the adding of new tasks
  const handleOnSubmit = (e) => {
    e.preventDefault();
    let date =
      new Date().toDateString() +
      " " +
      new Date().getHours() +
      ":" +
      new Date().getMinutes();
    axios
      .post("http://localhost:3030/tasks", {
        title,
        date,
        isDone,
        isDeleted: false,
      })
      .then((response) => {
        setIsSubmitted((prevIsSubmitted) => !prevIsSubmitted);
        setIsCreated((prevIsCreated) => !prevIsCreated);
      })
      .catch((error) => console.log(error));
  };

  // Handle check and uncheck of a task
  const handleOnChange = (task) => {
    axios
      .patch(`http://localhost:3030/tasks/${task.id}`, { isDone: !task.isDone })
      .then((response) => {
        setIsUpdated((prev) => !prev);
        setIsSubmitted((prevIsSubmitted) => !prevIsSubmitted);
        setActive((prev) => 1);
      })
      .catch((error) => console.log(error));
  };

  //  Handle deleting of task
  const handleOnDelete = (id) => {
    axios
      .delete(`http://localhost:3030/tasks/${id}`)
      .then((response) => {
        setIsSubmitted((prevIsSubmitted) => !prevIsSubmitted);
      })
      .catch((error) => console.log(error));
  };

  // Handle on hide a task
  const handleOnHide = (task) => {
    axios
      .patch(`http://localhost:3030/tasks/${task.id}`, {
        isDeleted: !task.isDeleted,
      })
      .then((response) => {
        setIsSubmitted((prevIsSubmitted) => !prevIsSubmitted);
      })
      .catch((error) => console.log(error));
  };

  const handleOnActive = (index) => {
    setActive((prevActive) => index);
  };

  const handleOnCancel = () => {
    setTitle((prev) => "");
  };

  return (
    <div className={styles.main}>
      {/* Aside section - Tabs */}
      <div className={styles.aside}>
        <div>
          {menu.map((tab) => (
            <TabItem
              key={tab.id}
              id={tab.id}
              icon={tab.icon}
              title={tab.title}
              index={active}
              handleOnClick={() => {
                fetchData(tab.title);
                handleOnActive(tab.id);
              }}
            />
          ))}
        </div>
        <p className={styles.copy_rights}>
          <span className="bi bi-c-circle"></span>Tamtam international - Stage
          2023
        </p>
      </div>

      {/* Main section - Tasks */}
      <div className={styles.tasks}>
        {data.length > 0 ? (
          <div className={styles.tasks_container}>
            {data.map((task) => (
              <Task
                key={task.id}
                title={task.title}
                date={task.date}
                isDone={task.isDone}
                handleOnChange={() => handleOnChange(task)}
                handleOnDelete={() => handleOnDelete(task.id)}
                handleOnHide={() => handleOnHide(task)}
              />
            ))}
          </div>
        ) : (
          <em>No tasks.</em>
        )}

        {/* Form - Add new task */}
        <Form
          titleValue={title}
          handleOnChange={(e) => setTitle(e.target.value)}
          handleOnClick={handleOnSubmit}
          handleOnCancel={handleOnCancel}
        />
      </div>

      {isUpdated && (
        <div className={styles.alert_success}>
          <span className="bi bi-check2-square" />
          <div>
            <strong>Success</strong>
            <p>Your changes has been saved.</p>
          </div>
          <i
            className="bi bi-x"
            onClick={() => setIsUpdated((prev) => false)}
          />
        </div>
      )}

      {isCreated && (
        <div className={styles.alert_success}>
          <span className="bi bi-check2-square" />
          <div>
            <strong>Success</strong>
            <p>New task has been added.</p>
          </div>
          <i
            className="bi bi-x"
            onClick={() => setIsCreated((prev) => false)}
          />
        </div>
      )}
    </div>
  );
};

export default Aside;
