import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { signin, authenticate,isAuthenticated } from '../auth/index';

const Signin = () => {
    const [ values, setValues] = useState({
        email : 'user1@gmail.com',
        password : 'user123',
        error : '',
        loading : false,
        redirectToReferrer : false
    })

    const { 
            email, 
            password, 
            error, 
            loading, 
            redirectToReferrer 
          } = values;
    
    const { user } = isAuthenticated();

    const handleChange = (e) => {
        setValues({ 
                    ...values,
                    [e.target.name] : e.target.value,
                    error : false
                })
    }

    
    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error : false, loading : true});
        signin({email, password})
        .then( data => {
            if(data.error) {
                setValues(
                    {
                         ...values,
                          error: data.error, 
                          loading : false
                    }
                )
            } else {
               authenticate(data, () => {
                    setValues({
                        ...values,
                        redirectToReferrer : true
                    })
                   }
               )
            }
        })
    }

    const signInForm = () => (
        <form>
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

    const showLoading = () => (
        loading &&
        <div className="alert alert-info" >
          <h2>loading...</h2>
        </div>
    )

    const redirectUser = () => {
        if(redirectToReferrer) {
            if(user && user.role === 1){
                return <Redirect to="/admin/dashboard" />
            } else {
                return <Redirect to="/user/dashboard" />
            }
        }
        if(isAuthenticated()) {
           return <Redirect to="/" /> 
        }
    }
    return(
        <Layout 
            title= "Signin" 
            description = "Signin to  Node React E-commerce App"
            className = "container col-md-8 offset-md-2"
    >
            {showLoading()}
            {showError()}
            {signInForm()}
            {redirectUser()}
    </Layout>
    )
}

export default Signin;