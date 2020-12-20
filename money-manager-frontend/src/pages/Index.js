import React, { useRef } from 'react';
import NavBar from '../components/NavBar/NavBar';
import ModalForm from '../components/ModalForm/ModalForm';
import Login from '../components/Login/Login';
import RegistrationForm from '../components/RegistrationForm/RegistrationForm';
import 'antd/dist/antd.css';

const Index = props => {
  const childRef = useRef();

  return (
    <>
      <NavBar onClick={() => { childRef.current.showModal() }}/>
      <div id='welcome-container'>
        <h1 id='welcome-text'>Money Manager</h1>
        <ModalForm 
        title={'Sign Up'} 
        form={<RegistrationForm />} 
        button={true}
        style1={true}
        des='Sign Up'
        />
      </div>
      <ModalForm 
        ref={childRef} 
        title={'Login'} 
        form={<Login 
        setRole={props.setRole}/>} 
        button={false}
      />
    </>
  );
}

export default Index;