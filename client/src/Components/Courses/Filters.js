import React, { useState } from 'react';
import {ImSearch} from 'react-icons/im'

const Filters = () => {
    const [showFilters, setShowFilters] = useState(true);
    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedPriceRange, setSelectedPriceRange] = useState('');
    const [selectedLanguages, setSelectedLanguages] = useState([]);
  
    // const handleFilterButtonClick = () => {
    //   setShowFilters(false);
    // };
  
    const handleCategoryChange = (event) => {
      setSelectedCategory(event.target.value);
    };
  
    const handlePriceRangeChange = (event) => {
      setSelectedPriceRange(event.target.value);
    };
  
    const handleLanguageChange = (event) => {
      const language = event.target.value;
      setSelectedLanguages((prevLanguages) => {
        if (prevLanguages.includes(language)) {
          return prevLanguages.filter((l) => l !== language);
        } else {
          return [...prevLanguages, language];
        }
      });
    };
  
  return (
    <>
    <div className='h-full w-auto'>
      {showFilters && (
        <div className="w-25%">
          <div className="flex items-center justify-between mb-4 mt-4">
  <input
    type="text"
    placeholder="Search for anything"
    className="px-4 py-2 border border-gray-400 rounded w-full"
  />
  <div className="relative">
    <ImSearch className="absolute -top-5 right-0 mr-4 mt-3" />
  </div>
</div>

          <div className="mb-4">
            <h3 className="font-bold mb-2">Categories</h3>
            <select
              value={selectedCategory}
              onChange={handleCategoryChange}
              className="px-4 py-2 border border-gray-400 rounded w-full"
            >
              <option value="">All Categories</option>
              <option value="web-dev">Front-endWeb Development</option>
              <option value="graphics">Graphics Designing</option>
              <option value="app">Mobile App Development</option>
              <option value="app">Pyhton Development</option>
              <option value="app">React Development</option>
              <option value="app">Game Development</option>
              <option value="app">Flutter Development</option>
              <option value="app">Internet Of Things</option>
              <option value="app">Software Quality Assurance</option>

            </select>
          </div>
          <div className="mb-4">
            <h3 className="font-bold mb-2">Price</h3>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price-range"
                  value="10-2000"
                  checked={selectedPriceRange === '10-2000'}
                  onChange={handlePriceRangeChange}
                  className="mr-2"
                />
                10,000 - 2,000
              </label>
            </div>
            <div>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="price-range"
                  value="20000-30000"
                  checked={selectedPriceRange === '20000-30000'}
                  onChange={handlePriceRangeChange}
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
                  checked={selectedPriceRange === '30000-40000'}
                  onChange={handlePriceRangeChange}
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
        type="checkbox"
        name="language"
        value="Urdu"
        checked={selectedLanguages.includes('Urdu')}
        onChange={handleLanguageChange}
        className="mr-2"
      />
      Urdu
    </label>
    <label className="flex items-center">
      <input
        type="checkbox"
        name="language"
        value="English"
        checked={selectedLanguages.includes('English')}
        onChange={handleLanguageChange}
        className="mr-2"
      />
      English
    </label>
    <label className="flex items-center">
      <input
        type="checkbox"
        name="language"
        value="Hindi"
        checked={selectedLanguages.includes('Hindi')}
        onChange={handleLanguageChange}
        className="mr-2"
      />
      Hindi
    </label>
  </div>

          </div>
        </div>
      )}
    </div>
  </>
);
};

export default Filters;



