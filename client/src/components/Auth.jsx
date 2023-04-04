




import React, { useState } from 'react';
import Cookies from 'universal-cookie';
import axios from 'axios';

import signinImage from '../assets/signup.jpg';
import { ToastContainer as ToastContainer2, toast as toast2 } from 'react-toastify';
import { ToastContainer as ToastContainer1, toast as toast1 } from 'react-toastify';

import 'react-toastify/dist/ReactToastify.css';

const cookies = new Cookies();

const initialState = {
    fullName: '',
    username: '',
    password: '',
    confirmPassword: '',
    phoneNumber: '',
    avatarURL: '',
}

const Auth = () => {
    const [form, setForm] = useState(initialState);
    const [isSignup, setIsSignup] = useState(false);

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const { username, password, confirmPassword, phoneNumber, avatarURL } = form;

        const errors = [];

        if (isSignup && !/^[a-zA-Z ]{2,30}$/.test(form.fullName)) {
            errors.push('Full Name must be a string with at least 2 and at most 30 characters.');
        }
    
        // if (isSignup && !/^[0-9]{10}$/.test(phoneNumber)) {
        //     errors.push('Phone Number must be a valid 10-digit phone number.');
        // }
    
        if (isSignup && !/(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+|<>?{}~-]).{8,}/.test(password)) {
            errors.push('Password must be at least 8 characters long, and contain at least one lower case, one upper case, one numerical and one special character.');
        }
    
        if (isSignup && password !== confirmPassword) {
            errors.push('Passwords do not match.');
        }

        if (errors.length > 0) {
            errors.forEach((error) => {
                toast2.error(error, {
                    position: "top-center",
                    autoClose: 5000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            });
        } else {
            
            const URL = 'http://localhost:5000/auth';
    
            try {
                const { data: { token, userId, hashedPassword, fullName } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'login'}`, {
                  username,
                  password,
                  fullName: form.fullName,
                  phoneNumber,
                  avatarURL,
                });
          
                cookies.set('token', token);
                cookies.set('username', username);
                cookies.set('fullName', fullName);
                cookies.set('userId', userId);
          
                if (isSignup) {
                  cookies.set('phoneNumber', phoneNumber);
                  cookies.set('avatarURL', avatarURL);
                  cookies.set('hashedPassword', hashedPassword);
                }
                toast2.success("Logged in successfully", {
                    position: "top-center",
                    autoClose: 7000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                  });
                  setTimeout(() => {
                    window.location.reload();
                  }, 3000);
                
              } catch (error) {
                const { response: { data: { message } } } = error;
          
                toast1.error(message, {
                  position: "top-center",
                  autoClose: 5000,
                  hideProgressBar: false,
                  closeOnClick: true,
                  pauseOnHover: true,
                  draggable: true,
                  progress: undefined,
                });
              }
        }

    }

    const switchMode = () => {
        setIsSignup((prevIsSignup) => !prevIsSignup);
    }
    if(isSignup){
    return (
        <div className="auth__form-container">
            <ToastContainer2/>
            <div className="auth__form-container_fields">
                <div className="auth__form-container_fields-content">
                    <p>{'Sign Up'}</p>
                    <form onSubmit={handleSubmit}>
                        
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="fullName">Full Name</label>
                                <input 
                                    name="fullName" 
                                    type="text"
                                    placeholder="Full Name"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        
                        <div className="auth__form-container_fields-content_input">
                            <label htmlFor="username">Username</label>
                                <input 
                                    name="username" 
                                    type="text"
                                    placeholder="Username"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="phoneNumber">Phone Number</label>
                                <input 
                                    name="phoneNumber" 
                                    type="text"
                                    placeholder="Phone Number"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        
                        
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="avatarURL">Avatar URL</label>
                                <input 
                                    name="avatarURL" 
                                    type="text"
                                    placeholder="Avatar URL"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        
                        <div className="auth__form-container_fields-content_input">
                                <label htmlFor="password">Password</label>
                                <input 
                                    name="password" 
                                    type="password"
                                    placeholder="Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                        
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="confirmPassword">Confirm Password</label>
                                <input 
                                    name="confirmPassword" 
                                    type="password"
                                    placeholder="Confirm Password"
                                    onChange={handleChange}
                                    required
                                />
                            </div>
                            
                        <div className="auth__form-container_fields-content_button">
                            <button>{"Sign Up"}</button>
                        </div>
                    </form>
                    <div className="auth__form-container_fields-account">
                        <p>
                            {
                              "Already have an account?" 
                             
                             }
                             <span onClick={switchMode}>
                             {' Sign In'}
                             </span>
                        </p>
                    </div>
                </div> 
            </div>
            <div className="auth__form-container_image">
                <img src={signinImage} alt="sign in" />
            </div>
        </div>
    )}
    else{
        return (
            <div className="auth__form-container">
               
                <div className="auth__form-container_fields">
                    <div className="auth__form-container_fields-content">
                        <p>{'Sign In'}</p>
                        <form onSubmit={handleSubmit}>
                        <ToastContainer1/>
                            <div className="auth__form-container_fields-content_input">
                                <label htmlFor="username">Username</label>
                                    <input 
                                        name="username" 
                                        type="text"
                                        placeholder="Username"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            
                            <div className="auth__form-container_fields-content_input">
                                    <label htmlFor="password">Password</label>
                                    <input 
                                        name="password" 
                                        type="password"
                                        placeholder="Password"
                                        onChange={handleChange}
                                        required
                                    />
                                </div>
                            
                            <div className="auth__form-container_fields-content_button">
                                <button> Sign In </button>
                            </div>
                        </form>
                        <div className="auth__form-container_fields-account">
                            <p>
                                {"Don't have an account?"
                                 }
                                 <span onClick={switchMode}>
                                 {' Sign Up'}
                                 </span>
                            </p>
                        </div>
                    </div> 
                </div>
                <div className="auth__form-container_image">
                    <img src={signinImage} alt="sign in" />
                </div>
            </div>
        )
    }
}

export default Auth







