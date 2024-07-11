import React from "react";
import b from "./BranchList.module.css";
import add_branch from "./../../../assets/images/common__images/add.svg";
import AddBranchContainer from "./AddBranchContainer/AddBranchContainer";

const BranchList = ({
  isShow,
  handleCloseAddBranchWindow,
  myBranch,
  clinic,
  user,
  handleClickAddBranch,
  handleChangeInputSearch,
  inputValue,
  showBranchList,
}) => {
  return (
    <main>
      {isShow && <AddBranchContainer onClose={handleCloseAddBranchWindow} />}
      <div className="container">
        <div className={b.header}>
          <h2>Филиалы</h2>
        </div>
        <div className={b.branch__user_info}>
          <div>
            <span>Ваш филиал</span>
          </div>
          <div className={b.branch_info}>
            <h3>{`г. ${myBranch?.city?.city}, ` + myBranch?.branch}</h3>
            <h2>{clinic?.clinic || "Unknown"}</h2>
          </div>
        </div>
        <div className={b.main}>
          <div className={b.main__header}>
            <div className={b.header__begin}>
              <span>Другие филиалы</span>
              {user && user.isAdmin && (
                <button onClick={handleClickAddBranch}>
                  <img src={add_branch} alt="add-branch" />
                </button>
              )}
            </div>
            <div className={b.search_wrapper}>
              <div className={b.search}>
                <input
                  type="text"
                  onChange={handleChangeInputSearch}
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
                    <p className="ellipsis_line_1">
                      {`г. ${branch?.city?.city}, ` + branch?.street}
                    </p>
                  </div>
                </li>
              ))}
          </ul>
        </div>
      </div>
    </main>
  );
};

export default BranchList;
