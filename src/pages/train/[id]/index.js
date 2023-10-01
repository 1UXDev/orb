import { useRouter } from "next/router";
import { initialTasks } from "../../../../public/trainingDB";
import { useState, useEffect } from "react";
import styles from "./trainDetail.module.css";

import Questionnaire from "@/components/Questionnaire/Questionnaire";
import Gallery from "@/components/Gallery/Gallery";
import StaticHTMLComponent from "@/components/DicomLocal/StaticComponent";

export default function TrainDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const [task, setTask] = useState(null);

  useEffect(() => {
    if (id) {
      const foundTask = initialTasks.find((task) => task.id === parseInt(id));
      if (foundTask) {
        setTask(foundTask);
      }
    }
  }, [id]); // Run this effect whenever the "id" route parameter changes

  // logic for the checkboxes
  const [dataHidden, setDataHidden] = useState(true);
  const [imageHidden, setImageHidden] = useState(true);
  const [questionnaireHidden, setQuestionnaireHidden] = useState(true);

  return (
    <>
      <div className={`${styles.backgroundTeaser}`}>
        {task && <img src={task.image} alt={task.title} />}{" "}
      </div>
      <section className={`${styles.detailSectionHeading}`}>
        {task ? <h1>{task.title}</h1> : <h1>Loading...</h1>}{" "}
      </section>

      <section className={`${styles.detailSectionCustomization}`}>
        <h3>Customize your workspace</h3>
        <div className={`${styles.contentCheckboxes}`}>
          <label>
            <input
              type="checkbox"
              checked={dataHidden}
              onChange={() => setDataHidden(!dataHidden)}
            />
            Data
          </label>
          <label>
            <input
              type="checkbox"
              checked={imageHidden}
              onChange={() => setImageHidden(!imageHidden)}
            />
            Image
          </label>
          <label>
            <input
              type="checkbox"
              checked={questionnaireHidden}
              onChange={() => setQuestionnaireHidden(!questionnaireHidden)}
            />
            Questionnaire
          </label>
        </div>
      </section>

      <section>
        <div className={`${styles.workspace}`}>
          <div
            className={`${styles.detailSectionContentLeft} ${
              !dataHidden ? styles.hidden : ""
            }`}
          >
            <h3>Data</h3>
            <table>
              <tbody>
                <tr>
                  <td colSpan="2">
                    <strong>Demographics</strong>
                  </td>
                </tr>
                <tr>
                  <td>Patient Name</td>
                  <td>John Doe</td>
                </tr>
                <tr>
                  <td>Gender</td>
                  <td>Male</td>
                </tr>
                <tr>
                  <td>Date of Birth</td>
                  <td>January 15, 1980</td>
                </tr>
                <tr>
                  <td>Height</td>
                  <td>180 cm (5'11")</td>
                </tr>
                <tr>
                  <td>Weight</td>
                  <td>75 kg (165 lbs)</td>
                </tr>
                <tr>
                  <td>Blood Type</td>
                  <td>O+</td>
                </tr>
                <tr>
                  <td colSpan="2">
                    <strong>Cardiological Data</strong>
                  </td>
                </tr>
                <tr>
                  <td>Blood Pressure</td>
                  <td>
                    Systolic: 120 mm Hg
                    <br />
                    Diastolic: 80 mm Hg
                  </td>
                </tr>
                <tr>
                  <td>Heart Rate</td>
                  <td>72 bpm</td>
                </tr>
                <tr>
                  <td>ECG (Electrocardiogram)</td>
                  <td>
                    Heart Rhythm: Normal Sinus Rhythm
                    <br />
                    PR Interval: 0.16 seconds
                    <br />
                    QRS Duration: 0.08 seconds
                  </td>
                </tr>
                <tr>
                  <td>Echocardiogram</td>
                  <td>
                    Ejection Fraction: 65%
                    <br />
                    Left Ventricular Mass: 150 g<br />
                    Valvular Function: Normal
                  </td>
                </tr>
                <tr>
                  <td>Lipid Profile</td>
                  <td>
                    Total Cholesterol: 180 mg/dL
                    <br />
                    HDL Cholesterol: 50 mg/dL
                    <br />
                    LDL Cholesterol: 110 mg/dL
                    <br />
                    Triglycerides: 70 mg/dL
                  </td>
                </tr>
                <tr>
                  <td>Troponin Level</td>
                  <td>0.05 ng/mL</td>
                </tr>
                <tr>
                  <td>BNP (B-type Natriuretic Peptide)</td>
                  <td>30 pg/mL</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div
            className={`${styles.detailSectionContentMiddle} ${
              !imageHidden ? styles.hidden : ""
            }`}
          >
            <h3>Image</h3>
            {/* <Gallery></Gallery> */}
            <StaticHTMLComponent></StaticHTMLComponent>
          </div>
          <div
            className={`${styles.detailSectionContentRight} ${
              !questionnaireHidden ? styles.hidden : ""
            }`}
          >
            <h3>Questionnaire</h3>
            <br></br>
            <Questionnaire></Questionnaire>
          </div>
        </div>
      </section>
    </>
  );
}
