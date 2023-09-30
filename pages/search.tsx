import { useState } from "react";
import { Card } from "@/components/Card/Card";
import { AiOutlineSearch } from "react-icons/ai";
import { getLayoutCardPages } from "@/layouts/LayoutCardPages";
import { useGetCurrentData } from "@/layouts/LayoutCardPages/hooks/useGetCurrentData";
import { InvalidPage } from "@/components/InvalidPage/InvalidPage";
import { PageHead } from "@/components/PageHead/PageHead";
import styles from "@/styles/Search.module.scss";

export default function Search() {
  const [storeText, setStoreText] = useState("");
  const [searchText, setSearchText] = useState("");
  const [canShowData, setCanShowData] = useState(false);
  const data = useGetCurrentData("games", "search", searchText);

  const handleClick = () => {
    setSearchText(storeText);
    setCanShowData(true);
  };

  if (data?.detail) {
    return <InvalidPage detail={data.detail} />;
  }

  return (
    <>
      <PageHead
        title={"Game Archive - Search"}
        description={"Game archive search page. Search any game on this page."}
        keywords={"game archive, game, search"}
      />
      <div className={styles["Search"]}>
        <div className={styles["Search__Items"]}>
          <input
            type="text"
            placeholder="Search..."
            autoFocus
            onChange={(a) => setStoreText(a.target.value)}
            onKeyDown={(a) => {
              if (a.key === "Enter") {
                handleClick();
              }
            }}
          />
          <div className={styles["Search__Icon"]} onClick={handleClick}>
            <AiOutlineSearch />
          </div>
        </div>
      </div>
      {canShowData &&
        (data?.length ? (
          <Card data={data} />
        ) : data?.length === 0 ? (
          <p style={{ color: "white", textAlign: "center" }}>
            No games matched your criteria, try a different search.
          </p>
        ) : (
          <p style={{ color: "white", textAlign: "center" }}>Searching...</p>
        ))}
    </>
  );
}

Search.getLayout = getLayoutCardPages;
