import React, { useState } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import CopyToClipboard from 'react-copy-to-clipboard';
import { Button, Modal } from 'react-bootstrap';
import axios from 'axios';

const TinyMCEEditor = ({ value, onChange }) => {
    const api_key=process.env.REACT_APP_API_KEY;
    const [show, setShow] = useState(false);
    const [data,setData] = useState();
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const[selectedFile,setSelectedFile]=useState(null);

    const handleEditorChange=()=>{

    }
    const handleImageUpload=(blobInfo)=>{
        return new Promise((resolve, reject) => {
          const formData = new FormData();
          formData.append('image', blobInfo.blob(), blobInfo.filename());
         
          const config = {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          };
          axios.post("http://localhost:8000/upload/image", formData, {
            ...config,
            responseType: 'json'
          })
          .then(response => {
            if (response && response.data) {
              const imageData = response.data;
              const imageUrl = imageData.src;
              resolve(imageUrl);
            } else {
              reject("Image upload failed");
            }
          })
          .catch(error => {
            reject("Image upload failed");
          });
        });
    
      }

    const handleFileUpload=()=>{
        if(!selectedFile){
          return;
        }
        const formData = new FormData();
        formData.append('multipartFile', selectedFile);
    
        axios.post("http://localhost:8000/upload", formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }).then(response=>setData(response.data))
        .catch(err=>alert(err))
      }

  return (
    <>
    <Editor
      initialValue={value}
      apiKey={api_key}
      init={{
        height: 300,
        menubar: false,
        plugins: [
          "advlist",
          "autolink",
          "lists",
          "link",
          "image",
          "charmap",
          "preview",
          "anchor",
          "searchreplace",
          "visualblocks",
          "code",
          "fullscreen",
          "insertdatetime",
          "media",
          "table",
          "code",
          "help",
          "wordcount",
          "image",
          "docupload",
          "codesample",
          "link",
          "emoticons",
          "quickbars",
          "insertdatetime",
          "save",
        ],
        toolbar:
          "undo redo | blocks fontfamily fontsize | " +
          "bold italic forecolor image table tabledelete | tableprops tablerowprops tablecellprops | tableinsertrowbefore tableinsertrowafter tabledeleterow | tableinsertcolbefore tableinsertcolafter tabledeletecol | alignleft aligncenter " +
          "alignright alignjustify align lineheight | save insertdatetime emoticons link docupload codesample media searchreplace bullist numlist outdent indent visualblocks preview | " +
          "removeformat | help| code charmap fullscreen",
        images_upload_handler: handleImageUpload,
        link_context_toolbar: true,
        content_style:
          "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
        setup: function(editor){
          editor.on("change", () => {
            handleEditorChange(editor.getContent(), editor); // Pass both content and editor object
          });
          editor.ui.registry.addButton('docupload', {
            icon: 'new-document', // You need to use the correct icon name
            tooltip: "Insert Document",
            onAction: function (){
              // Here, you can define the action for the button, such as opening a file picker dialog
              handleShow();
            }
          });
        },
      }}
      onEditorChange={onChange}
    />
    <Modal show={show} onHide={handleClose} style={{zIndex:"99999"}}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        {data ?
        <div className='mb-3'>
        {data}
        <CopyToClipboard text={data}><Button>copy</Button></CopyToClipboard>
        </div>
        :
          <div class="mb-3">
          <label for="formFile" class="form-label">Select Document File</label>
          <input class="form-control" type="file" id="formFile" onChange={(e)=>setSelectedFile(e.target.files[0])}/>
        </div>
        }
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleFileUpload}>
            Upload
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default TinyMCEEditor;
