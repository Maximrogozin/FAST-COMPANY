import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";

const TableHeader = ({ onSort, selectedSort, columns }) => {
    const [sortOrder, setSortOrder] = useState("");

    useEffect(() => {
        if (selectedSort.order === "asc") {
            setSortOrder("bi bi-caret-up-fill");
        } else if (selectedSort.order === "desc") {
            setSortOrder("bi bi-caret-down-fill");
        } else {
            setSortOrder("");
        }
    }, [selectedSort]);

    const handleSort = (item) => {
        if (selectedSort.path === item) {
            onSort({
                ...selectedSort,
                order: selectedSort.order === "asc" ? "desc" : "asc"
            });
        } else {
            onSort({ path: item, order: "asc" });
        }
    };

    return (
        <thead>
            <tr>
                {Object.keys(columns).map((column) => (
                    <th
                        key={column}
                        onClick={
                            columns[column].path
                                ? () => handleSort(columns[column].path)
                                : undefined
                        }
                        role={columns[column].path ? "button" : undefined}
                        scope="col"
                    >
                        {columns[column].name}
                        {selectedSort.path === columns[column].path && (
                            <i className={sortOrder}></i>
                        )}
                    </th>
                ))}
            </tr>
        </thead>
    );
};

TableHeader.propTypes = {
    onSort: PropTypes.func.isRequired,
    selectedSort: PropTypes.func.isRequired,
    columns: PropTypes.object.isRequired
};

export default TableHeader;
