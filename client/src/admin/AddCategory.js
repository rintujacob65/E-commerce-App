import React, {useState} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createCategory } from './apiAdmin'

const AddCategory = () => {
    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [success, setSuccess] = useState(false);


    //destructure token and user from localstorage
    const {user, token} = isAuthenticated();

    const handleChange = (e) => {
        setError('')
        setName(e.target.value)
    }

    const handleSubmit = (e) => { 
        e.preventDefault();
        setError('');
        setSuccess(false)

        //api call

        createCategory(user._id, token, {name})
       .then(data => {
            if(data.error) {
                setError(true);
            } else {
                setError("");
                setSuccess(true);
            }
        })
    }

    const newCategoryForm = () => (
        <form  onSubmit={handleSubmit}>
            <div className="form-group row" >
               <label 
                    htmlFor="name" 
                    className="text-muted col-md-3 col-form-label"
                >
                    Name
                </label>
               <div className="col-md-5">
                    <input 
                        type="text"
                        id="name"
                        onChange={handleChange}
                        value={name}
                        className="form-control"
                        autoFocus
                        required
                    />
                </div>
            </div>
            <button className="btn btn-outline-primary m-3" >
                Create Category
            </button>
        </form>
    )

    const showSuccess = () => {
        if(success) {
        return <h3 className="text-success">{name} is created</h3>
        }
    };

    const showError = () => {
        if(error) {
        return <h3 className="text-danger">Category should be unique</h3>
        }
    };

    const goBack = () => (
        <div className="mt-5">
            <Link to="/admin/dashboard" className="text-warning">
                Back to Dashboard
            </Link>
        </div>
    );

    return (
        <Layout 
            title="Add a new Category"
            description={`G'day ${user.name}, ready to add a new category ?`}
            className ="container"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                    {showSuccess()}
                    {showError()}
                    {newCategoryForm()}
                    {goBack()}
                </div>
            </div>
           
        </Layout>
    )
}

export default AddCategory;