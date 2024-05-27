import React, { useState, useEffect } from 'react';
import axios from 'axios';

const URL = "/B090041/openapi/service/SpcdeInfoService"

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  

  const fetchData = async () => {
    try {
      setError(null);
      setData(null);
      setLoading(true);

      const response = await axios.get(URL, {
        params: {
          serviceKey: process.env.REACT_APP_API_KEY,
          numOfRows: 1,
          pageNo: 10,
          solYear: 2024,
          solMonth: 5
        }
      });

      setData(response.data);
    } catch (e) {
      setError(e);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  if(loading) return <div>Loading...</div>;
  if(error)   return <div>Error...</div>;
  if(!data)   return null;

  return (
    <div className="App">
      {data && data.response && data.response.body && data.response.body.items && data.response.body.items.item && (
        <>
          <p>년도 : {data.response.body.items.item.solYear}</p>
          <p>월 : {data.response.body.items.item.solMonth}</p>
        </>
      )}
    </div>
  );
}

export default App;

