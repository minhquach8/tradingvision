import React from 'react';
import Banner from "../../components/banner/Banner"
import StockExchange from '../../components/stockexchange/StockExchange';



const Homepage = ({user}) => {


  return <>
    <Banner/>
    <StockExchange user={user}/>
  </>
};

export default Homepage;