import {BrowserRouter,Routes,Route} from 'react-router-dom'
import {Home} from './components/Home'
import { FileUpload } from './components/fileUpload';
import { Optimise } from './components/optimiser';


function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/job-finder' element={<FileUpload/>}/>
          <Route path='/optimise' element={<Optimise/>}/>
        </Routes>
      </BrowserRouter>
      {/* <FileUpload/> */}
    </div>
  );
}

export default App;
