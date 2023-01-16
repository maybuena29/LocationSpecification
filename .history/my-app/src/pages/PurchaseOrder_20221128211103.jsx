import React,{useState,useEffect} from 'react';
import add from '../Images/add.png';
import impExcel from '../Images/import.png';
import edit from '../Images/edit.png';
import archive from '../Images/archive.png';
import medLogo from '../Images/corumed_med_logo.png'
import print from '../Images/print.png';
import view from '../Images/view.png';
import { Header } from '../components';
import { NavLink,Link, useNavigate } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import  Axios  from 'axios';
import {Modal, Space,Table,notification, Input, Select, Image, Tabs} from 'antd';
import moment from 'moment';
import mainApi from '../contexts/Api';
import ReactToPrint from 'react-to-print';
import { ViewPurchaseOrder } from '.';

const { TextArea } = Input;
const { Option } = Select;
const TabPane = Tabs.TabPane;

const PurchaseOrder = () => {

  //For Purchase Order
  const [count, setCount] = useState(0);
  const [poNumber, setPoNumber] = useState(0);
  const [poSupplier, setPoSupplier] = useState('');
  const [poDeliveryDate, setPoDeliveryDate] = useState('');
  const [poStatus, setPoStatus] = useState('');
  const [purchaseOrderList, setPurchaseOrderList] = useState([]);
  const [viewModal, setViewModal] = useState(false);
  const [poID, setPOID] = useState('');
  const navigate = useNavigate();
  const [searchVal, setSearchVal] = useState('');

  const abortController = new AbortController();

  const retrievedDeliveryDate = moment(poDeliveryDate).format("YYYY-MM-DD");

  const openNotificationWithIconDelete = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Purchase Order Deleted Successfully.",
      duration: 2,
    });
  };

  const deleteButton = (poID)=>{
    if(window.confirm("Are you sure to delete this purchase order?")){
      Axios.delete(`${mainApi}/api/purchaseorder/remove/${poID}`);
      openNotificationWithIconDelete("success");
    }
    setCount(() => count + 1);
  }

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
    const { data } = await Axios.get(`${mainApi}/api/purchaseorder/get`, {signal: abortController.signal}).catch((err)=>{
      if (err.response.status===403){
        navigate('/NotAuthorizedPage')
      }
      
    });
    setPurchaseOrderList(data);
  }

  //For Search
  const search = (data) => {
    return data.filter((item) =>
      item.PONumber.toString().toLowerCase().includes(searchVal) ||
      item.Supplier.toLowerCase().includes(searchVal) ||
      moment(item.PODelDate).format("YYYY-MM-DD").toString().toLowerCase().includes(searchVal) ||
      item.PORemarks.toLowerCase().includes(searchVal) ||
      item.POStatus.toLowerCase().includes(searchVal)
    )
  }

  const purchaseOrderGrid = [
    {
      dataIndex: 'PONumber',
      title: 'PO Number',
      align: 'Center',
      width: '20',
      sorter: (a, b) => a.PONumber.localeCompare(b.PONumber),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
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
      dataIndex: 'PODelDate',
      title: 'Delivery Date',
      width: '200',
      align: 'Center',
      sorter: (a, b) => moment(a.PODelDate).unix() - moment(b.PODelDate).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
      }
    },
    { 
      dataIndex: 'PORemarks',
      title: 'Remarks',
      width: '200',
      align: 'Center',
      sorter: (a, b) => a.PORemarks.localeCompare(b.PORemarks),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{text}</p>
      }
    },
    { 
      dataIndex: 'PODateCreated',
      title: 'Date Created',
      width: '200',
      align: 'Center',
      sorter: (a, b) => moment(a.PODateCreated).unix() - moment(b.PODateCreated).unix(),
      render: (text, record) => {
        return <p style={{textTransform: 'capitalize'}}>{moment(text).format("YYYY-MM-DD")}</p>
      }
    },
    {
      title: 'Status',
      dataIndex: 'POStatus',
      align: 'center',
      width: '150',
      sorter: (a, b) => a.POStatus.localeCompare(b.POStatus),
      render: (text, record) => {
        return <p style={{color: record.POStatus === 'completed' ? 'green': '#8A8A8A', textTransform: 'capitalize'}} className='font-semibold'>{text}</p>
      }
    },
    {
      title: 'Actions',
      dataIndex: 'purchaseID',
      key: 'purchaseID',
      width: '150',
      align: 'Center',
      render:(_,record) =>
        <Space align='end'>
          {record.POStatus === 'completed'? <></> :
            <Link to={`/inventory/purchase_order/add_purchase_order/${record.PONumber}`}>
              <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
                <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 sm:mx-auto' src={edit}/>
              </Button>
            </Link>
          }
          {/* <Link to={`/inventory/purchase_order/view_purchase_order/${record.PONumber}`}> */}
            <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
                setViewModal(true);
                setPOID(record.PONumber);
                setCount((c) => c + 1);
              }}>
              <img className='object-scale-down w-auto h-5 mr-2 sm:w-auto md:w-10 md:h-5 sm:mr-0 md:mx-auto sm:mx-auto' src={view}/>
            </Button>
          {/* </Link> */}
        </Space>
      
    },
  ];

  const poList = purchaseOrderList.map(({body,...item}) => ({
    ...item,
    key: item.purchaseID,
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
    setPOID('');
  };

  return (
    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Supplier Transaction'/>

        <div className='p-2 pb-5 m-2 bg-white shadow-md md:m-10 md:px-10 rounded-xl'>

          <div className='flex w-full h-12 mt-2'>
            <p className='w-auto px-4 my-auto font-bold sm:w-34 md:w-72'>Purchase Order</p>

            <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={'/inventory/purchase_order/add_purchase_order'}>
                  <Button type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 mr-3 text-black rounded hover:bg-blue-400 sm:w-10 md:w-auto md:p-4'>
                    <img className='object-scale-down w-auto h-6 mr-2 sm:w-auto md:w-6 sm:mr-0 md:mr-2 sm:mx-auto' src={add}/>
                    <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add</p>
                  </Button>
                </NavLink>

              </div>
            </div>
          </div>
          
          <div style={{borderColor: "#747C95"}} className="w-full my-5 border-b-2 rounded "></div>

          <div className='m-2 my-auto overflow-auto bg-white rounded'>
            <div className='flex flex-auto w-full mb-10 md:mb-0 sm:mb-10'>
              <div className='relative w-full'>
                <div className='absolute right-0 mt-1 mr-4'>
                  <Input style={{ fontSize: '16' }} className='w-full z-20 mr-3.5 items-center font-poppins' placeholder='Search...'
                  onChange = {(e) => {setSearchVal(e.target.value)}}
                  value={searchVal}
                  />
                </div>
              </div>
            </div>
            <Tabs defaultActiveKey="0" className='w-auto'>
              <TabPane tab='Pending' key='0'>
                <div className="flex items-center justify-center w-full overflow-auto min-w-screen">
                    <Table bordered className='mt-14' columns={purchaseOrderGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(poList).filter((data) => data.POStatus === 'pending')}className='w-full'></Table>
                </div>
              </TabPane>
              <TabPane tab='Back Order' key='1'>
                <div className="flex items-center justify-center w-full overflow-auto min-w-screen">
                    <Table bordered className='mt-14' columns={purchaseOrderGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(poList).filter((data) => data.POStatus === 'back order')}className='w-full'></Table>
                </div>
              </TabPane>
              <TabPane tab='Completed' key='2'>
                <div className="flex items-center justify-center w-full overflow-auto min-w-screen">
                    <Table bordered className='mt-14' columns={purchaseOrderGrid} pagination={{ defaultPageSize: 10, showSizeChanger: true, pageSizeOptions: ['10', '25', '50', '100']}} dataSource={search(poList).filter((data) => data.POStatus === 'completed')}className='w-full'></Table>
                </div>
              </TabPane>
            </Tabs>

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
            <ViewPurchaseOrder data={poID}/>
          </div>
        </Modal>

    </div>
  )
}

export default PurchaseOrder