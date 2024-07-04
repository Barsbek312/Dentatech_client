import React, { useEffect } from "react";
import t from "./Teeth.module.css";
import TeethPart from "./TeethPart/TeethPart";
import { useSelector } from "react-redux";

const Teeth = ({ handleClickOnTooth }) => {
  const { tooth } = useSelector((state) => state.tooth);
  return (
    <div className={t.teeth__wrapper}>
      {tooth &&
        tooth.map((item) => (
          <div className={t.teeth__row_wrapper}>
            <TeethPart
              teethRowData={item?.rows?.[0]}
              isReverse={false}
              handleClickOnTooth={handleClickOnTooth}
            />
            <TeethPart
              teethRowData={item?.rows?.[1]}
              isReverse={true}
              handleClickOnTooth={handleClickOnTooth}
            />
          </div>
        ))}
    </div>
  );
};

export default Teeth;
