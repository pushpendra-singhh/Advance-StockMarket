import React, { useState } from 'react';
import { useStockData } from '../context/StockDataContext';
import StockTable from './StockTable';
import StockGraph from './StockGraph';

const categories = ['IT', 'Telecom', 'Food', 'Hotel'];

const Stocks = () => {
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedStock, setSelectedStock] = useState(null);
  const { stockData } = useStockData();

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    setSelectedStock(null);
  };

  const handleStockClick = (stock) => {
    setSelectedStock(stock);
  };

  const handleCloseGraph = () => {
    setSelectedStock(null);
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center mb-6">
    <h1 className="text-3xl font-bold mr-4">Stock Categories</h1>
    <p className="text-base">(Click on stock name to see the price chart)</p>
</div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
        {categories.map((category) => (
          <button
            key={category}
            className={`p-4 text-center rounded-lg shadow-md transition-colors ${
              selectedCategory === category
                ? 'bg-blue-600 text-white'
                : 'bg-white hover:bg-gray-100'
            }`}
            onClick={() => handleCategoryClick(category)}
          >
            {category}
          </button>
        ))}
      </div>
      {selectedCategory && !selectedStock && (
        <StockTable
          category={selectedCategory}
          stocks={stockData.filter((stock) => stock.category === selectedCategory)}
          onStockClick={handleStockClick}
        />
      )}
      {selectedStock && (
        <StockGraph stock={selectedStock} onClose={handleCloseGraph} />
      )}
    </div>
  );
};

export default Stocks;