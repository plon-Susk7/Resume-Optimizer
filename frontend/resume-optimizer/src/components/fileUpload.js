import React,{useState} from 'react';
import axios from 'axios';

const FileUpload = () => {

    const [resume, setResume] = useState(null);

    const handleFileChange = (e) => {
         setResume(e.target.files[0]);
    }

    const handleUpload =  () => {
         if(resume){
            const formData = new FormData();
            formData.append('resume', resume);

            try{
                axios.post('http://localhost:5000/predict', formData, {}) // API endpoint to classification prediction.
                .then(res=>{
                    console.log(res.data);
                })
                console.log('File uploaded successfully')
            }catch(error){
                console.log(error);
            }
         }else{
            console.log('No file selected');
         }
    }

    return (
      <div className="App">
        <input type="file" onChange={handleFileChange} accept='.pdf'/>
        <button onClick={handleUpload}>Upload</button>
      </div>
    );

}

export {FileUpload}