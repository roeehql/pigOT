import style from "@styles/Mypage.module.scss";
import Button from "@atomic/Button";
import Input from "@atomic/Input";
import { MyPageViewState } from "@@types/authType";

const MyPageView = ({
  userInfo,
  editName,
  onEditNameChange,
  active,
  handleActiveCancel,
  handleEdit,
  handleActive,
  editedName,
  handleUserDelete,
  handleChangeUserLocation,
}: MyPageViewState) => {
  return (
    <div className={style.mypage_container}>
      <h1>회원정보</h1>
      {userInfo.userflag !== "" ? (
        <div className={style.mypage_box}>
          <div className={style.mypage_item}>
            {active ? (
              <>
                <Input
                  type="text"
                  name="username"
                  value={editName}
                  onChange={onEditNameChange}
                  required={true}
                  labelText="별명 변경"
                />
                <Button
                  text="수정"
                  className="small-button"
                  type="button"
                  onClick={handleEdit}
                />
                <Button
                  text="취소"
                  className="small-button"
                  type="button"
                  onClick={handleActiveCancel}
                />
              </>
            ) : (
              <>
                <p className={style.mypage_p}>
                  별명
                  <span className={style.mypage_span}>
                    {editedName === null ? userInfo.username : editedName}
                  </span>
                </p>
                <Button
                  text="수정"
                  className="small-button"
                  type="button"
                  onClick={handleActive}
                />
              </>
            )}
          </div>

          <div className={style.mypage_item}>
            <p className={style.mypage_p}>
              계정
              <span className={style.mypage_span}>{userInfo.useremail}</span>
            </p>
          </div>
          <div className={style.mypage_item}>
            {userInfo.useremail === "test@test" ? (
              <Button text="탈퇴불가" className="small-button" type="button" />
            ) : (
              <Button
                text="회원탈퇴"
                type="button"
                className="small-button"
                onClick={handleUserDelete}
              />
            )}
          </div>
        </div>
      ) : (
        <>
          <h4>아직 회원이 아니시네요!</h4>
          <Button
            text="회원 되기"
            type="button"
            className="small-button"
            onClick={handleChangeUserLocation}
          />
        </>
      )}
    </div>
  );
};

export default MyPageView;
