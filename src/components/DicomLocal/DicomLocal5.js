import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";
import renderDicomViewer from "@/utilities/renderDicomViewer";
import useIsSsr from "@/utilities/checkSSR";

export default function DicomLocalViewer5({ selectedCase, selectedStudy }) {
  const [canvas, setCanvas] = useState(null);
  console.log(selectedCase, selectedStudy);

  useEffect(() => {
    useIsSsr() ? null : renderDicomViewer({ selectedCase, selectedStudy });
  }, [selectedCase, selectedStudy]);

  return (
    <>
      <h3>test</h3>
      <div>{canvas}</div>
    </>
  );
}
