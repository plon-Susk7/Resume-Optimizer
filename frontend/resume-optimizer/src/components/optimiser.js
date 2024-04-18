import React,{useState} from 'react';
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const Optimise = () => {
 
    const [resume, setResume] = useState(null);
    const [markdownContent, setMarkdownContent] = useState(''); 
    
    const handleFileChange = (e) => {
         setResume(e.target.files[0]);
    }

    const handleUpload =  () => {
         if(resume){
            const formData = new FormData();
            formData.append('resume', resume);

            try{
                axios.post('http://localhost:5000/optimise', formData, {}) // API endpoint to classification prediction.
                .then(res=>{
                    // Do something with the response
                    // console.log(res.data.text)
                    setMarkdownContent(res.data.text)
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
      <div>
        <input type="file" onChange={handleFileChange} accept='.pdf'/>
        <button onClick={handleUpload}>Optimise Resume</button>
        <div>
            <ReactMarkdown>{markdownContent}</ReactMarkdown>
        </div>
      </div>
    );

}

export {Optimise}