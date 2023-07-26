import React, { useEffect, useState } from "react";
import styles from "./Main.module.scss";
import Task from "../task/Task";
import axios from "axios";
import Form from "../form/Form";
import Aside from "../aside/Aside";
import uuid from "react-uuid";
import { Alerts } from "../alerts/Alerts";
import { formatDate } from "../../utils/Utils";
import { ClipLoader } from "react-spinners";

const Main = () => {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [isUpdated, setIsUpdated] = useState(false);
  const [isCreated, setIsCreated] = useState(false);
  const [active, setActive] = useState(1);
  const [loading, setLoading] = useState(false);
  const [inputLoader, setInputLoader] = useState(0);

  useEffect(() => {
    if (active === 1) fetchAllTask();
    else if (active === 2) fetchTodoTasks();
    else if (active === 3) fetchDoneTasks();
  }, [active]);

  useEffect(() => {
    setTimeout(() => {
      setIsUpdated(false);
      setIsCreated(false);
    }, 5000);
  });

  // Fetch the tasks
  const fetchAllTask = () => {
    // console.log("All task");
    // All tasks
    setLoading(true);
    axios
      .get("http://localhost:3030/tasks?isDeleted=false")
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchTodoTasks = () => {
    // console.log("Todo tasks");
    setLoading(true);
    axios
      .get(`http://localhost:3030/tasks?isDone=false&isDeleted=false`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  const fetchDoneTasks = () => {
    // console.log("Done tasks");
    setLoading(true);
    axios
      .get(`http://localhost:3030/tasks?isDone=true&isDeleted=false`)
      .then((response) => {
        setTasks(response.data);
        setLoading(false);
      })
      .catch((error) => console.log(error));
  };

  // Handle the adding of new tasks
  const handleOnSubmit = (e) => {
    e.preventDefault();

    // console.log(e.target.value);

    let date = formatDate();

    const task = {
      id: uuid(),
      title,
      date,
      isDone: false,
      isDeleted: false,
    };

    axios
      .post("http://localhost:3030/tasks", task)
      .then((response) => {
        setIsCreated((prevIsCreated) => !prevIsCreated);
        setTasks((prevTasks) =>
          active !== 3 ? [...prevTasks, task] : [...prevTasks]
        );
      })
      .catch((error) => console.log(error))
      .finally(() => setTitle(""));
  };

  // Handle check and uncheck of a task
  const handleOnChange = (task) => {
    setInputLoader(task.id);
    axios
      .patch(`http://localhost:3030/tasks/${task.id}`, { isDone: !task.isDone })
      .then((response) => {
        setIsUpdated((prev) => !prev);
        if (active === 2 || active === 3)
          setTasks((prevTasks) =>
            prevTasks.filter(
              (item) => item.id !== task.id && item.isDone !== !task.isDone
            )
          );
        else
          setTasks((prevTasks) =>
            prevTasks.map((item) =>
              item.id === task.id ? { ...item, isDone: !task.isDone } : item
            )
          );
        setInputLoader(0);
      })
      .catch((error) => console.log(error));
  };

  //  Handle deleting of task
  const handleOnDelete = (id) => {
    axios
      .delete(`http://localhost:3030/tasks/${id}`)
      .then((response) => setTasks(tasks.filter((task) => task.id !== id)))
      .catch((error) => console.log(error));
  };

  // Handle on hide a task
  const handleOnHide = (task) => {
    axios
      .patch(`http://localhost:3030/tasks/${task.id}`, {
        isDeleted: !task.isDeleted,
      })
      .then((response) =>
        setTasks((prevTasks) =>
          prevTasks.filter(
            (item) => item.id !== task.id && item.isDeleted !== !task.isDeleted
          )
        )
      )
      .catch((error) => console.log(error));
  };

  const handleOnCancel = () => {
    setTitle((prev) => "");
  };

  const handleOnActive = (index) => {
    setActive((prevActive) => index);
  };

  const validateForm = (newTask) => {
    tasks.filter(
      (task) =>
        task.date === newTask.date &&
        task.title === newTask.title &&
        alert("duplicate tasks")
    );
  };

  return (
    <div className={styles.main}>
      {/* Aside section - Tabs */}
      <Aside active={active} handleOnActive={handleOnActive} />

      {/* Main section - Tasks */}
      <div className={styles.tasks}>
        {tasks.length > 0 && !loading ? (
          <div className={styles.tasks_container}>
            {tasks.map((task) => (
              <Task
                key={task.id}
                id={task.id}
                title={task.title}
                date={task.date}
                isDone={task.isDone}
                handleOnChange={() => handleOnChange(task)}
                handleOnDelete={() => handleOnDelete(task.id)}
                handleOnHide={() => handleOnHide(task)}
                loading={inputLoader}
              />
            ))}
          </div>
        ) : (
          !loading && <em>The list is empty! Add some tasks.</em>
        )}

        {loading && (
          <div className={styles.loader}>
            <ClipLoader size={30} color="#9333EA" />
          </div>
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
        <Alerts
          message="Your changes has been saved."
          handleOnClick={() => setIsUpdated((prev) => false)}
        />
      )}

      {isCreated && (
        <Alerts
          message="New task has been added."
          handleOnClick={() => setIsCreated((prev) => false)}
        />
      )}
    </div>
  );
};

export default Main;
