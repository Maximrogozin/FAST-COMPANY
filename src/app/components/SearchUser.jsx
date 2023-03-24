import React, { useState } from "react";
import PropTypes from "prop-types";

const SearchUser = ({ handleSearch }) => {
    const [data, setData] = useState("");

    const handleChange = (event) => {
        const value = event.target.value;
        setData(value);
        handleSearch(value);
    };

    return (
        <form className="d-flex" role="search">
            <input
                className="form-control me-2"
                type="search"
                placeholder="Поиск"
                aria-label="Поиск"
                value={data}
                onChange={handleChange}
            />
        </form>
    );
};

SearchUser.propTypes = {
    handleSearch: PropTypes.func.isRequired,
    clear: PropTypes.bool
};

export default SearchUser;
