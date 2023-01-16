
import {useState, createContext, useEffect} from 'react';
import axios from 'axios'
import { TrinityRingsSpinner } from 'react-epic-spinners'
import logo from '../../images/corumed_med_logo.png'
import mainApi from "../ContextFiles/Api";

export const AuthContext = createContext()

export const AuthProvider = (props) => {
    const [isLoggedIn, setLoginStatus] = useState(false)
    const [user, setUser] = useState({})
    const [isLoading, setLoading] = useState(true)
    const verify = async()=>{
        try{
        const {data} = await axios.post(
          `${mainApi}/api/customer/account/auth/`,
          {},
          {
            withCredentials: true,
          }
          
        )
          setLoginStatus(true)
          setUser(data.result)
        } 
        catch(error){
            console.log(error)
        }
        finally{
            setLoading(false)
        }
       
    }   
    useEffect(()=>{

        verify()
        
    }, [])
   
    return (
        <>
            <AuthContext.Provider value={{isLoggedIn, setLoginStatus, setUser, user, verify}}>
            { !isLoading ? props.children: 
                <div className='flex items-center justify-center flex-auto w-full'>
                    <div className='mx-auto mt-32 text-center'>
                        <img className='w-1/2 mx-auto md:w-1/5' src={logo}/>
                        <TrinityRingsSpinner color="#FF3C52" size={100} animationDelay={0.1} className='mx-auto mb-5'></TrinityRingsSpinner>
                        <label className='mx-auto text-xl font-medium tracking-wide font-poppins'>Loading...</label>
                    </div>
                </div>
            }
            </AuthContext.Provider>
        </>
    );
};