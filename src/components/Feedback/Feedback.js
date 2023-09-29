import React from "react";
import styles from "./Feedback.module.css";
import { feedbacks } from "../../../public/feedbackDB";

export default function Feedback() {
  return (
    <section>
      <h1>Your Feedbacks</h1>
      <div className={styles["feedback-container"]}>
        {feedbacks.map((feedback) => (
          <div className={styles["feedback-card-wrapper"]} key={feedback.id}>
            <div
              className={`${styles["feedback-card"]} ${
                feedback.isNew ? styles.new : ""
              }`}
            >
              {feedback.isNew && <div className={styles["badge"]}>New</div>}
              <h2>Feedback {feedback.id}</h2>
              <div className={`${styles.imgContainer}`}>
                <img src={feedback.teacherImg}></img>
              </div>
              <p>{feedback.content}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
