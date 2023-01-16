import React, {useState, useEffect} from 'react';
import { Header } from '../components';
import { Button } from "@material-tailwind/react";
import { NavLink, useParams, useNavigate } from 'react-router-dom';
import impExcel from '../Images/import.png';
import medLogo from '../Images/corumed_med_logo.png'
import { TextBoxComponent } from '@syncfusion/ej2-react-inputs';
import { Input, Select,notification, Image } from 'antd';
import Axios from 'axios';
import { setAttribute } from '@syncfusion/ej2/barcode-generator';
import mainApi from '../contexts/Api';

const { TextArea } = Input;
const { Option } = Select;

const AddProduct = () => {

  const openNotificationWithIconUpdate = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Updated Successfully.",
      duration: 2,
    });
  };

  const openNotificationWithIconInsert = (type) => {
    notification[type]({
      message: "SUCCESS!",
      description: "Product Inserted Successfully.",
      duration: 2,
    });
  };

  //for Fields.
  const {id} = useParams();
  const [count, setCount] = useState(0);
  const [productName, setPName] = useState('');
  const [productDescription, setPDescription] = useState('');
  const [productAttribute, setPAttribute] = useState(0);
  const [productAttrValue, setPAttrValue] = useState(0);
  const [attrID, setAttrID] = useState(0);
  var atID;
  const [productPrice, setPPrice] = useState(0);
  const [productCategory, setPCategory] = useState(0);
  const [productBrand, setPBrand] = useState(0);
  //const [productSupplier, setPSupplier] = useState(0);
  const [productAvailability, setPAvailability] = useState('Select Availability');
  const [productSKU, setPSKU] = useState('');
  const [status, setStatus] = useState('Select Status');
  const [selStat, setSelStat] = useState('');
  const navigate = useNavigate();
  
  //for Getting Active Fields
  const [activeBrands,setActiveBrands]=useState([]);
  const [activeCategory,setActiveCategory]=useState([]);
  const [activeSupplier,setActiveSupplier]=useState([]);
  const [activeAttribute,setActiveAttribute]=useState([]);
  const [activeAttrValue,setActiveAttrValue]=useState([]);

  //For image
  const [productImage, setPImage] = useState('');
  const [productImagePreview, setPImagePreview] = useState('');
  const baseProductIMGUrl = `${mainApi}/uploads/productImages/`;

  const abortController = new AbortController();
 
  //Retrieving Active Brands

  const fetchData = async () => {
    await Axios.get(`${mainApi}/api/brand/get/bname/active`).then((response)=>{
      setActiveBrands(response.data); 
    });

    await Axios.get(`${mainApi}/api/category/get/categname/active`).then((response)=>{
      setActiveCategory(response.data);
    });

    await Axios.get(`${mainApi}/api/supplier/get/suppname/active`).then((response)=>{
      setActiveSupplier(response.data);
    });

    await Axios.get(`${mainApi}/api/attribute/get/attrname/active`).then((response)=>{
      setActiveAttribute(response.data);
    });
  }

  const fetchDataForUpdate = async () => {
    
    if(id){
      Axios.get(`${mainApi}/api/products/get/${id}`).then((response)=>{
        setAttrID(response.data.productAttribute);
        setPImagePreview(response.data.productImage);
        setPImage(response.data.productImage);
        setPName(response.data.productName);
        setPDescription(response.data.productDescription);
        setPAttribute(response.data.productAttribute);
        setPAttrValue(response.data.productAttrValue);
        setPPrice(response.data.productPrice);
        setPBrand(response.data.productBrand);
        setPCategory(response.data.productCategory);
       // setPSupplier(response.data.productSupplier);
        setPAvailability(response.data.productAvailability);
        setPSKU(response.data.productSKU);
        setStatus(response.data.productStatus);
      });
    }

  }

  useEffect(()=>{
    fetchDataForUpdate();
    fetchData();
    return () => {  
      abortController.abort();
    }

  },[count]);

  useEffect(()=>{
    Axios.get(`${mainApi}/api/attrvalue/get/attrvalname/active/${attrID}}`).then((response)=>{
      setActiveAttrValue(response.data);
    });
  },[attrID])

  function handleDoneEvent(event){
    setPName('');
    setPDescription('');
    setPAttribute('Choose Attribute');
    setPAttrValue('Choose Attribute Value');
    setPPrice(0);
    setPBrand('Choose Brand');
    setPCategory('Choose PCategory');
    //setPSupplier('Choose Supplier');
    setStatus('Select Status');
  }

  function handleImage(e){
    setPImagePreview(URL.createObjectURL(e.target.files[0])) ;
    setPImage(e.target.files[0]);
  }

  function submitButton(event){

    if(productName === ''){
      alert("Product Name is empty.");
    } 
    else if(productDescription === ''){
      alert("Product Description is empty.");
    }
    else if(productAttribute === 0){
      alert("Please select an Attribute.");
    }
    else if(productAttrValue === 0){
      alert("Please select an Attribute Value.");
    }
    else if(productPrice === 0){
      alert("Product Price is must be more than zero.");
    }
    else if(productCategory === 0){
      alert("Please select a Product Category. ");
    }
    else if(productBrand === 0){
      alert("Please select a Product Brand. ");
    }
    // else if(productSupplier === 0){
    //   alert("Please select a Product Supplier. ");
    // }
     else if(productAvailability === 'Select Availability'){
       alert("Please set the Availability of the Product.");
     }
    else if(status === 'Select Status'){
      alert("Please set the status.");
    }
    else{

      
      console.log("product image: " + productImage);
      console.log("product attr: " + productAttribute);
      console.log("product attr val: " + productAttrValue);
      console.log("product brand: " + productBrand);
      console.log("product categ: " + productCategory);
      //console.log("product supplier: " + productSupplier);
      
      const productData = new FormData();
      productData.append('productImage', productImage)
      productData.append('productName',productName)
      productData.append('productDescription', productDescription)
      productData.append('productAttribute', productAttribute)
      productData.append('productAttrValue', productAttrValue)
      productData.append('productCategory', productCategory)
      productData.append('productPrice', productPrice)
      productData.append('productBrand', productBrand)
     // productData.append('productSupplier', productSupplier)
      productData.append('productAvailability', productAvailability)
      productData.append('productSKU', productSKU)
      productData.append('productStatus', status)


      if (id){
        Axios.put(`${mainApi}/api/products/update/${id}`,
          productData,
          {headers: { "Content-Type": "multipart/form-data" }}
        ).then(()=>{
          console.log("Successfully updated to the Database");
          openNotificationWithIconUpdate("success");
        }).catch((e) => alert("catch: " + e))
       
        handleDoneEvent();
      }
      else{
        Axios.post(`${mainApi}/api/products/insert`,
          productData,
          {  headers: { "Content-Type": "multipart/form-data" }}
        ).then(()=>{
          console.log("Successfully Added to the Database");
          openNotificationWithIconInsert("success");
        }).catch((e)=>
          alert("catch: " + e)
        )
        
        handleDoneEvent();
      }

      //Return to Product table
      navigate(-1);

    }
  }

  return (
    
    <div className='mx-8 mt-20 md:m-10'>
      <Header title='Products'/>

      <div className='items-center justify-center px-5 py-10 m-2 bg-white shadow-md md:m-10 md:px-14 md:pt-5 rounded-xl'>

        <div className='flex w-full h-12'>
          <p className='w-full px-4 my-auto text-lg font-bold'>{id? "Update Product" : "Add Product"}</p>

          {/* <div className='relative w-full'>
              <div className='absolute right-0 w-34'>

                <NavLink to={''}>
                  <Button type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='inline-flex items-center w-10 h-10 py-1 pl-2 pr-0 my-1 text-black rounded hover:bg-green-400 sm:w-10 md:w-auto md:p-4'>
                    <img className='object-scale-down w-6 h-6 mx-auto mr-2 md:w-4 sm:mr-0 md:mr-2 sm:mx-auto' src={impExcel}/>
                    <p className='invisible text-xs font-semibold md:visible lg:flex sm:invisible'>Import</p>
                  </Button>
                </NavLink>

              </div>
          </div> */}
            
        </div>

        <div style={{borderColor: "#747C95"}} className="flex-auto w-full my-5 border-b-2 rounded"></div>

        <form method="post" encType="multipart/form-data">

          <div className='flex flex-col items-center justify-center w-full md:flex-row min-w-screen'>

            <div className="flex flex-col justify-center w-full gap-4 p-0 md:mr-10 md:w-1/2 sm:w-full">
                <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Product Image:</p>
                  <div className='flex flex-col'>
                    <Image
                      width={150}
                      height={150}
                      preview={true}
                      fallback={medLogo}
                      src={productImage?productImagePreview:productImage}/>
                    <input className='my-auto' type="file" name="productImage" accept=".png, .jpg, .jpeg" onChange={handleImage} />
                  </div>
                </div>
                {/* <div className="flex w-2/3 border-2 textboxes ">
                  <input className='my-auto' type="file" name="productImage" accept=".png, .jpg, .jpeg" onChange={handleImage} /> 
                </div> */}
                <div className="flex w-full textboxes">
                    <p className='w-32 my-auto font-display'>Product Name:</p>
                    <Input className='my-auto' value={productName || ''} placeholder="Enter Product Name"   onChange={(e)=> setPName(e.target.value)}/>
                </div>
                <div className="flex w-full textboxes">
                    <p className='w-32 font-display'>Product Description:</p>
                    <TextArea rows={4} placeholder="Enter Product Description"  value={productDescription || ""} className='resize-none' onChange={(e)=> setPDescription(e.target.value)}/>
                </div>
                <div className="flex w-full textboxes">
                    <p className='w-32 my-auto font-bold font-display'>Product Attribute:</p>
                </div>
                <div className="flex w-full textboxes">
                    <p className='w-32 my-auto font-display'>Attribute Name:</p>
                    <Select showSearch={true} className='w-full rounded-sm' value={productAttribute || "Choose Attribute"} defaultValue="Choose Attribute" placeholder="Choose Size" optionFilterProp ="search"
                    onChange={(value) => {console.log(value); setPAttribute(value); setAttrID(value)}}>
                      {Array.from(activeAttribute).map((actAttribute, index) => (
                        <Option key={index} value={actAttribute.Attr_ID} search={actAttribute.Attribute_Name}>{actAttribute.Attribute_Name}</Option>
                      ))}
                    </Select>
                </div>
                <div className="flex w-full textboxes">
                    <p className='w-32 my-auto font-display'>Attribute Value:</p>
                    <Select showSearch={true} className='w-full rounded-sm' defaultValue="Choose Attribute Value" value={productAttrValue || "Choose Attribute Value"} placeholder="Choose Unit" onChange={(value) => { setPAttrValue(value); }} disabled={productAttribute === 0 ? true : false} optionFilterProp ="search">
                      {Array.from(activeAttrValue).map((actAttrVal, index) => (
                        <Option key={index} value={actAttrVal.Value_ID} search={actAttrVal.Value_Name}>{actAttrVal.Value_Name}</Option>
                      ))}
                    </Select>
                </div>
            </div>

            <div className="flex flex-col justify-center w-full gap-4 p-0 md:w-1/2 sm:w-full">
            
              <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Price (Php):</p>
                  <Input placeholder="Enter Price" type="number" value={productPrice} onChange={(e)=> setPPrice(e.target.value)} />
              </div>
                  
              <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Category:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Category" value={productCategory || "Choose Category"}placeholder="Choose Category" onChange={(val) => { setPCategory(val);}} showSearch={true} optionFilterProp ="search">
                        {Array.from(activeCategory).map((actCategory, index)=>(
                              <Option key={index} value={actCategory.CategoryID} search={actCategory.Category_Name}>{actCategory.Category_Name}</Option>
                            ))}
                  </Select>
              </div>

              <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Brand:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Brand" value={productBrand || "Choose Brand"} placeholder="Choose Brand" onChange={(value) => { setPBrand(value); }} showSearch={true} optionFilterProp ="search">
                      {Array.from(activeBrands).map((actBrands, index)=>
                        (
                        <Option key={index} value={actBrands.BrandID} search={actBrands.Brand_Name}>{actBrands.Brand_Name}</Option>
                      ))}
                     
                  </Select>
              </div>

              {/* <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Supplier:</p>
                  <Select className='w-full rounded-sm' defaultValue="Choose Supplier" value={productSupplier || "Choose Supplier"} placeholder="Choose Supplier" onChange={(value) => { setPSupplier(value); }}>
                        {Array.from(activeSupplier).map((actSupplier, index) =>
                              (
                              <Option key={index} value={actSupplier.SupplierID}>{actSupplier.Supplier_ComName}</Option>
                            ))}
                  </Select>
              </div> */}

              <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Product SKU:</p>
                  <Input className='my-auto' value={productSKU || ''} placeholder="Auto-Generated"  name="productSKU" disabled onChange={(e)=> setPSKU(e.target.value)}/>
              </div>

              <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Status:</p>
                  <Select className='w-full rounded-sm' placeholder="Select Status" value={status}
                      onChange={(value) => { setStatus(value); }}>
                    <Option value="active">Active</Option>
                    <Option value="inactive">Inactive</Option>
                  </Select>
              </div>

              <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Availability:</p>
                  <Select className='w-full rounded-sm' placeholder="Select Availability" value={productAvailability} name="productAvailability"
                      onChange={(value) => { setPAvailability(value); }}>
                    <Option value="Over the Counter">Over the Counter</Option>
                    <Option value="Prescription Drug">Doctor's Prescription</Option>
                  </Select>
              </div>

              {/* <div className="flex w-full textboxes">
                  <p className='w-32 my-auto font-display'>Requires Prescription: </p>
                  <Input type = "checkbox" defaultChecked={updateCBRP==="1"? true:null} onChange={CBPRequiredPres} />
              </div> */}
              
            </div>
          </div>
        </form>
        
        <div className='flex flex-row justify-end mt-5'>
          <NavLink to={'/products/masterlist'}> 
            <Button action='' type='button' size='sm' style={{backgroundColor: '#ED5264'}} className='inline-flex items-center w-auto h-10 py-1 pl-2 pr-2 my-1 mr-3 text-black rounded hover:bg-blue-400 md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>Cancel</p>
            </Button>
          </NavLink>
          <NavLink to={''}> 
            <Button action='' onClick={submitButton} type='button' size='sm' style={{backgroundColor: '#46E4AC'}} className='inline-flex items-center w-auto h-10 py-1 pl-2 pr-2 my-1 text-black rounded hover:bg-blue-400 md:w-auto md:p-4'>
                <p className='text-sm font-semibold'>{id? "Update Product" : "Add Product"}</p>
            </Button>
          </NavLink>
          
        </div>
      </div>
    </div>
)}

export default AddProduct