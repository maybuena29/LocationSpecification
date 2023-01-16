import React, { useEffect, useState } from 'react'
import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs';
import { GoListOrdered, GoPrimitiveDot } from 'react-icons/go';
import  { earningData, SparklineAreaData, ecomPieChartData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import { Header } from '../components';
import mInfo from '../Images/moreInfoBlack.png';
import navArrow from '../Images/navArrow.png';
import earnIcon from '../Images/earning.png';
import { Area, Bar, Column, Line, measureTextWidth, Pie } from '@ant-design/plots';
import { NavLink } from 'react-router-dom';
import { Badge, Calendar, Popover, Table, Tabs } from 'antd';
import { Button } from '@material-tailwind/react';
import Axios from 'axios';
import moment from 'moment';
import { FaCoins, FaJediOrder } from 'react-icons/fa';
import { FiBarChart } from 'react-icons/fi';
import { MdOutlineInventory2, MdOutlineSupervisorAccount } from 'react-icons/md';
import { BiReceipt } from 'react-icons/bi';
import { GiTwoCoins } from 'react-icons/gi';
import mainApi from '../contexts/Api';

const TabPane = Tabs.TabPane;

const ProductReports = () => {

  // const [expiryList, setExpiryList] = useState([]);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalExpired, setTotalExpired] = useState(0);
  const [totalExpense, setTotalExpense] = useState(0);
  const [totalSales, setTotalSales] = useState(0);
  const [totalStocks, setTotalStocks] = useState(0);
  const [dailyTopEarning, setDailyTopEarning] = useState([]);
  const [weeklyTopEarning, setWeeklyTopEarning] = useState([]);
  const [monthlyTopEarning, setMonthlyTopEarning] = useState([]);
  const [yearlyTopEarning, setYearlyTopEarning] = useState([]);
  const [brandSales, setBrandSales] = useState([]);
  const [categorySales, setCategorySales] = useState([]);
  const [dailyOrders, setDailyOrders] = useState([]);
  const [weeklyOrders, setWeeklyOrders] = useState([]);
  const [monthlyOrders, setMonthlyOrders] = useState([]);
  const [yearlyOrders, setYearlyOrders] = useState([]);
  const [salesType, setSalesType] = useState('Daily');
  const [orderType, setOrderType] = useState('Daily');
  const [topTotalOrder, setTopTotalOrders] = useState([]);
  const [totalProductPerCateg, setTotalProductPerCateg] = useState([]);

  const abortController = new AbortController();

  useEffect(() => {
    fetchDailySales();
    fetchWeeklySales();
    fetchMonthlySales();
    fetchYearlySales();
    fetchTotalProducts();
    fetchTotalExpense();
    fetchTotalSales();
    fetchTotalStocks();
    fetchTotalOrders();
    fetchTotalExpired();
    fetchDailyOrders();
    fetchWeeklyOrders();
    fetchMonthlyOrders();
    fetchYearlyOrders();
    fetchTotalProdPerCategory();
    return () => {  
      abortController.abort();
    }
  }, [])

  const fetchDailySales = () => {
    fetch(`${mainApi}/api/reports/get/itemsales/daily/data`)
      .then((response) => response.json())
      .then((json) => setDailyTopEarning(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const fetchWeeklySales = () => {
    fetch(`${mainApi}/api/reports/get/itemsales/weekly/data`)
      .then((response) => response.json())
      .then((json) => setWeeklyTopEarning(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const fetchMonthlySales = () => {
    fetch(`${mainApi}/api/reports/get/itemsales/monthly/data`)
      .then((response) => response.json())
      .then((json) => setMonthlyTopEarning(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const fetchYearlySales = () => {
    fetch(`${mainApi}/api/reports/get/itemsales/yearly/data`)
      .then((response) => response.json())
      .then((json) => setYearlyTopEarning(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const fetchTotalOrders = () => {
    fetch(`${mainApi}/api/reports/get/total/productorder/data`)
      .then((response) => response.json())
      .then((json) => setTopTotalOrders(json))
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };

  const fetchTotalProducts = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalproducts`, {signal: abortController.signal}).then((response)=>{
      setTotalProducts(response.data.TotalProducts);
    });
  }
  
  const fetchTotalExpense = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalexpenses`, {signal: abortController.signal}).then((response)=>{
      setTotalExpense(response.data.TotalExpense);
    });
  }
  
  const fetchTotalSales = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalsales`, {signal: abortController.signal}).then((response)=>{
      setTotalSales(response.data.TotalSales);
    });
  }
  
  const fetchTotalStocks = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalstocks`, {signal: abortController.signal}).then((response)=>{
      setTotalStocks(response.data.TotalStocks);
    });
  }
  
  const fetchTotalExpired = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalexpired`, {signal: abortController.signal}).then((response)=>{
      setTotalExpired(response.data.TotalQuantity);
    });
  }
  
  const fetchBrandSales = async () => {
    await Axios.get(`${mainApi}/api/reports/get/brand/sales/data`, {signal: abortController.signal}).then((response)=>{
      setBrandSales(response.data);
    });
  }
  
  const fetchCategorySales = async () => {
    await Axios.get(`${mainApi}/api/reports/get/category/sales/data`, {signal: abortController.signal}).then((response)=>{
      setCategorySales(response.data);
    });
  }
  
  const fetchDailyOrders = async () => {
    await Axios.get(`${mainApi}/api/reports/get/daily/orders/data`, {signal: abortController.signal}).then((response)=>{
      setDailyOrders(response.data);
    });
  }
  
  const fetchWeeklyOrders = async () => {
    await Axios.get(`${mainApi}/api/reports/get/weekly/orders/data`, {signal: abortController.signal}).then((response)=>{
      setWeeklyOrders(response.data);
    });
  }
  
  const fetchMonthlyOrders = async () => {
    await Axios.get(`${mainApi}/api/reports/get/monthly/orders/data`, {signal: abortController.signal}).then((response)=>{
      setMonthlyOrders(response.data);
    });
  }
  
  const fetchYearlyOrders = async () => {
    await Axios.get(`${mainApi}/api/reports/get/yearly/orders/data`, {signal: abortController.signal}).then((response)=>{
      setYearlyOrders(response.data);
    });
  }
  
  const fetchTotalProdPerCategory = async () => {
    await Axios.get(`${mainApi}/api/reports/get/totalproduct/category/data`, {signal: abortController.signal}).then((response)=>{
      setTotalProductPerCateg(response.data);
    });
  }

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  const productSales = {
    data: salesType === 'Daily'? dailyTopEarning : (salesType === 'Weekly'? weeklyTopEarning : (salesType === 'Monthly'? monthlyTopEarning : yearlyTopEarning)),
    xField: salesType === 'Daily'? 'Day' : (salesType === 'Weekly'? 'Week' : (salesType === 'Monthly'? 'Month' : 'Year')),
    yField: 'TotalSales',
    seriesField: 'ProductName',
    yAxis: {
      label: {
        formatter: (v) => `₱${(v / 1).toFixed(2)}`,
      },
      title: {
        text: 'Sales',
      },
    },
    xAxis: {
      label: {
        formatter: (v) => salesType === 'Weekly'? `Week ${v}` : `${v}`,
      },
      title: {
        text: salesType === 'Daily'? 'Day' : (salesType === 'Weekly'? 'Week' : (salesType === 'Monthly'? 'Month' : 'Year')),
      },
    },
    isGroup: true,
    columnStyle: {
      radius: [10, 10, 0, 0],
    },
    tooltip: {
      formatter: (data) => {
        return { name: data.ProductName, value: numberFormat(data.TotalSales) };
      },
    },
    legend: {
      position: 'top',
    },
    limitInPlot: true,
    smooth: true,
    animation: {
      appear: {
        animation: 'path-in',
        duration: 1000,
      },
    },
  };

  const tabChange = (key: string) => {
    console.log(key);
    console.log(salesType);
    if(key === '1'){
      setSalesType('Daily');
    }else if(key === '2'){
      setSalesType('Weekly');
    }else if(key === '3'){
      setSalesType('Monthly');
    }else{
      setSalesType('Yearly');
    }
  };

  function renderStatistic(containerWidth, text, style) {
    const { width: textWidth, height: textHeight } = measureTextWidth(text, style);
    const R = containerWidth / 2; // r^2 = (w / 2)^2 + (h - offsetY)^2

    let scale = 1;

    if (containerWidth < textWidth) {
      scale = Math.min(Math.sqrt(Math.abs(Math.pow(R, 2) / (Math.pow(textWidth / 2, 2) + Math.pow(textHeight, 2)))), 1);
    }

    const textStyleStr = `width:${containerWidth}px;`;
    return `<div style="${textStyleStr};font-size:90%;line-height:${scale < 1 ? 1 : 'inherit'};">${text}</div>`;
  }

  const topOrderConfig = {
    appendPadding: 10,
    data: topTotalOrder,
    angleField: 'TotalOrders',
    colorField: 'ProductName',
    radius: 1,
    innerRadius: 0.64,
    meta: {
      value: {
        formatter: (v) => `${v} ¥`,
      },
    },
    label: {
      type: 'inner',
      offset: '-50%',
      style: {
        textAlign: 'center',
      },
      autoRotate: false,
      content: '{value}',
    },
    statistic: {
      title: {
        offsetY: -4,
        offsetX: -10,
        customHtml: (container, view, data) => {
          const { width, height } = container.getBoundingClientRect();
          const d = Math.sqrt(Math.pow(width / 2, 2) + Math.pow(height / 2, 2));
          const text = data ? data.ProductName : 'Total Orders';
          return renderStatistic(d, text, {
            fontSize: 10,
          });
        },
      },
      content: {
        offsetY: 4,
        style: {
          fontSize: '32px',
        },
        customHtml: (container, view, datum, data) => {
          const { width } = container.getBoundingClientRect();
          const text = datum ? `${datum.TotalOrders}` : `${data.reduce((r, d) => r + d.TotalOrders, 0)}`;
          return renderStatistic(width, text, {
            fontSize: 32,
          });
        },
      },
    },
    interactions: [
      {
        type: 'element-selected',
      },
      {
        type: 'element-active',
      },
      {
        type: 'pie-statistic-active',
      },
    ],
  };

  const totalOrderTabChange = (key: string) => {
    console.log(orderType);
    if(key === '1'){
      setOrderType('Daily');
    }else if(key === '2'){
      setOrderType('Weekly');
    }else if(key === '3'){
      setOrderType('Monthly');
    }else{
      setOrderType('Yearly');
    }
  };

  const totalOrdersConfig = {
    data: orderType === 'Daily'? dailyOrders : (orderType === 'Weekly'? weeklyOrders : (orderType === 'Monthly'? monthlyOrders : yearlyOrders)),
    xField: orderType === 'Daily'? 'Day' : (orderType === 'Weekly'? 'Week' : (orderType === 'Monthly'? 'Month' : 'Year')),
    yField: 'TotalOrders',
    legend: {
      position: 'top-left',
    },
    yAxis: {
      title: {
        text: 'Total Order',
      },
    },
    xAxis: {
      label: {
        formatter: (v) => salesType === 'Weekly'? `Week ${v}` : `${v}`,
      },
      title: {
        text: orderType === 'Daily'? 'Day' : (orderType === 'Weekly'? 'Week' : (orderType === 'Monthly'? 'Month' : 'Year')),
      },
    },
    smooth: true,
    areaStyle: () => {
      return {
        fill: 'l(270) 0:#ffffff 0.5:#7ec2f3 1:#1890ff',
      };
    },
  };

  const totalProductinCategory = {
    data: totalProductPerCateg,
    xField: 'TotalProducts',
    yField: 'Category_Name',
    legend: {
      position: 'top-left',
    },
    xAxis: {
      label: {
        formatter: (v) => `${v}`,
      },
    },
    scrollbar: {
      type: 'vertical',
    },
    tooltip: {
      formatter: (data) => {
        return { name: data.Category_Name, value: data.TotalProducts + ' Products' };
      },
    },
    maxBarWidth: 40,
    barBackground: {
      style: {
        fill: 'rgba(0,0,0,0.1)',
      },
    },
    interactions: [
      {
        type: 'active-region',
        enable: false,
      },
    ],
  };

  return (
    <div className='mt-12 h-auto'>
      <div className='md:m-10 mt-20 mx-8'>
        <Header title='Product Reports'/>
      </div>
      <div className='flex flex-wrap lg:flex-nowrap justify-center lg:px-10'>
        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-blue-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{totalProducts || '0'}</p>
              <p className='font-medium text-blue-400 text-lg mt-5'>Total Products</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{backgroundColor: 'rgb(219, 240, 255)'}} className='text-blue-400 lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <BsBoxSeam />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-green-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5 z-50'>{totalStocks || '0'}</p>
              <p className='font-medium text-green-500 text-lg mt-5'>Total Stocks</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)'}} className='lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <MdOutlineInventory2 />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className='bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-36 rounded-lg w-full lg:w-1/3 p-5 pt-5 m-3 border-red-400 border-transparent border-l-4 shadow-lg overflow-hidden bg-no-repeat bg-cover bg-center'>
          <div className='flex justify-between items-center'>
            <div className='z-10'>
              <p className='text-2xl text-gray-700 font-semibold mt-5'>{totalExpired || '0'}</p>
              <p className='font-medium text-red-500 text-lg mt-5'>Total Expired Products</p>
            </div>
            <div className='relative w-auto'>
              <div className='absolute right-0 w-34 -bottom-5'>
                <button type='button' style={{color: 'rgb(255, 93, 108)', backgroundColor: 'rgb(255, 231, 237)'}} className='lg:text-3xl sm:text-4xl z-0 text-xl opacity-0.9 rounded-full p-4 hover:shadow-xl'>
                  <MdOutlineInventory2 />
                </button>
              </div>
            </div>
          </div>
        </div>

      </div>
      
      <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-3 flex flex-col justify-center lg:px-10 lg:gap-5'>

        <div className='w-auto col-span-2 mb-5 lg:mr-0 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Product Sales</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              {/* <Line {...config} /> */}
              <Tabs defaultActiveKey="1" className='w-full' onChange={tabChange} tabPosition='right' size='small'>
                <TabPane tab='Daily' key='1'>
                  <Column {...productSales} />
                </TabPane>
                <TabPane tab='Weekly' key='2'>
                  <Column {...productSales} />
                </TabPane>
                <TabPane tab='Monthly' key='3'>
                  <Column {...productSales} />
                </TabPane>
                <TabPane tab='Yearly' key='4'>
                  <Column {...productSales} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>

        <div className='w-auto col-span-1 mb-5 mr-5 lg:mr-0'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Top Products</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Pie {...topOrderConfig} />
            </div>
          </div>
        </div>

      </div>

      <div className='lg:grid lg:grid-flow-row-dense lg:grid-cols-4 -mt-16 flex flex-col justify-center lg:px-10 lg:gap-5'>

        <div className='lg:w-full w-auto col-span-2 mb-5 lg:mr-10 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Orders Overview</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Tabs defaultActiveKey="1" className='w-full' onChange={totalOrderTabChange} tabPosition='right' size='small'>
                <TabPane tab='Daily' key='1'>
                  <Area {...totalOrdersConfig} />
                </TabPane>
                <TabPane tab='Weekly' key='2'>
                  <Area {...totalOrdersConfig} />
                </TabPane>
                <TabPane tab='Monthly' key='3'>
                  <Area {...totalOrdersConfig} />
                </TabPane>
                <TabPane tab='Yearly' key='4'>
                  <Area {...totalOrdersConfig} />
                </TabPane>
              </Tabs>
            </div>
          </div>
        </div>

        <div className='lg:w-full w-auto col-span-2 mb-5 lg:mr-0 mr-5'>
          <div className='m-2 md:my-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md w-full'>
            <div className='flex w-full h-12 mt-2'>
              <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Total Product per Category</p>
            </div>
            <div style={{borderColor: "#747C95"}} className=" w-full mb-5 border-b-2 rounded"></div>
            <div className='my-auto bg-white w-full rounded p-0 overflow-scroll'>
              <Bar {...totalProductinCategory} />
            </div>
          </div>
        </div>

      </div>
    </div>  
  )
}

export default ProductReports