import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import styles from "./trainDetail.module.css";

// Mock DBs
import { initialTasks } from "../../../../public/trainingDB";
import { tableDB } from "../../../../public/tableDB";

// Components
import Questionnaire from "@/components/Questionnaire/Questionnaire";
import CombinedComponent from "@/components/DicomLocal/StaticComponent";
import Datatable from "@/components/Datatable/Datatable";

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

  const [selectedCase, setSelectedCase] = useState(null);
  const [selectedStudy, setSelectedStudy] = useState(null);
  return (
    <>
      <div className={`${styles.backgroundTeaser}`}>
        {task && <img src={task.image} alt={task.title} />}{" "}
      </div>
      <section className={`${styles.detailSectionHeading}`}>
        {task ? <h1>{task.title}</h1> : <h1>Loading...</h1>}
        <div className={`${styles.casesRow}`}>
          {task &&
            task.structure.map((caseItem, index) => (
              <div
                className={`${styles.casePill} ${
                  selectedCase !== null
                    ? selectedCase === caseItem
                      ? styles.selected
                      : ""
                    : index === 0
                    ? styles.selected
                    : ""
                }`}
                onClick={() => setSelectedCase(caseItem)}
              >
                {caseItem.case}
              </div>
            ))}
        </div>
      </section>

      <section>
        <div className={`${styles.studiesContainer}`}>
          {selectedCase &&
            selectedCase.studies.map((study) => (
              <div
                className={`${styles.studyCard} ${
                  selectedStudy === study.id ? styles.selected : ""
                }`}
                onClick={() => setSelectedStudy(study.id)}
              >
                <h1>{study.aliasName}</h1>
                <p>{study.description}</p>
                <div className={`${styles.difficultyStars}`} alt="Difficulty">
                  {Array.from({ length: study.complexity }).map((_, index) => (
                    <img key={index} src="/star.png" alt="star" width={20} />
                  ))}
                </div>
              </div>
            ))}
        </div>
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
            <Datatable tableContent={tableDB}></Datatable>
          </div>
          <div
            className={`${styles.detailSectionContentMiddle} ${
              !imageHidden ? styles.hidden : ""
            }`}
          >
            <h3>Image</h3>
            <CombinedComponent
              selectedCase={selectedCase}
              selectedStudy={selectedStudy}
            ></CombinedComponent>
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
