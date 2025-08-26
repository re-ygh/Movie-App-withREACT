import React from "react";
import { SlActionUndo, SlActionRedo } from "react-icons/sl";

const ChangePage = ({ nextPage, prevPage, currentPage, totalPages, ChangePage }) => {
  return (
    <div className="flex justify-center gap-4 mt-4">
      <button
        className="prevPage disabled:opacity-50"
        onClick={prevPage}
        disabled={currentPage === 1}
        aria-label="Previous Page"
      >
        <SlActionUndo className="text-[#AB8BFF] text-3xl" />
      </button>
      <button
        className="nextPage disabled:opacity-50"
        onClick={nextPage}
        disabled={currentPage >= totalPages}
        aria-label="Next Page"
      >
        <SlActionRedo className="text-[#AB8BFF] text-3xl" />
      </button>
    </div>
  );
};

export default ChangePage;