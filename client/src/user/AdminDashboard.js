import React from 'react';
import { Link } from 'react-router-dom';
import Layout from '../core/Layout';
import { isAuthenticated } from '../auth';

const AdminDashboard = () => {

    const { user : {_id, name, email, role}} = isAuthenticated()

    const adminLinks = () => {
        return (
            <div className="card">
                <h3 className="card-header">
                    Admin Links
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">
                       <Link className="nav-links" to="/create/category">
                            Create Category
                       </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-links" to="/create/product">
                            Create Product
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-links" to="/admin/orders">
                            View Orders
                        </Link>
                    </li>
                    <li className="list-group-item">
                        <Link className="nav-links" to="/admin/products">
                            Manage Products
                        </Link>
                    </li>
                    {/* <li className="list-group-item">
                        <Link className="nav-links" to="/admin/category">
                            Manage Category
                        </Link>
                    </li> */}
                </ul>
            </div>
        )
    }

    const adminInfo = () => {
        return (
            <div className="card mb-5">
                <h3 className="card-header">
                    Admin Information
                </h3>
                <ul className="list-group">
                    <li className="list-group-item">
                        {name}
                    </li>
                    <li className="list-group-item">
                        {email}
                    </li>
                    <li className="list-group-item">
                        {role === 1 ? 'Admin' : 'Registered User'}
                    </li>
                </ul>
            </div>
        )
    }

    return (
        <Layout 
            title="Dashboard"
            description={`G'day ${name}`}
            className = "container-fluid"
        >
            <div className="row">
                <div className="col-3">
                    { adminLinks()}
                </div>
                <div className="col-9">
                    { adminInfo()}
                </div>
            </div>
           
        </Layout>
    )
}

export default AdminDashboard;