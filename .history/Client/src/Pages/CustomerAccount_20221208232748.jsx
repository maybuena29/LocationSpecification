import { Axios } from 'axios';
import { React, useState, useContext } from 'react';
import { Row, Col, Tab, Tabs, Image } from 'react-bootstrap';
import profileIcon from '../images/profileIcon.png';
import { AuthContext } from './ContextFiles/AuthContext';
import './css/CustomerAccount.css';


const CustomerAccount = () => {


    const [key, setKey] = useState('profile');
    const { user, verify, setLoginStatus, isLoggedIn } = useContext(AuthContext)
    console.log(user)


    return (
        <div className='bg-white account-section'>

            <center><Image src={profileIcon} height='200px' width='200px' ></Image></center>
            <Row>
                <Col>
                    <center>
                        <h1>{user.CustName}</h1>
                        <hr className='customer-red-line' />
                    </center>
                </Col>
                <Tabs id='controlled-tab' activeKey={key} onSelect={(k) => setKey(k)} fill>
                    <Tab eventKey="profile" title="Profile" className='p-5'>
                        <div className='text-center'>
                            <h3>Customer Code: {user.CustCode}</h3>
                            <h3>Full Name: {user.CustName}</h3>
                            <h3>Address:{user.CustAddress}</h3>
                            <h3>Contact: {user.CustContact}</h3>
                            <h3>Email: {user.CustEmail}</h3>
                        </div>
                    </Tab>
                </Tabs>
            </Row>
        </div>
    );
}

export default CustomerAccount;