import React,{useState,useEffect} from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import medLogo from '../Images/corumed_med_logo.png'
import view from '../Images/view.png';
import print from '../Images/print.png';
import { Header } from '../components';
import { NavLink,Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import  Axios  from 'axios';
import {Modal, Space,Table,notification, Input, Select, Image, Tabs} from 'antd';
import moment from 'moment';
import mainApi from '../contexts/Api';
import ReactToPrint from 'react-to-print';
import { ViewAPInvoice } from '.';
const { TextArea } = Input;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const APInvoice = () => {

  //For Purchase Order
  const [count, setCount] = useState(0);
  const [poNumber, setPoNumber] = useState(0);
  const [poSupplier, setPoSupplier] = useState('');
  const [poDeliveryDate, setPoDeliveryDate] = useState('');
  const [poStatus, setPoStatus] = useState('');
  const [poNumberList, setPoNumberList] = useState([]);

  //For Goods Receipt
  const [grNumber, setGrNumber] = useState(0);
  const [dateDelivered, setDateDelivered] = useState('');
  const [grRemarks, setGrRemarks] = useState('');
  const [grStatus, setGrStatus] = useState('');
  const [goodsReceiptList, setGoodsReceiptList] = useState([]);

  //For Ap Invoice
  const [viewModal, setViewModal] = useState(false);
  const [invoiceNumber, setInvoiceNumber] = useState('');
  const [invoiceDate, setInvoiceDate] = useState('');
  const [apRemarks, setApRemarks] = useState('');
  const [apStatus, setApStatus] = useState('');
  const [apinvoiceList, setApInvoiceList] = useState([]);
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  const retrievedDeliveryDate = moment(poDeliveryDate).format("YYYY-MM-DD");

  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "AP Invoice Deleted Successfully.",
      duration: 2,
    });
  };

  const numberFormat = (value) =>
    new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'PHP'
  }).format(value);

  useEffect(() => {
    fetch()
    return () => {  
      abortController.abort();
    }
  }, []);

  const fetch = async () => {
    const { data } = await Axios.get(`${mainApi}/api/apinvoice/get`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
    setApInvoiceList(data);
  }

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.invoiceNumber.toString().toLowerCase().includes(searchVal) ||
      item.GRNumber.toString().toLowerCase().includes(searchVal) ||
      item.Supplier.toLowerCase().includes(searchVal) ||
      moment(item.DueDate).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      moment(item.invoiceDate).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      item.paymentMode.toLowerCase().includes(searchVal) ||
      item.Remarks.toLowerCase().includes(searchVal) ||
      item.Status.toLowerCase().includes(searchVal)
    )
  }

  const apInvoiceGrid = [
    {
      dataIndex: 'invoiceNumber',
      title: 'Invoice Number',
      align: 'Center',
      width: '20',
      sorter: (a, b) => a.invoiceNumber.localeCompare(b.invoiceNumber),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      dataIndex: 'totalAmount',
      title: 'Total Amoount',
      align: 'Center',
      width: '20',
      sorter: {
        compare: (a, b) => a.totalAmount - b.totalAmount
      },
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>₱{text}</p>
      }
    },
    {
      dataIndex: 'Supplier',
      title: 'Supplier',
      align: 'Center',
      width: '150',
      sorter: (a, b) => a.Supplier.localeCompare(b.Supplier),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'DueDate',
      title: 'Due Date',
      width: '200',
      align: 'Center',
      sorter: (a, b) => moment(a.DueDate).unix() - moment(b.DueDate).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
      }
    },
    { 
      dataIndex: 'invoiceDate',
      title: 'Invoice Date',
      width: '200',
      align: 'Center',
      sorter: (a, b) => moment(a.invoiceDate).unix() - moment(b.invoiceDate).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
      }
    },
    { 
      dataIndex: 'paymentMode',
      title: 'Payment Mode',
      width: '200',
      align: 'Center',
      sorter: (a, b) => a.paymentMode.localeCompare(b.paymentMode),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'Remarks',
      title: 'Remarks',
      width: '200',
      align: 'Center',
      sorter: (a, b) => a.Remarks.localeCompare(b.Remarks),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'Status',
      align: 'center',
      width: '150',
      sorter: (a, b) => a.Status.localeCompare(b.Status),
      render: (text, record) => {
        return <p style={{color: record.Status === 'success' ? 'green': '#8A8A8A', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'invoiceID',
      key: 'invoiceID',
      width: '150',
      align: 'Center',
      render:(_,record) =>
        <Space align='end'>
          {/* <Link to={`/inventory/accounts_payable/add_apinvoice/${record.invoiceNumber}`}> */}
            <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
                setCount((c) => c + 1);
                setInvoiceNumber(record.invoiceNumber);
                setViewModal(true);
              }}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mx-auto sm:mx-auto' src={view}/>
            </Button>
          {/* </Link> */}
        </Space>
      
    },
  ];

  const apList = apinvoiceList.map(({body,...item}) => ({
    ...item,
    key: item.invoiceID,
    message: body,
  }))
  
  //For Print
  let componentRef = null;
  const setComponentRef = (ref) => {
    componentRef = ref;
  };

  const reactToPrintContent = () => {
    return componentRef;
  };

  const pageStyle = `
    @page {
      size: 8.5in 11in;
      margin: 100px;
    }

    @media all {
      .pagebreak {
        display: auto;
      }
    }

    @media print {
      .pagebreak {
        page-break-before: always;
      }
    }
  `;

  const handleCloseModal = () => {
    setViewModal(false);
    setInvoiceNumber('');
  };
  
  
  return (
    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Supplier Transaction'/>

      <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

        <div className='flex w-full h-12 mt-2'>
          <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>A/P Invoice</p>
          <div className='relative w-full'>
            <div className='absolute right-0 w-34'>
              
              <NavLink to={'/inventory/accounts_payable/add_apinvoice'}>
                <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                  <img className='object-scale-down w-auto h-6 mr-2 sm:w-auto md:w-6 sm:mr-0 md:mr-2 sm:mx-auto' src={add}/>
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                </Button>
              </NavLink>
            </div>
          </div>
        </div>
        
        <div style={{borderColor: "#747C95"}} className="w-full my-5 border-b-2 rounded "></div>

        <div className='relative w-full'>
          <div className='absolute right-0 mt-1 mr-2'>
                <Input style={{ fontSize: '16' }} className='w-full mr-3.5 items-center font-poppins' placeholder='Search...'
                onChange = {(e) => {setSearchVal(e.target.value)}}
                value={searchVal}
                />
          </div>
        </div>

        <div className='m-2 my-auto overflow-auto bg-white rounded'>
          <Table bordered className='mt-14' columns={apInvoiceGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(apList)}></Table>
        </div>

      </div>

      <Modal title={'PO Overview'} visible={viewModal} onOk={handleCloseModal} onCancel={handleCloseModal} width={1000} style={{ top: 30 }}
        footer={[
          <ReactToPrint key='print'
            trigger = {() => {
              return(
                <Button className='inline-flex items-center w-auto my-auto mb-4 text-black rounded' style={{backgroundColor: "#83D2FF", borderRadius: 5}}>
                  <img className='object-scale-down w-auto h-5 mr-2 md:mr-2 sm:mx-auto' src={print}/>
                  <p className='font-semibold text-black'>Print</p>
                </Button>
              )
            }}
            pageStyle={pageStyle}
            content={reactToPrintContent}
          />,
        ]}>
        <div className='flex flex-col gap-3 p-3' ref={setComponentRef}>
          <ViewAPInvoice data={invoiceNumber}/>
        </div>
      </Modal>
    </div>
  )
}

export default APInvoice