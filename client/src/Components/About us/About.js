import React from 'react';
import Navbar from '../Navbar/index';
import Footer from '../Footer/Footer';
import CounterUp from '../../Reuseables/CounterUp';
import Vision from '../Home/Vision.js'
const About = () => {
  return (
    <>
    <Navbar/>
      <div>
        <Vision/>
        </div>
      <CounterUp/>
     <Footer/>
    </>
  )
}

export default About;
