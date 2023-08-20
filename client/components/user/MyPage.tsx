import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useAppDispatch, useAppSelector } from "@store/store";
import { userInfoFetch } from "@store/userInfoSlice";
import useInput from "@hooks/useInput";
import { useUserDelete } from "@hooks/auth/useUserDelete";
import { useEditUsername } from "@hooks/user/useEditUsername";
import MyPageView from "./MyPageView";

const MyPage = () => {
  const [active, setActive] = useState(false);
  const [editedName, setEditedName] = useState<string | null>(null);
  const dispatch = useAppDispatch();
  const userInfo = useAppSelector((state) => state.userInfo.value);
  const {
    value: editName,
    onChange: onEditNameChange,
    setValue: setEditName,
  } = useInput(userInfo.username);
  const router = useRouter();

  const handleUserDelete = useUserDelete();

  const handleEditUserName = useEditUsername();

  const handleEdit = async () => {
    const result = await handleEditUserName(editName);
    if (result) {
      dispatch(userInfoFetch());
      setActive(false);
      setEditName(editedName !== null ? editedName : userInfo.username);
    }
  };

  useEffect(() => {
    setEditedName(localStorage.getItem("username"));
  }, [active]);

  const myPageData = {
    userInfo,
    editName,
    onEditNameChange,
    active,
    handleActiveCancel: () => setActive(false),
    handleActive: () => setActive(true),
    handleEdit,
    editedName,
    handleUserDelete,
    handleChangeUserLocation: () => router.push("/auth"),
  };
  return <MyPageView {...myPageData} />;
};

export default MyPage;
