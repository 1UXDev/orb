import styles from "./train.module.css";
import { useState } from "react";
import DashboardCard from "@/components/DashboardCard/DashboardCard";
import styles2 from "@/components/Dashboard/Dashboard.module.css";
import { initialTasks } from "../../../public/trainingDB";
import Link from "next/link";

const lastTraining = {
  id: 3,
  title: "Diagnostic Assessments",
  description:
    "Lorem Ipsum dolor sit amet consectetur adipiscing elit Lorem LoLo consecetur adipiscing elit Lorem LoLo",
  status: "open",
  progress: 45,
  level: "Beginner",
  duration: 21,
  image:
    "https://images.unsplash.com/photo-1616012480717-fd9867059ca0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bXJpfGVufDB8fDB8fHww&auto=format&fit=crop&w=1800&q=60",
};

export default function train() {
  // State to store tasks
  const [tasks, setTasks] = useState(initialTasks);

  return (
    <>
      <section>
        <div className={`${styles.backToSchool}`}>
          <img src={lastTraining.image}></img>
          <div className={`${styles.overlayText}`}>
            <ul className={`${styles.additionalInfo}`}>
              <li>Pick up where you left!</li>
              <li>Level: {lastTraining.level}</li>
              <li>Progress: {lastTraining.progress}%</li>
              <li>Duration: approx. {lastTraining.duration}h</li>
            </ul>
            <br></br> <br></br>
            <br></br> <br></br>
            <h1>{lastTraining.title}</h1>
            <p>{lastTraining.description}</p>
            <br></br>
            <Link href={`/train/${lastTraining.id}`}>
              <button>Continue Training</button>
            </Link>
          </div>
        </div>
      </section>

      <section className={`${styles.smallSection}`}>
        <h2>Your other Courses</h2>
        <div className={styles2.overview}>
          <article className={styles2["open-tasks"]}>
            <ul>
              {tasks
                .filter((task) => task.status === "open")
                .map((task) => (
                  <DashboardCard task={task}></DashboardCard>
                ))}
            </ul>
          </article>
        </div>
      </section>
    </>
  );
}
