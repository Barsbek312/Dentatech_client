import React from "react";
import t from "./TeethPart.module.css";

const TeethPart = ({ teethRowData, isReverse = false, teethRow }) => {
  return (
    <div className={t.teeth__part_wrapper}>
      <div className={t.tooth__row_wrapper}>
        {isReverse ? teethRow.toReversed() : teethRow}
      </div>
      <div className={t.teeth__part_title}>
        <div>
          <span>{teethRowData && teethRowData["row"]}</span>
        </div>
      </div>
    </div>
  );
};

export default TeethPart;
