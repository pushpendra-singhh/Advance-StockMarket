import React, { useEffect, useState } from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { X, LineChart as LineChartIcon, BarChart as BarChartIcon } from 'lucide-react';

const StockGraph = ({ stock, onClose }) => {
  const [data, setData] = useState([]);
  const [chartType, setChartType] = useState('line');

  useEffect(() => {
    const updateData = () => {
      const newPrice = stock.price + (Math.random() - 0.5) * 2;
      const newDataPoint = {
        time: new Date().toLocaleTimeString(),
        price: newPrice,
      };
      setData(prevData => [...prevData.slice(-19), newDataPoint]);
    };

    // Initial data
    const initialData = stock.history.slice(-20).map((price, index) => ({
      time: new Date(Date.now() - (19 - index) * 1000).toLocaleTimeString(),
      price: price,
    }));
    setData(initialData);

    // Update every second
    const interval = setInterval(updateData, 1000);

    return () => clearInterval(interval);
  }, [stock]);

  const renderChart = () => {
    if (chartType === 'line') {
      return (
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Line type="monotone" dataKey="price" stroke="#8884d8" dot={false} />
        </LineChart>
      );
    } else {
      return (
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="time" />
          <YAxis domain={['auto', 'auto']} />
          <Tooltip />
          <Bar dataKey="price" fill="#8884d8" />
        </BarChart>
      );
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white rounded-lg p-6 w-full max-w-3xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">{stock.symbol} Stock Price</h2>
          <div className="flex space-x-2">
            <button
              onClick={() => setChartType('line')}
              className={`p-2 rounded ${chartType === 'line' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              title="Line Chart"
            >
              <LineChartIcon size={20} />
            </button>
            <button
              onClick={() => setChartType('bar')}
              className={`p-2 rounded ${chartType === 'bar' ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
              title="Bar Chart"
            >
              <BarChartIcon size={20} />
            </button>
            <button onClick={onClose} className="p-2 rounded bg-gray-200 hover:bg-gray-300" title="Close">
              <X size={20} />
            </button>
          </div>
        </div>
        <ResponsiveContainer width="100%" height={400}>
          {renderChart()}
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default StockGraph;