import React, { useEffect, useState } from "react";
import m from "./MolarTooth.module.css";
// Зуб-моляр
import molar_bottom_img from "./../../../../../assets/images/teeth__images/molar__teeth_1/bottom_part.svg";
import molar_middle_img from "./../../../../../assets/images/teeth__images/molar__teeth_1/middle__part.svg";
import molar_top_right_img from "./../../../../../assets/images/teeth__images/molar__teeth_1/up_right_part.svg";
import molar_top_left_img from "./../../../../../assets/images/teeth__images/molar__teeth_1/up_left_part.svg";
import molar_top_middle_img from "./../../../../../assets/images/teeth__images/molar__teeth_1/up_middle_part.svg";

const MolarTooth = ({
  item,
  width,
  handleClickOnTooth = () => {},
  currentToothPart,
  handleClickOnToothPart = () => {},
}) => {
  return (
    <div
      className={m.tooth__wrapper}
      style={{ height: width ? "170px" : "auto" }}
    >
      {!width && <span>{item && item["tooth"]}</span>}
      <div
        onClick={() => handleClickOnTooth(item)}
        className={
          m.tooth__molar_wrapper + ` ${width && m.toothSideBar__molar_wrapper}`
        }
        style={{ width: width ? `${width}px` : "auto" }}
      >
        <div
          className={m.tooth__molar_top}
          style={{ width: width ? `100%` : "auto" }}
        >
          <img
            src={molar_top_left_img}
            onClick={(e) =>
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
            onClick={(e) =>
              handleClickOnToothPart(
                item["teethPartConnect"][1]["toothPartId"],
                item["teethPartConnect"][1]["id"],
                width
              )
            }
            src={molar_top_middle_img}
            style={{
              height: width ? "55px" : "100%",
              filter: currentToothPart && currentToothPart[2],
            }}
          />
          <img
            onClick={(e) =>
              handleClickOnToothPart(
                item["teethPartConnect"][2]["toothPartId"],
                item["teethPartConnect"][2]["id"],
                width
              )
            }
            src={molar_top_right_img}
            style={{
              filter: currentToothPart && currentToothPart[3],
            }}
          />
        </div>
        <div
          className={m.tooth__molar_middle}
          style={{ width: width ? "103%" : "auto" }}
        >
          <img
            src={molar_middle_img}
            onClick={(e) =>
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
        <div
          className={m.tooth__molar_bottom}
          style={{ width: width ? "98%" : "auto" }}
        >
          <img
            src={molar_bottom_img}
            onClick={(e) =>
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

export default MolarTooth;
