import React, { useEffect, useState } from "react";
import b from "./Branches.module.css";
import { useDispatch, useSelector } from "react-redux";
import add_branch from "./../../assets/images/common__images/add.svg";
import AddBranch from "./AddBranch/AddBranch";
import { getBranchesByClinicId } from "../../redux/branch";

const Branches = () => {
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
      console.log(branchId);
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

  return (
    <main>
      {isShow && <AddBranch onClose={() => setIsShow(false)} />}
      <div className="container">
        <div className={b.header}>
          <h2>Филиалы</h2>
        </div>
        <div className={b.branch__user_info}>
          <div>
            <span>Ваш филиал</span>
          </div>
          <div className={b.branch_info}>
            <h3>
              {`г. ${myBranch?.city?.city}, ` + myBranch?.branch}
            </h3>
            <h2>{clinic?.clinic || "Unknown"}</h2>
          </div>
        </div>
        <div className={b.main}>
          <div className={b.main__header}>
            <div className={b.header__begin}>
              <span>Другие филиалы</span>
              {user && user.isAdmin && (
                <button onClick={() => setIsShow(true)}>
                  <img src={add_branch} alt="add-branch" />
                </button>
              )}
            </div>
            <div className={b.search_wrapper}>
              <div className={b.search}>
                <input
                  type="text"
                  onChange={(e) => setInputValue(e.target.value)}
                  value={inputValue}
                />
              </div>
            </div>
          </div>
          <ul className={b.main__list_branches}>
            {showBranchList &&
              showBranchList.map((branch) => (
                <li>
                  <div>
                    <h4 className="ellipsis_line_1">{branch?.branch}</h4>
                    <p className="ellipsis_line_1">{`г. ${branch?.city?.city}, ` + branch?.street}</p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default Branches;
