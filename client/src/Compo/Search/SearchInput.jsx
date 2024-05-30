import React from 'react'
import { useSearch } from '../../Context/search';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";
import { BACKEND_URL } from '../../helper/constants';

const SearchInput = () => {
    const [values, setValues] = useSearch();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.get(
              `${BACKEND_URL}/api/products/search/${values.keyword}`
            );
            console.log("Keyword: " + values.keyword);
           
            setValues({ ...values, results : data});
            console.log("Data: " + data);
            navigate("/search");
        } catch (error) {
            console.log("Search error", error);
            toast.error(error.message);
        }
    }
    //  console.log(`${BACKEND_URL}/api/products/search/${values.keyword}`);

  return (
    <div>
      <form
        className="d-flex search-form"
        role="search"
        onSubmit={handleSubmit}
      >
        <input
          className="form-control me-2"
          type="search"
          placeholder="Search"
          aria-label="Search"
          value={values.keyword}
          onChange={(e) => setValues({ ...values, keyword: e.target.value })}
        />
        <button className="btn btn-outline-success" type="submit">
          Search
        </button>
      </form>
    </div>
  );
}

export default SearchInput