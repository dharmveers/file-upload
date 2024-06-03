import logo from './logo.svg';
import './App.css';
import { useEffect, useState } from 'react';
import axios from 'axios';
import RegisterForm from './component/RegisterForm';
import RichTextEditor from './component/RichTextEditor';

function App() {
const [image, setImage]=useState()

  useEffect(()=>{
   const  upload=async ()=>{
     await axios.get("http://localhost:8000/download")
      .then(res=>{
        console.log(res.data)
        setImage('data:image/jpeg;base64,' + res.data)
      })
        .catch(err=>console.log(err))
    }
    upload()
  },[])

  return (
    <div className='App'>
        <RegisterForm/>
        {/* <RichTextEditor/> */}
    </div>
  );
}

export default App;
