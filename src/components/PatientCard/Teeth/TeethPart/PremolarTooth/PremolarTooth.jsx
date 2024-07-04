import React from "react";
import p from "./PremolarTooth.module.css";
// Зуб-премоляр
import premolar_bottom_img from "./../../../../../assets/images/teeth__images/premolar__teeth_2/bottom_part.svg";
import premolar_middle_img from "./../../../../../assets/images/teeth__images/premolar__teeth_2/middle_part.svg";
import premolar_top_right_img from "./../../../../../assets/images/teeth__images/premolar__teeth_2/up_right_part.svg";
import premolar_top_middle_img from "./../../../../../assets/images/teeth__images/premolar__teeth_2/up_middle_part.svg";
import premolar_top_left_img from "./../../../../../assets/images/teeth__images/premolar__teeth_2/up_left_part.svg";

const PremolarTooth = ({
  item,
  width,
  handleClickOnTooth = () => {},
  currentToothPart,
  handleClickOnToothPart = () => {},
}) => {
  return (
    <div
      className={p.tooth__wrapper}
      style={{ height: width ? "175px" : "auto" }}
    >
      {!width && <span>{item && item["tooth"]}</span>}
      <div
        onClick={() => handleClickOnTooth(item)}
        className={
          p.tooth__premolar_wrapper +
          ` ${width && p.toothSideBar__premolar_wrapper}`
        }
        style={{ width: width ? `${width}px` : "auto" }}
      >
        <div className={p.tooth__premolar_top}>
          <img
            src={premolar_top_left_img}
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
            src={premolar_top_middle_img}
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
            src={premolar_top_right_img}
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
        <div className={p.tooth__premolar_middle}>
          <img
            src={premolar_middle_img}
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
        <div className={p.tooth__premolar_bottom}>
          <img
            src={premolar_bottom_img}
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

export default PremolarTooth;
