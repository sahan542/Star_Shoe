import React from 'react';
import AdminMenu from '../../components/layout/AdminMenu';
import Layout from 'antd/es/layout/layout';

const Users = () => {
  return (

    <Layout title={"Dashboard - All users"}>
     <div className='container-fluid m-3 p-3'>
        <div classname="row">
            <div classname="col-md-3">
                <AdminMenu />
            </div>
            <div classname="col-md-9">
                <h1>All Users</h1>
            </div>
        </div>
    </div>
    </Layout>
  )
}

export default Users;