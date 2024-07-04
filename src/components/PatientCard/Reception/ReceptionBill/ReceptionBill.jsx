import React, { useEffect, useState } from "react";
import rb from "./ReceptionBill.module.css";
import { useDispatch, useSelector } from "react-redux";
import { getDiseaseHistoryOfReception } from "../../../../redux/disease-history";
import Nothing from "./../../../Common/Nothing/Nothing";

const ReceptionBill = ({ receptionId = null, onClose = () => {} }) => {
  const { receptionDiseaseHistory } = useSelector(
    (state) => state.diseaseHistory
  );
  const dispatch = useDispatch();
  useEffect(() => {
    if (receptionId) {
      dispatch(getDiseaseHistoryOfReception(receptionId));
    }
  }, [receptionId]);
  const [totalAmount, setTotalAmount] = useState(0);

  useEffect(() => {
    if (receptionDiseaseHistory && receptionDiseaseHistory.length > 0) {
      setTotalAmount(0);
      receptionDiseaseHistory.forEach((item) => {
        if (item?.procedure?.price) {
          setTotalAmount((prevState) => prevState + parseFloat(item.procedure.price));
        }
      });
    }
  }, [receptionDiseaseHistory]);

  return (
    <div className={rb.modal__window_overlay} onClick={onClose}>
      <div
        className={rb.modal__window_content}
        onClick={(e) => e.stopPropagation()}
      >
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
