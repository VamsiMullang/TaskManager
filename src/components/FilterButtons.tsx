import React, { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../store/taskSlice";
import { FilterType } from "../types/taskTypes";

const FilterButtons: React.FC = React.memo(() => {
  const dispatch = useDispatch();

  const handleFilterChange = useCallback(
    (filter: FilterType) => {
      dispatch(setFilter(filter));
    },
    [dispatch]
  );

  return (
    <div className="flex space-x-2 mb-4">
      <button
        onClick={() => handleFilterChange("all")}
        className="px-4 py-2 bg-gray-200 rounded hover:bg-gray-300"
      >
        All
      </button>
      <button
        onClick={() => handleFilterChange("completed")}
        className="px-4 py-2 bg-green-200 rounded hover:bg-green-300"
      >
        Completed
      </button>
      <button
        onClick={() => handleFilterChange("pending")}
        className="px-4 py-2 bg-yellow-200 rounded hover:bg-yellow-300"
      >
        Pending
      </button>
    </div>
  );
});

export default FilterButtons;
