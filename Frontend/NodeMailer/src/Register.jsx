import React, { useState } from 'react';
import './Register.css';
import axios from 'axios';
function Register() {
    const [show,setShow]=useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    
    let {name,email,message}=formData;
    console.log(name,email,message);
    
    axios.post('https://nodemailer-contactform-backend.onrender.com/user',{name,email,message}).then(()=>{
      console.log('Form Data Submitted:', formData);
    }).catch((err)=>{
      console.log(err);
    })

    setShow(true);

  };

  return (
    <>{!show &&<div className="Register">
        <h1>Contact Us</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">Name:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
  
          <div>
            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
  
          <div>
            <label htmlFor="message">Message:</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>
          </div>
  
          <button type="submit">Submit</button>
        </form>
      </div>}

      {show && (
  <>
    <h1>Thank you for getting in touch with us.</h1>
    <h2>We have received your message and will respond to your inquiry as soon as possible.</h2>
    <h2>Check your email for a confirmation message. We appreciate your time and look forward to assisting you further.</h2>
  </>
)}

    </>
  );
}

export default Register;
