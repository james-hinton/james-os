import "./PageControl.scss";

const PageControl = ({ currentPage, setCurrentPage, pageCount }) => {
  return (
    <div className="page-control">
      {Array.from({ length: pageCount }).map((_, index) => (
        <span
          key={index}
          className={`dot ${index === currentPage ? "active" : ""}`}
          onClick={() => setCurrentPage(index)}
        ></span>
      ))}
    </div>
  );
};

export default PageControl;
