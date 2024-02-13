import React from 'react'
import Layout from './../components/Layout'
import {Form, Row,Col, Input,TimePicker,message} from 'antd'; 
import { useSelector,useDispatch } from 'react-redux';
import {showLoading,hideLoading} from '../redux/features/alertSlice'
import axios from 'axios'
import {useNavigate } from 'react-router-dom';


const ApplyDoctor=()=> {
  //handle form
  const {user}=useSelector(state=>state.user)
  const dispatch=useDispatch()
  const navigate=useNavigate()
  //Handle form
  const handleFinish=async(values)=>{
    try{
      dispatch(showLoading())
      const res=await axios.post("/api/v1/user/applydoctor",{...values,userId:user._id},{
        headers:{
          Authorization:`Bearer ${localStorage.getItem('token')}`
        }
      })
      dispatch(hideLoading());
      if(res.data.success){
        message.success(res.data.success);
        navigate('/')
      }else{
        message.error(res.data.success)
      }
      
    }catch(error){
      dispatch(hideLoading());
      console.log(error)
      message.error('Something went wrong')
    }
  }
  return (
    <div>
        <Layout>
            <h1 className='text-center'>Apply Doctor</h1>
            <Form layout='vertical' onFinish={handleFinish} className='m-3'>
            <h4 className=''>Personal Details</h4>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="first Name" name="firstName" required rules={[{required:true}]}>
                    <Input type="text" placeholder='your name'/>
                  </Form.Item>
                  <Form.Item label="email" name="email" required rules={[{required:true}]}>
                    <Input type="text" placeholder='your email'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label="last Name" name="lastName" required rules={[{required:true}]}>
                    <Input type="text" placeholder='last name'/>
                  </Form.Item>
                  <Form.Item label="website" name="website" >
                    <Input type="text" placeholder='website'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label="contact number" name="phone" required rules={[{required:true}]}>
                    <Input type="text" placeholder='contact number'/>
                  </Form.Item>
                  <Form.Item label="address" name="address" required rules={[{required:true}]}>
                    <Input type="text" placeholder='address'/>
                  </Form.Item>
                </Col>

                <h4 className=''>Professional Details</h4>
              </Row>
              <Row gutter={20}>
                <Col xs={24} md={24} lg={8}>
                  <Form.Item label="Specialization" name="specialization" required rules={[{required:true}]}>
                    <Input type="text" placeholder='your specialization'/>
                  </Form.Item>
                  <Form.Item label="Timings" name="timings" required rules={[{required:true}]}>
                  <TimePicker.RangePicker />
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label="Experience" name="experience" required rules={[{required:true}]}>
                    <Input type="text" placeholder='your experience'/>
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}>
                <Form.Item label="Fee Per Consulatation" name="feePerConsultation" required rules={[{required:true}]}>
                <Input type="text" placeholder='your fee'/>
                    
                  </Form.Item>
                </Col>
                <Col xs={24} md={24} lg={8}></Col>
                <Col xs={24} md={24} lg={8}>
                <button className='btn btn-primary form-btn' type='submit'>
                  Submit
                </button>
                </Col>
              </Row>
                
            </Form>
        </Layout>
    </div>
  )
}

export default ApplyDoctor