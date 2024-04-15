import React,{useState} from 'react';
import axios from 'axios';

const FileUpload = () => {
  const temp  = [
    {'Data Science': [{'Job Id': 52429164, 'Job Title': 'Senior Data Scientist', 'Job Description': 'https://www.reed.co.uk/jobs/senior-data-scientist/52429164'}, {'Job Id': 52330000, 'Job Title': 'Lead Data Scientist', 'Job Description': 'https://www.reed.co.uk/jobs/lead-data-scientist/52330000'}, {'Job Id': 52329970, 'Job Title': 'Senior Data Scientist', 'Job Description': 'https://www.reed.co.uk/jobs/senior-data-scientist/52329970'}, {'Job Id': 52266434, 'Job Title': 'Senior Data Scientist', 'Job Description': 'https://www.reed.co.uk/jobs/senior-data-scientist/52266434'}, {'Job Id': 52421729, 'Job Title': 'Senior Data Scientist', 'Job Description': 'https://www.reed.co.uk/jobs/senior-data-scientist/52421729'}], 'Testing': [{'Job Id': 52288578, 'Job Title': 'Test Engineer', 'Job Description': 'https://www.reed.co.uk/jobs/test-engineer/52288578'}, {'Job Id': 52472282, 'Job Title': 'Lead Software Tester Agile - Technologist', 'Job Description': 'https://www.reed.co.uk/jobs/lead-software-tester-agile-technologist/52472282'}, {'Job Id': 52381585, 'Job Title': 'Electronic Test Engineer', 'Job Description': 'https://www.reed.co.uk/jobs/electronic-test-engineer/52381585'}, {'Job Id': 52470632, 'Job Title': 'QA Test Engineer', 'Job Description': 'https://www.reed.co.uk/jobs/qa-test-engineer/52470632'}, {'Job Id': 52260531, 'Job Title': 'RF test Engineer Radar', 'Job Description': 'https://www.reed.co.uk/jobs/rf-test-engineer-radar/52260531'}], 'Business Analyst': [{'Job Id': 51879889, 'Job Title': 'Business Analyst Trainee', 'Job Description': 'https://www.reed.co.uk/jobs/business-analyst-trainee/51879889'}, {'Job Id': 51879825, 'Job Title': 'Business Analyst Trainee', 'Job Description': 'https://www.reed.co.uk/jobs/business-analyst-trainee/51879825'}, {'Job Id': 51879551, 'Job Title': 'Business Analyst Trainee', 'Job Description': 'https://www.reed.co.uk/jobs/business-analyst-trainee/51879551'}, {'Job Id': 51883647, 'Job Title': 'Business Analyst Trainee', 'Job Description': 'https://www.reed.co.uk/jobs/business-analyst-trainee/51883647'}, {'Job Id': 51868774, 'Job Title': 'Business Analyst Trainee', 'Job Description': 'https://www.reed.co.uk/jobs/business-analyst-trainee/51868774'}]}
  ]
    const [resume, setResume] = useState(null);
    const [responseData, setResponseData] = useState(temp);
    
    
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
           
            {responseData && Object.keys(responseData[0].result).map((key) => {
                return (
                    <div key={key}>
                        <h2>{key}</h2>
                        {responseData[0].result[key].map((value) => {
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
    );

}

export {FileUpload}