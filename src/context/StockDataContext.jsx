import React, { createContext, useContext, useState, useEffect } from 'react';

const StockDataContext = createContext();

export const useStockData = () => useContext(StockDataContext);

export const StockDataProvider = ({ children }) => {
  const [stockData, setStockData] = useState([]);

  useEffect(() => {
    // Initialize stock data
    const initialStocks = [
      {
        symbol: 'AAPL',
        name: 'Apple Inc.',
        category: 'IT',
        price: 150,
        history: [150],
      },{
        "symbol": "TCS",
        "name": "Tata Consultancy Services",
        "category": "IT",
        "price": 4308.70,
        "history": [4308.70]
    },
    {
        "symbol": "INFY",
        "name": "Infosys Ltd.",
        "category": "IT",
        "price": 1906.75,
        "history": [1906.75]
    },
    {
        "symbol": "HCLTECH",
        "name": "HCL Technologies",
        "category": "IT",
        "price": 1808.40,
        "history": [1808.40]
    },
    {
        "symbol": "WIPRO",
        "name": "Wipro Ltd.",
        "category": "IT",
        "price": 541.80,
        "history": [541.80]
    },
    {
        "symbol": "TECHM",
        "name": "Tech Mahindra",
        "category": "IT",
        "price": 1609.25,
        "history": [1609.25]
    },
      {
        symbol: 'GOOGL',
        name: 'Alphabet Inc.',
        category: 'IT',
        price: 2800,
        history: [2800],
      },
      {
        symbol: 'VZ',
        name: 'Verizon Communications',
        category: 'Telecom',
        price: 55,
        history: [55],
      },
        {
            "symbol": "BHARTI",
            "name": "Bharti Airtel",
            "category": "Telecom",
            "price": 1760.45,
            "history": [1760.45]
        },
        {
            "symbol": "INDUSTOW",
            "name": "Indus Towers Ltd.",
            "category": "Telecom",
            "price": 390.95,
            "history": [390.95]
        },
        {
            "symbol": "VODAFONE",
            "name": "Vodafone Idea Ltd.",
            "category": "Telecom",
            "price": 10.36,
            "history": [10.36]
        },
        {
            "symbol": "TATACOMM",
            "name": "Tata Communications Ltd.",
            "category": "Telecom",
            "price": 2128.25,
            "history": [2128.25]
        },
        {
            "symbol": "HFCL",
            "name": "HFCL Ltd.",
            "category": "Telecom",
            "price": 158.40,
            "history": [158.40]
        },
    
      {
        symbol: 'T',
        name: 'AT&T Inc.',
        category: 'Telecom',
        price: 30,
        history: [30],
      },
      {
        symbol: 'MCD',
        name: "McDonald's Corporation",
        category: 'Food',
        price: 250,
        history: [250],
      },
      {
        symbol: 'YUM',
        name: 'Yum! Brands, Inc.',
        category: 'Food',
        price: 120,
        history: [120],
      },
        {
            "symbol": "NESTLE",
            "name": "Nestle India Ltd.",
            "category": "Food",
            "price": 22244.90,
            "history": [22244.90]
        },
        {
            "symbol": "BRITANNIA",
            "name": "Britannia Industries Ltd.",
            "category": "Food",
            "price": 4542.80,
            "history": [4542.80]
        },
        {
            "symbol": "ADANIWIL",
            "name": "Adani Wilmar Ltd.",
            "category": "Food",
            "price": 375.60,
            "history": [375.60]
        },
        {
            "symbol": "HATSUN",
            "name": "Hatsun Agro Product Ltd.",
            "category": "Food",
            "price": 1179.55,
            "history": [1179.55]
        },
        {
            "symbol": "BIKAJI",
            "name": "Bikaji Foods International Ltd.",
            "category": "Food",
            "price": 478.45,
            "history": [478.45]
        },    
      {
        symbol: 'MAR',
        name: 'Marriott International',
        category: 'Hotel',
        price: 140,
        history: [140],
      },
      {
        symbol: 'H',
        name: 'Hyatt Hotels Corporation',
        category: 'Hotel',
        price: 80,
        history: [80],
      },
        {
            "symbol": "INDHOTEL",
            "name": "Indian Hotels Company Ltd.",
            "category": "Hotel",
            "price": 710.40,
            "history": [710.40]
        },
        {
            "symbol": "EIHOTEL",
            "name": "EIH Ltd. (Oberoi Hotels)",
            "category": "Hotel",
            "price": 36.88,
            "history": [36.88]
        },
        {
            "symbol": "LemonTree",
            "name": "Lemon Tree Hotels Ltd.",
            "category": "Hotel",
            "price": 102.50,
            "history": [102.50]
        },
        {
            "symbol": "CARNIVAL",
            "name": "Carnival Cinemas & Hotels",
            "category": "Hotel",
            "price": 45.75,
            "history": [45.75]
        },
        {
            "symbol": "HILTONIND",
            "name": "Hilton Worldwide Holdings (India)",
            "category": "Hotel",
            "price": 145.00,
            "history": [145.00]
        }    
    ];
    setStockData(initialStocks);

    // Simulate real-time updates
    const interval = setInterval(() => {
      setStockData((prevData) =>
        prevData.map((stock) => {
          const change = (Math.random() - 0.5) * 5; // Random change between -2.5 and 2.5
          const newPrice = Math.max(stock.price + change, 0.01);
          return {
            ...stock,
            price: newPrice,
            history: [...stock.history, newPrice].slice(-20),
          };
        })
      );
    }, 1000); // Update every second

    return () => clearInterval(interval);
  }, []);

  const addToWatchlist = (stock) => {
    const watchlist = JSON.parse(localStorage.getItem('watchlist')) || [];
    if (!watchlist.some((item) => item.symbol === stock.symbol)) {
      watchlist.push(stock);
      localStorage.setItem('watchlist', JSON.stringify(watchlist));
      alert(`${stock.symbol} added to watchlist!`);
    } else {
      alert(`${stock.symbol} is already in your watchlist!`);
    }
  };

  const buyStock = (stock, quantity) => {
    const holdings = JSON.parse(localStorage.getItem('userHoldings')) || [];
    const existingHolding = holdings.find((h) => h.symbol === stock.symbol);

    if (existingHolding) {
      existingHolding.quantity += quantity;
      existingHolding.averagePrice =
        (existingHolding.averagePrice * existingHolding.quantity +
          stock.price * quantity) /
        (existingHolding.quantity + quantity);
    } else {
      holdings.push({
        symbol: stock.symbol,
        quantity: quantity,
        averagePrice: stock.price,
      });
    }

    localStorage.setItem('userHoldings', JSON.stringify(holdings));
    alert(`Bought ${quantity} shares of ${stock.symbol}`);
  };

  const sellStock = (stock, quantity) => {
    const holdings = JSON.parse(localStorage.getItem('userHoldings')) || [];
    const existingHolding = holdings.find((h) => h.symbol === stock.symbol);

    if (existingHolding && existingHolding.quantity >= quantity) {
      existingHolding.quantity -= quantity;
      if (existingHolding.quantity === 0) {
        const index = holdings.findIndex((h) => h.symbol === stock.symbol);
        holdings.splice(index, 1);
      }
      localStorage.setItem('userHoldings', JSON.stringify(holdings));
      alert(`Sold ${quantity} shares of ${stock.symbol}`);
    } else {
      alert(`You don't have enough shares of ${stock.symbol} to sell!`);
    }
  };

  const getStockData = (symbol) => {
    return stockData.find((stock) => stock.symbol === symbol);
  };

  return (
    <StockDataContext.Provider
      value={{ stockData, addToWatchlist, buyStock, sellStock, getStockData }}
    >
      {children}
    </StockDataContext.Provider>
  );
};