import React from "react";
import rb from "./ReceptionBill.module.css";
import Nothing from "../../../../../../Common/Nothing/Nothing";

const ReceptionBill = ({
  onClose = () => {},
  stopPropagation,
  receptionDiseaseHistory,
  totalAmount,
}) => {
  return (
    <div className={rb.modal__window_overlay} onClick={onClose}>
      <div className={rb.modal__window_content} onClick={stopPropagation}>
        {receptionDiseaseHistory && receptionDiseaseHistory.length > 0 ? (
          <div>
            <div className={rb.bill__wrapper}>
              <table>
                <thead className={rb.bill__category}>
                  <tr>
                    <th>№</th>
                    <th>Процедура</th>
                    <th>Зуб</th>
                    <th>Цена</th>
                  </tr>
                </thead>
                <tbody className={rb.bill__info}>
                  {receptionDiseaseHistory.map((item, index) => (
                    <tr>
                      <td>
                        <span className="ellipsis_line_1">{index + 1}</span>
                      </td>
                      <td>
                        <span className="ellipsis_line_1">
                          {item?.procedure?.procedure || "Unknown"}
                        </span>
                      </td>
                      <td>
                        <span className="ellipsis_line_1">
                          {item?.toothPartConnect?.tooth?.tooth || "Unknown"}
                        </span>
                      </td>
                      <td>
                        <span className="ellipsis_line_1">
                          {" "}
                          {item?.procedure?.price || "Unknown"}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className={rb.bill__footer}>
              <div>
                <strong>Итоговая сумма</strong>
              </div>
              <div>
                <span>{totalAmount}</span>
              </div>
            </div>
          </div>
        ) : (
          <Nothing text={"Пока нет счета"} />
        )}
      </div>
    </div>
  );
};

export default ReceptionBill;
