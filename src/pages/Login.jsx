import { EyeOff, Loader2, Lock, Mail } from "lucide-react";
import React, { useState } from "react";
import Auth from "../Apis/Auth";
import { toast } from "react-toastify";


const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    // const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);


    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true)
        try {
           const response = await Auth.Adminlogin(email, password);
           if (response.message === 'Login successful') {
            toast.success('Login successful');
            // store in the local storage
            localStorage.setItem('admin', JSON.stringify(response));
            // redirect to the dashboard
            //set timeout
            setTimeout(() => {
                window.location.href = '/dashboard';
            }, 5000);
          
            
           }
           else {
            toast.error(response.message);
            // setError(response.message);
            // setLoading(false);
           }
        } catch (error) {
            toast.error('Something went wrong. Please try again.');
            // setLoading(false);
            console.log(error);
        }
        finally {
            setLoading(false);
        }
    }


    console.log(localStorage.getItem('admin'));

  return (
    <div className="row justify-content-center align-items-center vh-100">
      {/* Login page */}
    <div className="col-md-6 col-sm-12 text-center px-5">
        <img src="./images/logo.png" className="img-fluid w-50" alt="" />
        <h2 className="my-4">Welcome Back</h2>

        <form  onSubmit={handleLogin}>
            {/* An email input with mail icon on the left */}
            <div className="mb-3">
                <div className="input-group border rounded border-info">
                    <span className="input-group-text bg-white border-end-0">
                        <Mail size={18}/>
                    </span>
                    <input type="email" id="email" className="form-control border-start-0" placeholder="Enter your email" onChange={(e) => setEmail(e.target.value)} />
                </div>
            </div>

            <div className="mb-3">
                <div className="input-group border rounded border-info">
                    <span className="input-group-text bg-white border-end-0">
                        <Lock size={18}/>

                    </span>
                    <input type="password" id="password" placeholder="Enter your password" className="form-control border-start-0" onChange={(e) => setPassword(e.target.value)} />
                    <span className="input-group-text bg-white border-start-0">
                        <EyeOff size={18}/>
                    </span>
                </div>
            </div>

            <div className="mb-3 form-check text-start">
                <input type="checkbox" id="rememberMe" className="form-check-input"  />
                <label htmlFor="rememberMe" className="form-check-label">Remember Me</label>
            </div>

            {/* submit button */}
            <button className="btn btn-primary w-50 " type="submit" disabled={loading}>
                {loading ? (
                    <>
                    <Loader2 size={18} className="me-2 spin"/>
                    Loading...
                    </>
                ): (
                    'Login'
                )}
            </button>
            {/* <button className="btn btn-primary w-50" type="submit">Login</button> */}
            <p className="mt-3">Don't have an account? <a href="#">Sign Up</a></p>
        </form>
      </div>
      {/* A div which is  a quarter circle */}
      <div className="col-md-6 d-none d-md-block bg-primary text-white vh-100 " style={{borderRadius:'0 0 0 100%'}}>
        <img src="./images/login2.png" alt="" className="img-fluid " style={{marginTop:'100px', marginLeft:'160px'}} />
      </div>
      
    </div>
  );
};

export default Login;
