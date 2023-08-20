import { NextPage } from "next";
import dynamic from "next/dynamic";

const Home = dynamic(() => import("@components/Home"));
const Main: NextPage = () => {
  return <Home />;
};

export default Main;
