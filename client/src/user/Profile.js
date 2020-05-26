import React, {useState, useEffect} from 'react';
import { Link, Redirect } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import {read, update, updateUser } from './apiUser';

const Profile = ({match}) => {

    const [values, setValues] = useState({
        name: '',
        email: '',
        password: '',
        error: false,
        success: false
    })

    const { token } = isAuthenticated();
    const { name, email, password, error, success} = values;

    const init = (userId) => {
        //console.log(userId)
        read(userId, token)
        .then(data => {
            if(data.error) {
                setValues({
                    ...values,
                    error: true
                })
            } else {
                setValues({
                    ...values,
                    name: data.name,
                    email: data.email
                })
            }
        })
    }

    useEffect(() => {
        init(match.params.userId)
    }, []);

    const handleChange = name => e => {
        setValues(
            {
                ...values,
                error: false,
                [name]: e.target.value
            }
        );
    };

    const clickSubmit = e => {
        e.preventDefault();
        update(match.params.userId, token, {name, email, password})
        .then(data => {
            if(data.error){
                console.log(data.error);
            } else {
                updateUser(data, () => {
                    setValues({
                        ...values,
                        name: data.name,
                        email: data.email,
                        password: data.password,
                        success: true
                    })
                })
            }
        })
    };

    const redirectUser = (success) => {
        if(success) {
            return <Redirect to="/cart" />
        }
    };

    const profileUpdate = (name, email, password) => (
        <form className="container">
            <div className="form-group row">
                <label 
                    htmlFor="name"
                    className="text-muted col-sm-2"
                >
                    Name
                </label>
                <input
                    type="text"
                    onChange={handleChange("name")}
                    className="form-control col-sm-10"
                    value={name}
                    id="name"
                />
            </div>
            <div className="form-group row">
                <label 
                    htmlFor="email"
                    className="text-muted col-sm-2"
                >
                    Email
                </label>
                <input
                    type="text"
                    onChange={handleChange("email")}
                    className="form-control col-sm-10"
                    value={email}
                    id="email"
                />
            </div>
            <div className="form-group row">
                <label 
                    htmlFor="password"
                    className="text-muted col-sm-2"
                >
                    Password
                </label>
                <input
                    type="password"
                    onChange={handleChange("password")}
                    className="form-control col-sm-10"
                    value={password}
                    id="password"
                />
            </div>
            <button 
                onClick={clickSubmit}
                className="btn btn-primary"
            >
                Submit
            </button>
        </form>
    );

    return(
        <Layout 
            title= "Profile" 
            description = "Update your profile "
            className="container-fluid"
        >
           <h2 className="mb-2">Profile Update</h2>
            {profileUpdate(name, email, password)}
            {redirectUser(success)}
        </Layout>
    )
   
};

export default Profile;