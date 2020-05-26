import React, {useState,useEffect} from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';
import { createProduct, getCategories } from './apiAdmin'


const AddProduct = () => {

    const [values, setValues] = useState({
        name: '',
        description: '',
        price: '',
        categories: [],
        category: '',
        shipping: '',
        quantity: '',
        photo: '',
        loading: false,
        error: '',
        createdProduct: '',
        redirectToProfile: false,
        formData: ''
    })

    const {user, token} = isAuthenticated();
    const {
        name,
        description,
        price,
        categories,
        category,
        shipping,
        quantity,
        loading,
        error,
        createdProduct,
        redirectToProfile,
        formData
    } = values;

    //load categories and set formdata
    const init = () => {
        getCategories()
        .then(data => {
            if(data.error) {
                setValues({...values, error: data.error})
            } else {
                setValues({
                    ...values,
                    categories: data,
                    formData: new FormData()
                })
            }
        })
    }
    useEffect(() => {
        init();
    },[]);

    const handleChange = name => e => {
        const value = name === 'photo' ? e.target.files[0] : e.target.value;
        formData.set(name, value);
        setValues({ 
                    ...values,
                    [name] : e.target.value,
                    error : false
                })
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        setValues({...values, error : "",loading:true });

        createProduct(user._id, token, formData)
        .then(data => {
            if(data.error){
                setValues({...values, error: data.error});
            } else {
                setValues({
                    ...values,
                    name: '',
                    description: '',
                    photo: '',
                    price: '',
                    quantity: '',
                    loading: false,
                    createdProduct: data.name
                });
            }
        })
    }

    const newPostForm = () => (
        <form className="mb-3" onSubmit={handleSubmit}>
            <h4>Post Photo</h4>
            <div className="form-group">
                <label className="btn btn-secondary">
                    <input 
                        type="file" 
                        name="photo" 
                        accept="image/*"
                         onChange={handleChange('photo')}
                    />
                </label>
            </div>
            <div className="form-group row">
                <label 
                    className="col-sm-3"
                    htmlFor="name"
                >
                    Name
                </label>
                <div className="col-sm-9">
                    <input 
                        type="text"
                        id="name"
                        onChange={handleChange('name')}
                        className="form-control"
                        value={name}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label 
                    className="col-sm-3"
                    htmlFor="description"
                >
                    Description
                </label>
                <div className="col-sm-9">
                    <input 
                        type="text"
                        id="description"
                        onChange={handleChange('description')}
                        className="form-control"
                        value={description}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label 
                    className="col-sm-3"
                    htmlFor="price"
                >
                    Price
                </label>
                <div className="col-sm-9">
                    <input 
                        type="number"
                        id="price"
                        onChange={handleChange('price')}
                        className="form-control"
                        value={price}
                    />
                </div>
            </div>
            <div className="form-group row">
                <label 
                        className="col-sm-3"
                        htmlFor="category"
                    >
                        Category
                </label>
                <div className="col-sm-9">
                    <select
                        onChange={handleChange('category')}
                        className="form-control"
                    >
                        <option>
                           Please select
                        </option>
                        { categories && categories.map((category,i) => (
                            <option key={i} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label 
                        className="col-sm-3"
                        htmlFor="shipping"
                    >
                        Shipping
                </label>
                <div className="col-sm-9">
                    <select
                        onChange={handleChange('shipping')}
                        className="form-control"
                    >
                        <option> Please select </option>
                        <option value="1"> Yes</option>
                        <option value="0"> No</option>
                    </select>
                </div>
            </div>
            <div className="form-group row">
                <label 
                    className="col-sm-3"
                    htmlFor="quantity"
                >
                    Quantity
                </label>
                <div className="col-sm-9">
                    <input 
                        type="number"
                        id="quantity"
                        onChange={handleChange('quantity')}
                        className="form-control"
                        value={quantity}
                    />
                </div>
            </div>
            <button className="btn btn-outline-primary ">
                Created Product
            </button>
        </form>
    )

    const showError = () => (
        <div className="alert alert-danger" style={{display: error ?'':'none'}}>
            {error}
        </div>
    );

    const showSuccess = () => (
        <div className="alert alert-info" style={{ display: createdProduct ? '' : 'none' }}>
            <h2>{`${createdProduct}`} is created!</h2>
        </div>
    );

    const showLoading = () => (
        loading && (<div className="alert alert-success">
            <h3>loading..</h3>
        </div>)
    )
    return (
        <Layout 
            title="Add a new Product"
            description={`G'day ${user.name}, ready to add a new product ?`}
            className ="container"
        >
            <div className="row">
                <div className="col-md-8 offset-md-2">
                 {showLoading()}
                 {showError()}
                 {showSuccess()} 
                 {newPostForm()}
                </div>
            </div>
           
        </Layout>
    )
}

export default AddProduct;