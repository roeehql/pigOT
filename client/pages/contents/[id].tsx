import { NextPage } from "next";
import dynamic from "next/dynamic";

const ContentsDetail = dynamic(
  () => import("@components/contents/Detail/ContentsDetail")
);
const Detail: NextPage = () => {
  return <ContentsDetail />;
};

export default Detail;
