import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useState } from "react"
import axios from "axios"
import Navbar from './component/Navbar';


function App() {

  const [state, setState] = useState({selectedFile: null,fileUploadedSuccessfully: false})


  const onFileChange = (event) => {
    setState({ selectedFile: event.target.files[0] });
  }
  
  const onFileUpload = () => {
    const formData = new FormData();
    formData.append(
      "demo file",
      state.selectedFile,
      state.selectedFile.name
    )

    // Call api
    axios.post("https://4yxzp6cwg2.execute-api.us-east-1.amazonaws.com/fileUploaderFunction", formData).then(()=>{
      setState({selectedFile: null});
      setState({fileUploadedSuccessfully: true});
    })

    // console.log(formData)
  }

  function FileData(){
    if (state.selectedFile) {
      return (
        <div>
          <h2>File Details:</h2>
          <div className='d-flex flex-column align-items-start'>
          <p><span className='text-success fs-4'>File Name:</span> {state.selectedFile.name}</p>
          <p><span className='text-success fs-4'>File Type:</span> {state.selectedFile.type}</p>
          <p><span className='text-success fs-4'>Last Modified:</span> {" "}
            {state.selectedFile.lastModifiedDate.toDateString()}
          </p>
          </div>
        </div>
      )
    } else if (state.fileUploadedSuccessfully) {
      return (
        <div>
          <br />
          <h4>Your file has been successfully uploaded.</h4>
        </div>
      )
    } else{
      return(
        <div>
          <br />
          <h4>Choose a file and then press the upload button</h4>
        </div>
      )
    }
  }


  return (
    <div className="App" style={{backgroundColor: '#c6c6c6', height: "100vh"}}>
      <Navbar />
      <h4 className='mt-2'>Select a file to upload to Amazon S3</h4>
      <div className='border border-2'>
        <input className='input' type="file" onChange={onFileChange} />
        <button className='btn btn-success rounded-0' onClick={onFileUpload}>Upload</button>
      </div>
      <hr />
      <FileData />
    </div>
  );
}

export default App;
