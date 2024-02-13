import React from 'react';
import {Form,Input,message} from 'antd';
import "../styles/RegisterStyles.css"
import axios from 'axios';
import { Link ,useNavigate} from 'react-router-dom';
import { useDispatch } from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice';


const Register = () => {
    const navigate=useNavigate();
    const dispatch = useDispatch();
    //form handler
    const onfinishHandler = async(values) => {
       try{
        dispatch(showLoading())
        const res=await axios.post(`/api/v1/user/register`,values)
        dispatch(hideLoading())
        if(res.data.sucess){
            message.success(`Register successfully!`)
            navigate("/login")
        }
       }catch(error){
        dispatch(hideLoading())
        console.log(error)
        message.error(`Something went wrong`)
       }
    }

  return (
    <>
    <div className="form-container">
        <Form layout="vertical" onFinish={onfinishHandler}>
            <h1>Register Form</h1>
            <Form.Item label="Name" name="name">
                <Input type="text"  required/>
            </Form.Item>
            <Form.Item label="Email" name="email">
                <Input type="email"  required/>
            </Form.Item>
            <Form.Item label="Password" name="password">
                <Input type="text"  required/>
            </Form.Item>
            <Link to="/login" className='m-2'>
            Already user login here
            </Link>
            <button className='btn btn-primary'
            type='submit'>
                Register
            </button>
        </Form>
    </div>
    </>
  );
};

export default Register; // Export Register as the default
