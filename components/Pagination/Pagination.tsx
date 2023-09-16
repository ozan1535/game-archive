import { useRouter } from "next/router";
import ReactPaginate from "react-paginate";

export function Pagination({ count }: { count: number }) {
  const router = useRouter();

  const divideContentNumbers = Math.floor(count / 20);
  const divideContentNumbersRemainder = count % 20;

  const handlePageClick = (a: { selected: number }) => {
    const { selected } = a;

    const url = new URL(router.asPath, window.location.origin);
    url.searchParams.set("page", `${selected + 1}`);

    // https://nextjs.org/docs/routing/shallow-routing
    router.push(url, undefined, { shallow: true });
  };

  return (
    <ReactPaginate
      previousLabel={"←"}
      nextLabel={"→"}
      pageCount={divideContentNumbers + (divideContentNumbersRemainder ? 1 : 0)}
      marginPagesDisplayed={1}
      onPageChange={handlePageClick}
      containerClassName={"pagination"}
      previousLinkClassName={"pagination__link"}
      nextLinkClassName={"pagination__link"}
      disabledClassName={"pagination__link--disabled"}
      activeClassName={"pagination__link--active"}
      initialPage={router.query.page ? +router.query.page - 1 : undefined}
      disableInitialCallback={true}
    />
  );
}
