import styles from "./DashboardCard.module.css";
import Link from "next/link";

export default function DashboardCard({ task }) {
  return (
    <li key={task.id} className={`${styles.cardOuter}`}>
      <Link href={`train/${task.id}`} className={`${styles.cardInner}`}>
        <div
          className={`${styles["task-card"]} ${
            task.status === "open" ? styles.open : styles.done
          }`}
        >
          <div className={`${styles.imgContainer}`}>
            <img src={`${task.image}`} alt={`${task.title} image`} />
            <p>Progress: {task.progress}%</p>
          </div>
          <h4>{task.title}</h4>
          <p>{task.description}</p>
        </div>
      </Link>
    </li>
  );
}
