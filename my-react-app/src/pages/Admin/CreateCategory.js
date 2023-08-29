import React from 'react';
import Layout from 'antd/es/layout/layout';
import AdminMenu from '../../components/layout/AdminMenu';

const CreateCategory = () => {
  return (
    <Layout title={"Dashboard - Create Category"}>
    <div className='container-fluid m-3 p-3'>
        <div classname="row">
            <div classname="col-md-3">
                <AdminMenu />
            </div>
            <div classname="col-md-9">
                <h1>Create Category</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateCategory;