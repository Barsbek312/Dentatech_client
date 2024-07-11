import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getBranchesByClinicId } from "../../redux/branch";
import BranchList from "./BranchList/BranchList";
import { compose } from "redux";
import { WithAuthRedirect } from "../../hoc/WithAuthRedirect";

const BranchListContainer = () => {
  const [inputValue, setInputValue] = useState("");
  const { user, isAuth } = useSelector((state) => state.user);
  const { branches } = useSelector((state) => state.branch);
  const { clinic } = useSelector((state) => state.branch);
  const dispatch = useDispatch();

  const [showBranchList, setShowBranchList] = useState(null);
  const [myBranch, setMyBranch] = useState(null);
  const [isShow, setIsShow] = useState(false);

  useEffect(() => {
    const getAllBranches = async (branchId) => {
      const res = await dispatch(getBranchesByClinicId(branchId));
    };

    if (user && user.branchId) {
      getAllBranches(user.clinicId);
    }
  }, [user]);

  useEffect(() => {
    if (branches && branches.length > 0 && isAuth) {
      setMyBranch(branches.filter((item) => item.id === user.branchId)[0]);
      setShowBranchList(
        branches.filter(
          (item) =>
            item?.branch.toLowerCase().includes(inputValue.toLowerCase()) ||
            item?.street.toLowerCase().includes(inputValue.toLowerCase()) ||
            item?.city?.city.toLowerCase().includes(inputValue.toLowerCase())
        )
      );
    }
  }, [inputValue, branches, isAuth]);

  const handleClickAddBranch = () => {
    setIsShow(true);
  };

  const handleChangeInputSearch = (e) => {
    setInputValue(e.target.value);
  };

  const handleCloseAddBranchWindow = () => setIsShow(false);

  return (
    <BranchList
      isShow={isShow}
      handleCloseAddBranchWindow={handleCloseAddBranchWindow}
      myBranch={myBranch}
      clinic={clinic}
      user={user}
      handleClickAddBranch={handleClickAddBranch}
      handleChangeInputSearch={handleChangeInputSearch}
      inputValue={inputValue}
      showBranchList={showBranchList}
    />
  );
};

export default compose(WithAuthRedirect)(BranchListContainer);
