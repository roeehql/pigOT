import { NextPage } from "next";
import { useState, useEffect } from "react";
import authApi from "@api/authApi";
import axiosApi from "@api/axiosApi";
import contentsApi from "@api/contentsApi";
import { UserListState } from "@@types/adminTypes";
import { useAppSelector } from "@store/store";
import ReactPaginate from "react-paginate";
import Warning from "@atomic/Warning";

const AdminPage: NextPage = () => {
  const [userList, setUserList] = useState<UserListState[]>([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [reAdmin, setReAdmin] = useState(false);
  const userInfo = useAppSelector((state) => state.userInfo.value);

  const userPerPage = 10;
  const pagesVisited = pageNumber * userPerPage;

  const handleUserAdmin = async (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    const targetUserEmail = event.currentTarget.id;

    const sayYes = window.confirm("이 사용자를 강제로 탈퇴시키실건가요?");
    if (sayYes) {
      const confirm2 = window.prompt(
        '아래 입력창에 "관리자 승인" 라고 적어주세요!'
      );
      if (confirm2 === "관리자 승인") {
        const result = await contentsApi.deleteAll(targetUserEmail);
        const response2 = await authApi.deleteUser(targetUserEmail);
        if (result === "succ" && response2 === "succ") {
          alert("사용자가 삭제되었습니다.");
          if (reAdmin) {
            setReAdmin(false);
          } else {
            setReAdmin(true);
          }
        } else {
          alert("사용자 삭제 실패");
        }
      } else {
        alert("문구를 잘못입력하셨습니다. 다시 시도해주세요.");
      }
    } else {
      return false;
    }
  };

  const displayAll = userList
    .slice(pagesVisited, pagesVisited + userPerPage)
    .map((item, index) => {
      return (
        <tr key={index}>
          <td>{item.username}</td>
          <td>{item.useremail}</td>
          <td>{item.reg_date}</td>
          <td>{item.userflag}</td>
          <td>
            {item.userflag !== "A" && (
              <button id={item.useremail} onClick={handleUserAdmin}>
                사용자삭제
              </button>
            )}
          </td>
        </tr>
      );
    });

  const pageCount = Math.ceil(userList.length / userPerPage);

  const changePage = ({ selected }: { selected: number }) => {
    setPageNumber(selected);
  };

  useEffect(() => {
    async function fetchData() {
      const response2 = await axiosApi.post("api/admin?type=allList");
      setUserList(response2.data.json);
    }
    fetchData();
  }, [reAdmin]);

  if (userInfo.userflag !== "A") {
    return (
      <Warning message="잘못된 접근입니다. 홈으로 돌아갑니다." path="/home" />
    );
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <span
        style={{
          padding: "20px",
          color: "blue",
          cursor: "pointer",
        }}
      >
        메인으로 돌아가기
      </span>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <table border={1}>
          <thead>
            <tr>
              <th>사용자이름(닉네임)</th>
              <th>사용자아이디(이메일)</th>
              <th>등록 날짜</th>
              <th>사용자 등급</th>
              <th>사용자관리</th>
            </tr>
            {displayAll}
          </thead>
        </table>
        <ReactPaginate
          previousLabel={"이전"}
          nextLabel={"다음"}
          pageCount={pageCount}
          onPageChange={changePage}
        />
      </div>
    </div>
  );
};

export default AdminPage;
