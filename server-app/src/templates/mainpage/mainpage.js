import React from 'react';
import Navbar from '../../components/navigation/navbar/navbar'
import Carousel from '../../components/carousel/carousel'

//import classes from './mainpage.module.css'

const mainpage = () => {
    return (
        <div>
            <Navbar/>
            <Carousel/>
        </div>
    );
}

export default mainpage;