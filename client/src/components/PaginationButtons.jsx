import React, { useEffect, useState } from 'react';
import { useNavigate, Outlet, useParams } from 'react-router-dom';

function PaginationButtons() {
  const [pages, setPages] = useState([1, 2, 3, 4]);
  const { id } = useParams();
  const [currentPage, setCurrentPage] = useState(0);

  const navigateTask = (e) => {
    const id = e.target.id;

    navigate(`/weeklytasks/${id}`);
    setCurrentPage(Number(id));
  };

  const paginationButtons = pages.map((page) => {
    return (
      <button id={page} key={page} onClick={navigateTask}>
        Week {page}
      </button>
    );
  });
  const navigate = useNavigate();

  const navigateNext = () => {
    if (currentPage === 4) {
      return;
    }
    setCurrentPage((prevPage) => prevPage + 1);
    const newPage = currentPage + 1;
    navigate(`/weeklytasks/${newPage}`);
  };

  const navigatePrevious = () => {
    if (currentPage === 1) {
      navigate(`/weeklytasks`);
      setCurrentPage(0);
      return;
    }

    if (!currentPage) {
      return;
    }

    setCurrentPage((prevPage) => prevPage - 1);
    const newPage = currentPage - 1;

    navigate(`/weeklytasks/${newPage}`);
  };

  return (
    <>
      <footer>
        <div className="footer">
          <button onClick={navigatePrevious}>Previous</button>
          {paginationButtons}
          <button onClick={navigateNext}>Next</button>
        </div>
      </footer>
      <Outlet />
    </>
  );
}

export default PaginationButtons;
