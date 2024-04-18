import React from 'react';
import {Link} from 'react-router-dom';

const Home = () => {    
    return (
        <div>
            <Link to='/job-finder'>
                <button>Find Jobs</button>
            </Link>
            <Link to='/optimise'>
                <button>Optimize resume</button>
            </Link>
        </div>
    )
}


export {Home}