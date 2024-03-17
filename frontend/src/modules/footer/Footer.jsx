import React from 'react';
import { MDBFooter } from 'mdb-react-ui-kit';
import { FaGithub, FaGoogle } from 'react-icons/fa';
import "./footer.css";

const Footer = () => {
  return (
    <MDBFooter bgColor='light' className='text-center text-lg-center'>
      <div className='text-center p-3 footer-container'>
        <div className="footer-content">
          <div className="d-flex justify-content-center align-items-center">
            <a href='https://github.com/reemodo/EventCraft' target='_blank' rel='noopener noreferrer' className="footer-icon">
              <FaGithub size={30} color='rgb(170, 194, 43)' />
            </a>
            <a href='https://google.com/' target='_blank' rel='noopener noreferrer'>
              <FaGoogle size={30} color='rgb(170, 194, 43)' className="footer-icon" />
            </a>
          </div>
          <div className="mt-3 footer-text">
            <div>&copy; {new Date().getFullYear()} : EventCraft </div>
          </div>
        </div>
      </div>
    </MDBFooter>
  );
}

export default Footer;
