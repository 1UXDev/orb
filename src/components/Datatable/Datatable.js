import React from "react";
//import styles from "./Datatable.module.css";

export default function Datatable({ tableContent }) {
  return (
    <table>
      <tbody>
        {tableContent.map((row, index) => (
          <tr key={index}>
            {row.colspan ? (
              <td colSpan={row.colspan} className="strong">
                <strong>{row.label}</strong>
              </td>
            ) : (
              <>
                <td>{row.label}</td>
                <td>{row.value}</td>
              </>
            )}
          </tr>
        ))}
      </tbody>
    </table>
  );
}
