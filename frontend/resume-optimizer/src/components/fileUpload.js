import React,{useState} from 'react';
import axios from 'axios';

const FileUpload = () => {
 
    const [resume, setResume] = useState(null);
    const [responseData, setResponseData] = useState(null);
    
    
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
                    setResponseData(res.data);
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

        {console.log(responseData)}
        <div className="Job openings">
           
        <div>
        {responseData && Object.keys(responseData[0]).map((key) => {
          return (
            <div key={key}>
              <h2>{key}</h2>
              {responseData[0][key].map((value) => {
                return (
                  <div key={value['Job Id']}>
                    <h3>{value['Job Title']}</h3>
                    <a href={value['Job Description']}>Job Description</a>
                  </div>
                )
              })}
            </div>
          )
        })}
      </div>
        </div>
      </div>
    );

}

export {FileUpload}