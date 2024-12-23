import { createContext, useState, useEffect } from "react";
import { products } from "../assets/frontend_assets/assets";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import axios from 'axios'

export const Shopcontext = createContext();

const ShopcontextProvider = (props) => {

    const currency = "$";
    const delivery_fee = 10;
    const backendUrl = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState("")
    const [showsearch, setShowsearch] = useState(false)
    const [cartitems, setCartitems] = useState({})
    const navigate = useNavigate()
    const [products, setProducts] = useState([])
    const [token, setToken] = useState('')

    
    const itemcount = ()=>{
        let totalcount = 0;
        for(const items in  cartitems){
            for(const item in cartitems[items]){
                try {
                    if(cartitems[items][item] > 0){
                        totalcount += cartitems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalcount
    }

    const getCartData = async (token) => {
      try {
        const response = await axios.post(backendUrl+"/api/cart/get", {}, {headers:{token}})
        if (response.data.success) {
            setCartitems(response.data.cartData)
        }

      } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
    

    const getcartamount = ()=>{
        let totalAmount = 0
        for(const items in cartitems){
            let itemInfo = products.find((product)=>product._id === items)
            for(const item in cartitems[items]){
                try {
                    if(cartitems[items][item] > 0){
                        totalAmount += itemInfo.price * cartitems[items][item]
                    }
                } catch (error) {
                    
                }
            }
        }
        return totalAmount;
    }

    const updatequantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartitems)
        cartData[itemId][size] = quantity

        setCartitems(cartData)
        if (token) {
            try {
                await axios.post(backendUrl+"/api/cart/update", {itemId, size, quantity}, {headers:{token}})
            } catch (error) {
                toast.error(error.message)

            }
        }
    }
    



    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error('please select size first!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
        else {
            let cartData = structuredClone(cartitems)
            if (cartData[itemId]) {
                if (cartData[itemId][size]) {
                    cartData[itemId][size] += 1
                }
                else {
                    cartData[itemId][size] = 1
                }
            }
            else {
                cartData[itemId] = {}
                cartData[itemId][size] = 1
            }
            setCartitems(cartData)

            if (token) {
                try {
                    await axios.post(backendUrl+'/api/cart/add', {itemId, size}, {headers:{token}})
                    console.log('hello')
                } catch (error) {
                    console.log(error)
                    toast.error(error.message)
                }
            }
        }
    }
    // useEffect(() => {

    // }, [cartitems])


    const getProductsData = async () => {
      try {
        const response = await axios.get(backendUrl+'/api/product/list')
        if (response.data.success) {
            setProducts(response.data.products)            
        } else {
            toast.error(response.data.message)
        } 
    } catch (error) {
        console.log(error)
        toast.error(error.message)
      }
    }
    useEffect(() => {
        getProductsData()
    }, [])
    
    useEffect(() => {
        if (!token && localStorage.getItem('token')) {
            setToken(localStorage.getItem('token'))
            getCartData(localStorage.getItem('token'))
        }
    }, [])
    
    const value = {
        products, currency, delivery_fee,
        search, setSearch, showsearch, setShowsearch,
        cartitems, addToCart,
        itemcount,
        updatequantity,
        getcartamount,
        navigate,
        backendUrl,
        token, setToken, setCartitems
    }
    return <Shopcontext.Provider value={value}>
        {props.children}
    </Shopcontext.Provider>
}

export default ShopcontextProvider
