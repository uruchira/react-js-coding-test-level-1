const Pagination = ({ gotoNextPage, gotoPrevPage }) => {
  return (
    <div
      className="pagination-section"
      style={{ justifyContent: gotoPrevPage ? "space-between" : "flex-end" }}
    >
      {gotoPrevPage && <button onClick={gotoPrevPage}>Previous</button>}
      {gotoNextPage && <button onClick={gotoNextPage}>Next</button>}
    </div>
  );
};

export default Pagination;
