import React, { useEffect, useState } from 'react';
import { useStockData } from '../context/StockDataContext';
import { useAuth } from '../context/AuthContext';

const Profile = () => {
  const [holdings, setHoldings] = useState([]);
  const [watchlist, setWatchlist] = useState([]);
  const { getStockData } = useStockData();
  const { user } = useAuth();

  useEffect(() => {
    const userHoldings = JSON.parse(localStorage.getItem('userHoldings')) || [];
    setHoldings(userHoldings);

    const userWatchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    setWatchlist(userWatchlist);
  }, []);

  const handleStockClick = (stock) => {
    const stockData = getStockData(stock.symbol);
    console.log('Stock Data:', stockData);
    // You can implement a modal or expand the stock information here
  };

  return (
    <div className="max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">User Profile</h1>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Welcome, {user.username}!</h2>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Stock Holdings</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {holdings.map((stock) => (
            <div
              key={stock.symbol}
              className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => handleStockClick(stock)}
            >
              <h3 className="text-lg font-semibold">{stock.symbol}</h3>
              <p>Quantity: {stock.quantity}</p>
              <p>Average Price: ${stock.averagePrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6">
        <h2 className="text-2xl font-semibold mb-4">Your Watchlist</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {watchlist.map((stock) => (
            <div
              key={stock.symbol}
              className="bg-gray-100 p-4 rounded-lg cursor-pointer hover:bg-gray-200 transition-colors"
              onClick={() => handleStockClick(stock)}
            >
              <h3 className="text-lg font-semibold">{stock.symbol}</h3>
              <p>{stock.name}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Profile;