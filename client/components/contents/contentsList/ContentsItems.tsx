import { MouseEvent, useState } from "react";
import Link from "next/link";
import { handleAmountComma } from "@util/handleAmountComma";
import { ContentsState } from "@@types/contentsType";
import useHandleDeleteModal from "@hooks/useHandleModal";
import { useHandleDelete } from "@hooks/contents/useHandleDelete";
import styles from "@styles/ContentsItems.module.scss";
import { Confirm } from "@util/handleAlert";

const ContentsItems = ({
  contents,
  listByCountry,
}: {
  contents: ContentsState;
  listByCountry: string;
}) => {
  const { isOpen, open, close } = useHandleDeleteModal();
  const { mutate: deleteContent } = useHandleDelete();
  const [locationX, setLocationX] = useState(0);

  const openDeleteModal = (e: MouseEvent<HTMLTableRowElement>) => {
    e.preventDefault();
    const { pageX } = e;
    setLocationX(pageX);
    open();
  };

  const handleDelete = async (e: MouseEvent<HTMLDivElement>, id: string) => {
    e.stopPropagation();
    await Confirm("삭제").then((result) => {
      if (result.isConfirmed) {
        deleteContent(id);
      }
    });
    close();
  };

  return (
    <Link href={`/contents/${contents.id}`}>
      {listByCountry !== "" ? (
        <>
          {contents.country === listByCountry && (
            <Link href={`/contents/${contents.id}`}>
              <tr
                className={styles.itemTable_tr}
                onContextMenu={(e) => openDeleteModal(e)}
                onMouseLeave={() => close()}
              >
                <td>{contents.tripDate}</td>
                <td>
                  {contents.country.length < 24
                    ? contents.country
                    : `${contents.country.slice(0, 24)}...`}
                </td>
                <td>
                  {contents.food.length < 7
                    ? contents.food
                    : `${contents.food.slice(0, 7)}...`}
                </td>
                <td>
                  {contents.foodExpenses} {contents.currencyCode}
                </td>
                <td>{handleAmountComma(contents.exchangedMoney)}원</td>
                {isOpen && (
                  <div
                    style={{
                      position: "absolute",
                      left: `${locationX}px`,
                    }}
                    className={styles.item_modal}
                    onClick={(e) => handleDelete(e, contents.id)}
                    onMouseLeave={() => close()}
                  >
                    삭제
                  </div>
                )}
              </tr>
            </Link>
          )}
        </>
      ) : (
        <tr
          className={styles.itemTable_tr}
          onContextMenu={(e) => openDeleteModal(e)}
          onMouseLeave={() => close()}
        >
          <td>{contents.tripDate}</td>
          <td>
            {contents.country.length < 24
              ? contents.country
              : `${contents.country.slice(0, 24)}...`}
          </td>
          <td>
            {contents.food.length < 7
              ? contents.food
              : `${contents.food.slice(0, 7)}...`}
          </td>
          <td>
            {contents.foodExpenses} {contents.currencyCode}
          </td>
          <td>{handleAmountComma(contents.exchangedMoney)}원</td>
          {isOpen && (
            <div
              style={{
                position: "absolute",
                left: `${locationX}px`,
                zIndex: "1000",
              }}
              className={styles.item_modal}
              onClick={(e) => handleDelete(e, contents.id)}
              onMouseLeave={() => close()}
            >
              삭제
            </div>
          )}
        </tr>
      )}
    </Link>
  );
};

export default ContentsItems;
