import React, { useState, useEffect } from 'react';
import axios from 'axios';

const NSEStockPrice = () => {
  const [stockPrices, setStockPrices] = useState([]);
  const [previousPrices, setPreviousPrices] = useState({});
  const [error, setError] = useState(null);
  const apiKey = 'csoc4n9r01qt3r3498n0csoc4n9r01qt3r3498ng'; 
  const symbols = ['AAPL', 'GOOGL', 'MSFT', 'AMZN'];  

  const logoUrls = {
    AAPL: 'https://logo.clearbit.com/apple.com',
    GOOGL: 'https://logo.clearbit.com/google.com',
    MSFT: 'https://logo.clearbit.com/microsoft.com',
    AMZN: 'https://logo.clearbit.com/amazon.com',
  };

  const fetchStockData = async () => {
    try {
      const prices = [];

      for (const symbol of symbols) {
        const response = await axios.get('https://finnhub.io/api/v1/quote', {
          params: {
            symbol: symbol,
            token: apiKey,
          },
        });

        if (!response.data || response.data.c === null) {
          console.warn(`No data found for symbol: ${symbol}`);
          prices.push({ company: symbol, price: 'N/A' });
        } else {
          const latestPriceUSD = response.data.c;
          prices.push({
            company: symbol,
            price: latestPriceUSD.toFixed(2), 
          });
        }
      }

      setStockPrices(prices);
    } catch (err) {
      setError('Error fetching stock data');
      console.error(err);
    }
  };

  useEffect(() => {
    fetchStockData(); 

    const intervalId = setInterval(() => {
      fetchStockData(); 
    }, 5000);

    return () => clearInterval(intervalId); 
  }, [apiKey]);

  useEffect(() => {
    if (stockPrices.length > 0) {
      const newPreviousPrices = {};
      stockPrices.forEach(stock => {
        newPreviousPrices[stock.company] = stock.price;
      });
      setPreviousPrices(newPreviousPrices);
    }
  }, [stockPrices]);

  if (error) return <p>{error}</p>;
  if (!stockPrices.length) return <p>Loading...</p>;

  return (
    <div className="stock-container">
      <h2>Live Stock Prices (in USD)</h2>
      <ul>
        {stockPrices.map((stock, index) => (
          <li key={index} className="stock-item">
            <img
              src={logoUrls[stock.company]}
              alt={`${stock.company} logo`}
              className="stock-logo"
            />
            <strong>{stock.company} : </strong> &nbsp; 
            <span>
              ${stock.price}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default NSEStockPrice;