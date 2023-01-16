import React, { useEffect, useState, useRef } from 'react';
// import { useParams } from 'react-router-dom';
import add from '../Images/add.png';
import edit from '../Images/edit.png';
import print from '../Images/print.png';
import archive from '../Images/archive.png';
import view from '../Images/view.png';
//for data
import { Header } from '../components';
import { NavLink } from 'react-router-dom';
import { Button } from '@material-tailwind/react';
import { Modal, Input, Select, notification, Space, Table } from 'antd';
import type { ColumnsType, TableProps } from 'antd/es/table';
//for database
import Axios from "axios";
import { FiEdit3 } from 'react-icons/fi';
import { BiArchiveIn } from 'react-icons/bi';
import mainApi from '../contexts/Api';

const { Option } = Select;

const openNotif = (type) => {
  if(type === 'success'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Employee Added Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'warning'){
    notification[type]({
      message: 'SUCCESS!',
      description: 'Employee Removed Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else if(type === 'error'){
    notification[type]({
      message: 'ERROR!',
      description: 'There was an error executing the command.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }else{
    notification[type]({
      message: 'SUCCESS!',
      description: 'Employee Updated Successfully.',
      duration: 4,
      style: {borderRadius: '5px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2), 0 6px 20px 0 rgba(0, 0, 0, 0.19)'},
    });
  }
  
};

const EmployeeAccount = () => {

  const [count, setCount] = useState(0);
  const resetSelect = useRef();
  const [message, setMessage] = useState('');
  const [message2, setMessage2] = useState('');
  const [inpStat, setInpStat] = useState('');
  const [selStat, setSelStat] = useState('');
  const [brandName, setbrandName] = useState('');
  const [status, setStatus] = useState('Employee Status');
  const [employeeList, setEmployeeList] = useState([]);
  const [bID, setBID] = useState('');

  //For Search

  //For Modal
  const [modal, setModal] = useState({Title: '', Visible: false, });
  const [btnType, setBtnType] = useState('');
  
  //For Add Modal
  const showAddModal = () => {
    setBtnType('Add');
    setModal({Title: 'Add Employee', Visible: true});
  };
  
  const handleOk = () => {
    setModal({Visible: false});
    setMessage('');
    setMessage2('');
    setInpStat('');
    setSelStat('');
    setbrandName('');
    setStatus('Select Status');
  };
  
  //For Edit Modal
  const showUpdateModal = () => {
    setBtnType('Update');
    setModal({Title: 'Update Employee', Visible: true});
  };

  //pag load ng page at show ng data sa table
  useEffect(() => {
    let abortController = new AbortController();
    Axios.get(`${mainApi}/api/employee/get`).then((response)=>{
      setEmployeeList(response.data);
      setCount(() => count * 0)
    });
    
    return () => {  
      abortController.abort();  
    }
  }, [count]);


  //pag add and update ng data
  const handleSubmit = () => {
    if(btnType === 'Add'){
      // if(brandName.trim().length === 0){
      //   setMessage('Please enter employee!');
      //   setInpStat('error');
      // }
      // else if(status === "Select Status"){
      //   setMessage2('Please choose status!');
      //   setSelStat('error');
      // }
      // else{
      //   Axios.post('${mainApi}/api/employee/insert', {
      //     BrandName: brandName,
      //     Status: status
      //   }).then(() => {
      //     console.log('Data updated successfully');
      //   }).catch((err) => {
      //     alert(err.response.data);
      //   });
  
      //   openNotif('success');
      //   handleOk();
      //   setCount(() => count + 1);
      // }
    }else if(btnType === 'Update'){

      //code for update
      Axios.put(`${mainApi}/api/employee/update/${bID}`, {
        BrandName: brandName,
        Status: status
      }).then(() => {
        console.log('Data updated successfully');
      }).catch((err) => {
        alert(err.response.data);
      });

      openNotif('info');
      handleOk();
      setCount(() => count + 1);
    }
  };


  //pag show ng data para sa update
  const showDataToModal = (brandID) => {
    Axios.get(`${mainApi}/api/employee/get/${brandID}`).then((resp)=>{
        setbrandName(resp.data.Brand_Name);
        setStatus(resp.data.Status);
        setBID(brandID);
      });
      setCount(() => count + 1)
      showUpdateModal();
  }

  //pag remove ng employee
  const removeBrand = (brandID) => {
    if(window.confirm('Are you sure that you wanted to delete this employee?')){
      Axios.delete(`${mainApi}/api/employee/remove/${brandID}`);
      openNotif('warning');
      setCount(() => count + 1)
    }
  }

  //For the column of the table
    interface DataType {
      key: React.Key;
      brand_name: string;
      status: string;
    }

    const employeeTblGrid: ColumnsType<DataType> = [
      {
        title: 'Employee Username',
        dataIndex: 'userUsername',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Employee Name',
        dataIndex: 'userName',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Contact',
        dataIndex: 'userContact',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      // {
      //   title: 'Total Amount',
      //   dataIndex: 'TotalAmount',
      //   defaultSortOrder: 'descend',
      //   align: 'center',
      //   // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
      //   sortDirections: ['descend', 'ascend'],
      //   render: (text, record) => {
      //     return <p style={{textTransform: 'capitalize'}}>{text}</p>
      //   }
      // },
      {
        title: 'Address',
        dataIndex: 'userAddress',
        align: 'center',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Role',
        dataIndex: 'userRoleID',
        align: 'center',
        defaultSortOrder: 'descend',
        // sorter: (a, b) => a.brand_name.localeCompare(b.brand_name),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          return <p style={{textTransform: 'capitalize'}}>{text}</p>
        }
      },
      {
        title: 'Status',
        dataIndex: 'userStatus',
        defaultSortOrder: 'descend',
        align: 'center',
        // sorter: (a, b) => a.status.localeCompare(b.status),
        sortDirections: ['descend', 'ascend'],
        render: (text, record) => {
          if (record.userStatus==="1"){
            return <p style={{color:'green', textTransform: 'capitalize'}}>Active</p>
          } 
          if (record.userStatus ==="0"){
            return <p style={{color:'red', textTransform: 'capitalize'}}>Inactive</p>
          }
        }
      },
      {
        key: 'OrderID',
        dataIndex: 'userID',
        title: 'Actions',
        align: 'center',
        width: '120px',
        render:(_,record) =>
          <Space align='end'>
            {/* For Update */}
            <Button style={{backgroundColor: '#83D2FF'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-3 md:pl-3 sm:pr-2.5'>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 sm:mx-auto object-scale-down' src={edit}/>
            </Button>

            {/* For View */}
            <Button style={{backgroundColor: '#46E4AC'}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto -mr-3 w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={()=> {
                // showDataToModal(record.OrderID);
            }}>
              <img className='w-auto h-5 sm:w-auto md:w-10 md:h-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={view}/>
            </Button>

            {/* For Archive */}
            <Button style={{backgroundColor: "#ED5264", marginLeft: 12}} className='text-black py-1 pl-2.5 pr-0 h-9 rounded inline-flex items-center my-auto w-10 sm:w-10 md:w-10 md:p-0 sm:pr-2.5' onClick={() => {
                // removeBrand(record.BrandID);
            }}>
              <img className='w-auto h-5 sm:w-auto md:w-5 mr-2 sm:mr-0 md:mx-auto sm:mx-auto object-scale-down' src={archive}/>
            </Button>
          </Space>
      },
    ];

    // post the data from db to the table
    const EmpList = employeeList.map(({body,...item}) => ({
      ...item,
      key: item.userID,
      message: body,
    }))


    const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
      console.log('params', pagination, filters, sorter, extra);
    };

  return (
    <div className='md:m-10 mt-20 mx-8'>
      <Header title='Accounts'/>

        <div className='m-2 md:m-10 p-2 md:px-10 pb-5 bg-white rounded-xl shadow-md'>

          <div className='flex w-full h-12 mt-2'>
            <p className='my-auto w-auto sm:w-34 md:w-72 px-4 font-bold'>Employees</p>

             <div className='relative w-full'>
              <div className='absolute right-0 w-34'>
                
              <Button onClick={showAddModal} type='button' size='sm' style={{backgroundColor: '#83D2FF'}} className='hover:bg-blue-400 text-black py-1 pl-2 pr-0 h-10 rounded inline-flex items-center my-1 mr-3 w-10 sm:w-10 md:w-auto md:p-4'>
                  <img alt='' className='w-auto h-6 sm:w-auto md:w-6 mr-2 sm:mr-0 md:mr-2 sm:mx-auto object-scale-down' src={add}/>
                  <p className='invisible text-sm font-semibold md:visible lg:flex sm:invisible'>Add Employee</p>
                </Button>

              </div>
            </div> 
          </div>  
          
          <div style={{borderColor: "#747C95"}} className=" w-full my-5 border-b-2 rounded"></div>
          
          {/* For search bar */}
          {/* <div className='relative w-full'>
            <div className='absolute right-0 mt-1'>
                <Input.Group compact className='-right-4 md:-right-16 sm:-right-6'>
                  <Select placeholder='Column' style={{ border: 'none' }} onChange={(e) => setSearch({term: search.term,type: e})} value={search.type}>
                    <Option value="Brand">Brand</Option>
                    <Option value="Status">Status</Option>
                  </Select>
                  <Input.Search style={{ width: '50%', fontSize: '16', border: 'none' }} className='inline-block items-center' placeholder='Search...' onSearch={onSearch} onChange={(event) => {setSearch({term: event.target.value, type: search.type})}}/>
                </Input.Group>
            </div>
          </div> */}

            <Modal title={modal.Title} visible={modal.Visible} onOk={handleOk} onCancel={handleOk}
                  footer={[
                    <Button key="submit" size='sm' style={{backgroundColor: '#14D89A'}} className="w-20 mr-4" type="primary" onClick={handleSubmit}>{btnType}</Button>,
                    <Button key="back" size='sm' style={{backgroundColor: '#ED5264'}} className='rounded' onClick={handleOk}>Cancel</Button>,
                  ]}>

                  <div className='flex flex-col gap-4'>
                  <p className='ml-5'>User Employee Informations</p>
                    <div>
                      <Input className='rounded-sm' value={ ''} placeholder="Employee Name"
                        onChange={(e) => {
                            //setcategoryName(e.target.value);
                            
                        }} status={inpStat}/>
                    </div>

                    <div>
                      <Input className='rounded-sm' value={ ''} placeholder="Employee Contact"
                        onChange={(e) => {
                            //setcategoryName(e.target.value);
                            
                        }} status={inpStat}/>
                    </div>

                    <div>
                      <Input className='rounded-sm' value={ ''} placeholder="Employee Address"
                        onChange={(e) => {
                            //setcategoryName(e.target.value);
                            
                        }} status={inpStat}/>
                    </div>

                    <div>
                      <Input className='rounded-sm' value={ ''} placeholder="Employee Role"
                        onChange={(e) => {
                            //setcategoryName(e.target.value);
                            
                        }} status={inpStat}/>
                    </div>
                    <div>
                      <p className='ml-5'>User Employee Credentials</p>
                    </div>
                    <div>
                      <Input className='rounded-sm' value={ ''} placeholder="Employee Username"
                        onChange={(e) => {
                            //setcategoryName(e.target.value);
                            
                        }} status={inpStat}/>
                    </div>

                    <div>
                      <Input className='rounded-sm' type="password" value={ ''} placeholder="Employee Password"
                        onChange={(e) => {
                            //setcategoryName(e.target.value);
                            
                        }} status={inpStat}/>
                        <Checkbox >Reset?</Checkbox>
                    </div>

                    

                    <div>
                      
                      <Select className='w-full rounded-sm' placeholder="Employee Status" value={status}
                      onChange={(value) => {
                          //setStatus(value);
                      }} status={selStat} ref={resetSelect}>
                        <Option value="active">Active</Option>
                        <Option value="inactive">Inactive</Option>
                      </Select>
                    </div>
                  </div>
                </Modal>

          {/* For Table */}
          <div className='m-2 my-auto bg-white rounded overflow-auto'>
            <Table bordered className='mt-14' columns={employeeTblGrid} dataSource={EmpList} onChange={onChange}></Table>
          </div>

        </div>
    </div>
  )
}

export default EmployeeAccount