import axios from "axios";
import { useEffect, useRef, useState } from "react";
import TinyMCEEditor from "../helper/TinyMCEEditor";
import RichTextEditor from "../helper/RichTextEditor";

const RegisterForm=()=>{

    const[user,setUser]=useState({
        username:"",
        mobileNo:'',
        address:'',
        pdfFile:null
    })

    const[file,setFile]=useState();

    const handleOnSubmit=(e)=>{
        e.preventDefault();
        
        // const formData=new FormData();
        // formData.append('data',JSON.stringify(user));
        // formData.append('pdfFile',file);
        // axios.post('http://localhost:8000/upload',formData,{headers:{"Content-Type":"multipart/form-data"}}).then((resp)=>console.log(resp.data)).catch(error=>console.log(error))
    }
    const [editorContent, setEditorContent] = useState();
    const handleEditorChange=(content,editor)=>{
       setEditorContent(content);
    }

    const handleOnChange=(e)=>{
        setUser({...user,[e.target.name]:e.target.value});
       
    }
    return (
        <div style={{backgroundColor:"GrayText",height:"97vh"}}>
            <div className="container">
                
                <form action="" className="register-form p-1" onSubmit={handleOnSubmit}>
                    <h1 style={{textAlign:"center",fontSize:"30px"}}>Registration Form</h1>
                    <label htmlFor="username">UserName</label>
                    <input type="text" name="username" id="username"  onChange={handleOnChange}/>
                    
                    <label htmlFor="mobileNo">MobileNo</label>
                    <input type="text" name="mobileNo" id="mobileNo" onChange={handleOnChange}/>

                    <label htmlFor="address">Address</label>
                    <input type="text" name="address" id="address" onChange={handleOnChange}/>
                    
                    <label htmlFor="pdfFile">File</label>
                    <input type="file" name="pdfFile" id="pdfFile" onChange={(e)=>setFile(e.target.files[0])}/>
                    
                    <label htmlFor="pdfFile">Text Editor</label>
                   {/* <TinyMCEEditor value={editorContent} onChange={handleEditorChange} /> */}
                   <RichTextEditor/>
                  
                </form>
            </div>
        </div>
    )
}

export default RegisterForm;