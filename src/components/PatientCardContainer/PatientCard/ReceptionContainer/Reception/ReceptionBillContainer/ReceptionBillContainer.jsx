import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getDiseaseHistoryOfReception } from "../../../../../../redux/disease-history";
import ReceptionBill from "./ReceptionBill/ReceptionBill";

const ReceptionBillContainer = ({ receptionId = null, onClose = () => {} }) => {
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
          setTotalAmount(
            (prevState) => prevState + parseFloat(item.procedure.price)
          );
        }
      });
    }
  }, [receptionDiseaseHistory]);

  const stopPropagation = (e) => e.stopPropagation();

  return (
    <ReceptionBill
      onClose={onClose}
      stopPropagation={stopPropagation}
      receptionDiseaseHistory={receptionDiseaseHistory}
      totalAmount={totalAmount}
    />
  );
};

export default ReceptionBillContainer;
