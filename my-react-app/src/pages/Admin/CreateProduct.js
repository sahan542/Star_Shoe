import React, {useState, useEffect} from 'react';
import Layout from "./../../components/layout/Layout";
import AdminMenu from '../../components/layout/AdminMenu';

const CreateProduct = () => {
  const [categories, setCategories] = useState([])
  const [name,setName] = useState("")
  const [description,setDescription] = useState("")
  const [price,setPrice] = useState("")
  const [quantity,setQuantity] = useState("")
  const [shipping,setShipping] = useState("")

  return (
    <Layout title={"Dashboard - Create Product"}>
        <div className='container-fluid m-3 p-3'>
        <div classname="row">
            <div classname="col-md-3">
                <AdminMenu />
            </div>
            <div classname="col-md-9">
                <h1>Create Product</h1>
            </div>
        </div>
        </div>
    </Layout>
  )
}

export default CreateProduct;