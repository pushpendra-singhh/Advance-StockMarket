import React from 'react';
import { useStockData } from '../context/StockDataContext';

const StockTable = ({ category, stocks, onStockClick }) => {
  const { addToWatchlist, buyStock, sellStock } = useStockData();

  const handleAddToWatchlist = (stock) => {
    addToWatchlist(stock);
  };

  const handleBuyStock = (stock) => {
    const quantity = prompt('Enter the quantity to buy:', '1');
    if (quantity && !isNaN(quantity)) {
      buyStock(stock, parseInt(quantity));
    }
  };

  const handleSellStock = (stock) => {
    const quantity = prompt('Enter the quantity to sell:', '1');
    if (quantity && !isNaN(quantity)) {
      sellStock(stock, parseInt(quantity));
    }
  };

  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <h2 className="text-2xl font-semibold p-4 bg-gray-100">{category} Stocks</h2>
      <table className="w-full">
        <thead>
          <tr className="bg-gray-200">
            <th className="p-2 text-left">Stock Name</th>
            <th className="p-2 text-left">Current Price</th>
            <th className="p-2 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {stocks.map((stock) => (
            <tr key={stock.symbol} className="border-b hover:bg-gray-50">
              <td
                className="p-2 cursor-pointer"
                onClick={() => onStockClick(stock)}
              >
                {stock.symbol}
              </td>
              <td className="p-2">${stock.price.toFixed(2)}</td>
              <td className="p-2 text-center">
                <button
                  className="bg-blue-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleAddToWatchlist(stock)}
                >
                  Add to Watchlist
                </button>
                <button
                  className="bg-green-500 text-white px-2 py-1 rounded mr-2"
                  onClick={() => handleBuyStock(stock)}
                >
                  Buy
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleSellStock(stock)}
                >
                  Sell
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StockTable;