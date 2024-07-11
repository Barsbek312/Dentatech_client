import React from "react";
import t from "./Teeth.module.css";
import { useSelector } from "react-redux";
import TeethPartContainer from "./TeethPartContainer/TeethPartContainer";

const Teeth = ({ handleClickOnTooth }) => {
  const { tooth } = useSelector((state) => state.tooth);
  return (
    <div className={t.teeth__wrapper}>
      {tooth &&
        tooth.map((item) => (
          <div className={t.teeth__row_wrapper}>
            <TeethPartContainer
              teethRowData={item?.rows?.[0]}
              isReverse={false}
              handleClickOnTooth={handleClickOnTooth}
            />
            <TeethPartContainer
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
