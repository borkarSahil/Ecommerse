import React from "react";
import { useSearch } from "../Context/search";
import { BACKEND_URL } from "../helper/constants";
import { Button } from "../components/ui/button";

const Search = () => {
  const [values, setValues] = useSearch();
  return (
    <div>
      <div>
        <h1>Search Results : </h1>
        <h4>
          {values?.results.length < 1
            ? "No Products Found "
            : `Found ${values?.results.length}`}
        </h4>
      </div>

      <div>
        {values?.results.map((p) => (
          <div className="m-5 border-2">
            <div>
              <h2>{p.name}</h2>
              <h2>{p.description}</h2>
              <h2>Price : {p.price}</h2>
              <h2>{p.quantity}</h2>
              <img
                src={`${BACKEND_URL}/api/products/get-photo/${p._id}`}
                alt={p.name}
              />
            </div>

            <div>
              <Button className="p-3 m-3">Add to Cart </Button>
              <Button>More Details</Button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
