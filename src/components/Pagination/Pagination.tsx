import React from "react";
import ReactPaginate from "react-paginate";
import css from './Pagination.module.css'; 

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
}) => {
  if (totalPages <= 1) {
    return null;
  }

  const handlePageClick = (event: { selected: number }) => {
    onPageChange(event.selected + 1);
  };

  return (
    <ReactPaginate
      breakLabel="..."
      nextLabel=">"
      onPageChange={handlePageClick}
      pageRangeDisplayed={3}
      marginPagesDisplayed={2}
      pageCount={totalPages}
      previousLabel="<"
      renderOnZeroPageCount={null}
      forcePage={currentPage - 1} 
      containerClassName={css.paginationContainer} 
      pageClassName={css.pageItem}
      pageLinkClassName={css.pageLink}
      activeClassName={css.active}
      previousClassName={css.prevItem}
      nextClassName={css.nextItem}
      previousLinkClassName={css.prevLink}
      nextLinkClassName={css.nextLink}
      breakClassName={css.breakItem}
      breakLinkClassName={css.breakLink}
    />
  );
};

export default Pagination;