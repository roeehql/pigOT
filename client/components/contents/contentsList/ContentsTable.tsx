import { ContentsState } from "@@types/contentsType";
import ContentsItems from "./ContentsItems";

interface ContentsTableState {
  className: string;
  contentsArr: ContentsState[] | undefined;
  listByCountry: string;
}

const ContentsTable = ({
  className,
  contentsArr,
  listByCountry,
}: ContentsTableState) => {
  return (
    <div className={className}>
      <table>
        <thead>
          <tr>
            <td>여행일자</td>
            <td>여행국가</td>
            <td>음식이름</td>
            <td>금액</td>
            <td>한국(원기준)금액</td>
          </tr>
        </thead>
        <tbody>
          {contentsArr?.map((item) => (
            <ContentsItems
              key={item.id}
              listByCountry={listByCountry}
              contents={item}
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ContentsTable;
