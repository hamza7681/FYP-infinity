import React from "react";
import { ImSearch } from "react-icons/im";

const Filters = ({
  handleSearch,
  categories,
  handleCategorySearch,
  handlePriceRangeSearch,
  handleLanguageSearch,
}) => {
  return (
    <>
      <div className="h-full w-auto">
        <div className="w-25%">
          <div className="flex items-center justify-between mb-4 mt-4">
            <input
              type="text"
              placeholder="Search for anything"
              className="px-4 py-2 border border-gray-400 rounded w-full"
              onChange={handleSearch}
            />
            <div className="relative">
              <ImSearch className="absolute -top-5 right-0 mr-4 mt-3" />
            </div>
          </div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">Categories</h3>
            <select
              onChange={handleCategorySearch}
              className="px-4 py-2 border border-gray-400 rounded w-full"
            >
              <option value="All Categories">All Categories</option>
              {categories &&
                categories.map((val) => {
                  return (
                    <>
                      <option key={val._id} value={val._id}>
                        {val.name}
                      </option>
                    </>
                  );
                })}
            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Price</h3>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price-range"
                  value="10000-20000"
                  onChange={handlePriceRangeSearch}
                  className="mr-2"
                />
                10,000 - 20,000
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price-range"
                  value="20000-30000"
                  onChange={handlePriceRangeSearch}
                  className="mr-2"
                />
                20,000 - 30,000
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price-range"
                  value="30000-40000"
                  onChange={handlePriceRangeSearch}
                  className="mr-2"
                />
                30,000 - 40,000
              </label>
            </div>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Languages</h3>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="Urdu"
                  onChange={handleLanguageSearch}
                  className="mr-2"
                />
                Urdu
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="English"
                  onChange={handleLanguageSearch}
                  className="mr-2"
                />
                English
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="language"
                  value="Hindi"
                  onChange={handleLanguageSearch}
                  className="mr-2"
                />
                Hindi
              </label>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Filters;
