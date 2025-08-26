import React from "react";
import { SlActionUndo, SlActionRedo } from "react-icons/sl";

const ChangePage = ({ nextPage, prevPage, currentPage, totalPages, changePage }) => {
  // Generate page numbers for the 8 buttons
  const getPageNumbers = () => {
    const pages = [];

    // Always include page 1
    pages.push(1);

    // Calculate previous two pages
    const prevPage2 = currentPage - 2;
    const prevPage1 = currentPage - 1;
    if (prevPage2 > 1) pages.push(prevPage2); // Only add if > 1
    if (prevPage1 > 1 && prevPage1 !== prevPage2) pages.push(prevPage1); // Avoid duplicates

    // Add current page if not already included
    if (currentPage !== 1 && !pages.includes(currentPage)) {
      pages.push(currentPage);
    }

    // Calculate next two pages
    const nextPage1 = currentPage + 1;
    const nextPage2 = currentPage + 2;
    if (nextPage1 < totalPages && !pages.includes(nextPage1)) pages.push(nextPage1);
    if (nextPage2 < totalPages && !pages.includes(nextPage2)) pages.push(nextPage2);

    // Add last page if not already included
    if (totalPages !== 1 && !pages.includes(totalPages)) pages.push(totalPages);

    // Fill remaining slots to reach 8 buttons (if possible)
    while (pages.length < 8 && pages[pages.length - 1] < totalPages) {
      const nextPage = pages[pages.length - 1] + 1;
      if (nextPage <= totalPages && !pages.includes(nextPage)) {
        pages.push(nextPage);
      } else {
        break;
      }
    }

    // Sort pages numerically and limit to 8
    return pages.sort((a, b) => a - b).slice(0, 8);
  };

  const pageNumbers = getPageNumbers();

  return (
    <div className="flex flex-col items-center gap-2 mt-4">
      {/* Text above buttons */}
      <span className="text-gray-700 text-lg">
        Page {currentPage} of {totalPages}
      </span>
      {/* Button container */}
      <div className="flex items-center gap-2" role="navigation">
        {/* Previous Page Button */}
        <button
          className="prevPage disabled:opacity-50 p-2 rounded-md hover:bg-gray-200"
          onClick={prevPage}
          disabled={currentPage === 1}
          aria-label="Previous Page"
        >
          <SlActionUndo className="text-[#AB8BFF] text-2xl" />
        </button>
        {/* Page Number Buttons */}
        {pageNumbers.map((pageNum) => (
          <button
            key={pageNum}
            className={`px-3 py-1 rounded-md text-[#AB8BFF] ${
              pageNum === currentPage
                ? "bg-[#AB8BFF] text-white"
                : "hover:bg-gray-200"
            }`}
            onClick={() => changePage(pageNum)}
            disabled={pageNum === currentPage}
            aria-label={`Go to Page ${pageNum}`}
          >
            {pageNum}
          </button>
        ))}
        {/* Next Page Button */}
        <button
          className="nextPage disabled:opacity-50 p-2 rounded-md hover:bg-gray-200"
          onClick={nextPage}
          disabled={currentPage >= totalPages}
          aria-label="Next Page"
        >
          <SlActionRedo className="text-[#AB8BFF] text-2xl" />
        </button>
      </div>
    </div>
  );
};

export default ChangePage;