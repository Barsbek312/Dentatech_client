import React, { useEffect } from "react";
import i from "./IncisorTooth.module.css";
// Зуб-резец
import incisor_bottom_img from "./../../../../../assets/images/teeth__images/incisor__teeth_4/bottom_part.svg";
import incisor_top_img from "./../../../../../assets/images/teeth__images/incisor__teeth_4/top_part.svg";
import incisor_left_img from "./../../../../../assets/images/teeth__images/incisor__teeth_4/left_part.svg";
import incisor_right_img from "./../../../../../assets/images/teeth__images/incisor__teeth_4/right_part.svg";

const IncisorTooth = ({
  item,
  width,
  handleClickOnTooth = () => {},
  handleClickOnToothPart = () => {},
  currentToothPart,
}) => {
  return (
    <div
      className={i.tooth__wrapper}
      style={{ height: width ? "175px" : "auto" }}
    >
      {!width && <span>{item && item["tooth"]}</span>}
      <div
        className={
          i.tooth__incisor_wrapper +
          ` ${width && i.toothSideBar__incisor_wrapper}`
        }
        onClick={() => handleClickOnTooth(item)}
      >
        <div className={i.tooth__incisor_top}>
          <img
            src={incisor_left_img}
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
            src={incisor_top_img}
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
            src={incisor_right_img}
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
        <div className={i.tooth__incisor_bottom}>
          <img
            src={incisor_bottom_img}
            onClick={() =>
              handleClickOnToothPart(
                item["teethPartConnect"][3]["toothPartId"],
                item["teethPartConnect"][3]["id"],
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

export default IncisorTooth;
