import "../App.css";
import { ASC, DESC, CURRENT_SORT } from "../constants";

const Sorting = ({ sortOption, onSortChange }) => (
  <div className="sorting-options">
    <p
      className={sortOption === ASC ? CURRENT_SORT : ""}
      onClick={() => onSortChange(ASC)}
    >
      ASC
    </p>
    <p
      className={sortOption === DESC ? CURRENT_SORT : ""}
      onClick={() => onSortChange(DESC)}
    >
      DESC
    </p>
  </div>
);

export default Sorting;
