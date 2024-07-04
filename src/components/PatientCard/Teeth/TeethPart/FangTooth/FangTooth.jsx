import React from "react";
import f from "./FangTooth.module.css";
// Зуб-клык
import fang_bottom_img from "./../../../../../assets/images/teeth__images/fang__teeth_3/bottom_part.svg";
import fang_middle_img from "./../../../../../assets/images/teeth__images/fang__teeth_3/middle_part.svg";
import fang_top_img from "./../../../../../assets/images/teeth__images/fang__teeth_3/top_part.svg";
import fang_left_img from "./../../../../../assets/images/teeth__images/fang__teeth_3/left_part.svg";
import fang_right_img from "./../../../../../assets/images/teeth__images/fang__teeth_3/right_part.svg";

const FangTooth = ({
  item,
  width,
  handleClickOnTooth = () => {},
  handleClickOnToothPart = () => {},
  currentToothPart,
}) => {
  return (
    <div
      className={f.tooth__wrapper}
      style={{ height: width ? "170px" : "auto" }}
    >
      {!width && <span>{item && item["tooth"]}</span>}
      <div
        className={
          f.tooth__fang_wrapper + ` ${width && f.toothSideBar__fang_wrapper}`
        }
        onClick={() => handleClickOnTooth(item)}
      >
        <div className={f.tooth__fang_top}>
          <img
            src={fang_left_img}
            onClick={() =>
              handleClickOnToothPart(
                item["teethPartConnect"][0]["toothPartId"],
                item["teethPartConnect"][0]["id"],
                width
              )
            }
            style={{
              filter: currentToothPart && currentToothPart[1],
            }}
          />
          <img
            src={fang_top_img}
            onClick={() =>
              handleClickOnToothPart(
                item["teethPartConnect"][1]["toothPartId"],
                item["teethPartConnect"][1]["id"],
                width
              )
            }
            style={{
              filter: currentToothPart && currentToothPart[2],
            }}
          />
          <img
            src={fang_right_img}
            onClick={() =>
              handleClickOnToothPart(
                item["teethPartConnect"][2]["toothPartId"],
                item["teethPartConnect"][2]["id"],
                width
              )
            }
            style={{
              filter: currentToothPart && currentToothPart[3],
            }}
          />
        </div>
        <div className={f.tooth__fang_middle}>
          <img
            src={fang_middle_img}
            onClick={() =>
              handleClickOnToothPart(
                item["teethPartConnect"][3]["toothPartId"],
                item["teethPartConnect"][3]["id"],
                width
              )
            }
            style={{
              filter: currentToothPart && currentToothPart[4],
            }}
          />
        </div>
        <div className={f.tooth__fang_bottom}>
          <img
            src={fang_bottom_img}
            onClick={() =>
              handleClickOnToothPart(
                item["teethPartConnect"][4]["toothPartId"],
                item["teethPartConnect"][4]["id"],
                width
              )
            }
            style={{
              filter: currentToothPart && currentToothPart[5],
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default FangTooth;
