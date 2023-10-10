import React, { useState } from "react";
import styles from "./Dashboard.module.css";
import DashboardCard from "../DashboardCard/DashboardCard";
import { initialTasks } from "../../../public/trainingDB";
import uid from "uid";

const Dashboard = () => {
  // State to store tasks
  const [tasks, setTasks] = useState(initialTasks);

  // Calculate the number of open and done tasks
  const openTasksCount = tasks.filter((task) => task.status === "open").length;
  const doneTasksCount = tasks.filter((task) => task.status === "done").length;

  return (
    <section>
      <h1>Your Assignments</h1>
      <div className={styles.overview}>
        <article className={styles["open-tasks"]}>
          <h3>Open Courses: {openTasksCount}</h3>
          <ul>
            {tasks
              .filter((task) => task.status === "open")
              .map((task) => (
                <DashboardCard task={task} key={uid()}></DashboardCard>
              ))}
          </ul>
        </article>
        <article className={styles["done-tasks"]}>
          <h3>Completed Courses: {doneTasksCount} </h3>
          <ul>
            {tasks
              .filter((task) => task.status === "done")
              .map((task) => (
                <DashboardCard task={task} key={uid()}></DashboardCard>
              ))}
          </ul>
        </article>
      </div>
    </section>
  );
};

export default Dashboard;
