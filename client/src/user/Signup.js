import React , { useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout'
import { signup } from '../auth/index'

const Signup = () =>{
    const [ values, setValues] = useState({
        name : '',
        email : '',
        password :'',
        error : '',
        success : false
    })

    const { name, email, password, success, error } = values;

    const handleChange = (e) => {
        setValues({ 
                    ...values,
                    [e.target.name] : e.target.value,
                    error : false
                })
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error : false});
        signup({name, email, password})
        .then( data => {
            if(data.error) {
                setValues(
                    {
                         ...values,
                          error: data.error, 
                          success : false
                    }
                )
            } else {
                setValues({
                    ...values,
                    name :'',
                    email: '',
                    password:'',
                    error:'',
                    success:true
                })
            }
        })
    }
    const signUpForm = () => (
        <form >
            <div className="form-group row ">
                <label 
                    htmlFor="name" 
                    className="text-muted col-sm-2 col-form-label"
                >
                    Name
                </label>
                <div className="col-sm-10">
                    <input  type="text" id="name" 
                            className="form-control"
                            name = "name"
                            onChange = {handleChange}
                            value = {name} />
                </div>
            </div>
            <div className="form-group row">
                <label 
                    htmlFor="email"  
                    className="text-muted col-sm-2 col-form-label"
                >
                    Email
                </label>
                <div className="col-sm-10">
                    <input  type="email" className="form-control" 
                            id="email"
                            name = "email"
                            onChange = {handleChange}
                            value = {email}/>
                </div>
            </div>
            <div className="form-group row"> 
                <label 
                     htmlFor="password"  
                    className="text-muted col-sm-2 col-form-label">
                    Password
                </label>
                <div className="col-sm-10">
                    <input  type="password" className="form-control"
                            id="password"
                            name = "password"
                            onChange = {handleChange}
                            value = {password}/>
                </div>
            </div>
            <button type="submit" 
                    className="btn btn-primary mb-2"
                    onClick = {handleSubmit}>
                Submit
            </button>
        </form>
    )

    const showError = () => (
        <div 
            className="alert alert-danger" 
            style={{display: error ? '':'none'}}
        >
            {error}
        </div>
    )
    const showSuccess = () => (
        <div 
            className="alert alert-info" 
            style={{display: success ? '':'none'}}
        >
           New account is created. Please <Link to="/signin">Signin</Link>
        </div>
    )
    return (
        <Layout 
            title= "Signup" 
            description = "Signup to  Node React E-commerce App"
            className = "container col-md-8 offset-md-2"
        >
            {showSuccess()}
            {showError()}
            {signUpForm()}
            {/* {JSON.stringify(values)} */}
        </Layout>
  
    )
};

export default Signup;