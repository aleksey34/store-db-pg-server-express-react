import React, {useContext, useEffect, useState} from 'react';
import './App.css';
import AppRouter from "./components/AppRouter";
import NavBar from "./components/NavBar";
import {observer} from "mobx-react-lite";
import {Context} from "./index";
import {check} from "./http/userAPI";
import {Spinner} from "react-bootstrap";
//import {fetchBrands, fetchDevices, fetchTypes} from "./http/deviceApi";


const  App = observer( ()=> {

const {user } = useContext(Context);
const [loader , setLoader] = useState(true);

useEffect( ()=>{

    check()
        .then( data=>{
            user.setUser(data);
            user.setIsAuth(true);

        })
        .finally( ()=>{
          setLoader(false);
        });
} , [])

 // useEffect( ()=>{
 //            try {
 //                fetchTypes()
 //                    .then( data=> device.setTypes(data));
 //
 //                fetchBrands()
 //                    .then( data=> device.setBrands( data ));
 //
 //                fetchDevices(
                    // (Object.keys(device.selectedType).length && device.selectedType.id)
                    // ? device.selectedType  :
                    // null ,
                    // null ,
            //         device.page,
            //         device.limit)
            //         .then( data =>{
            //             device.setDevices(data.rows);
            //             device.setTotalCount(data.count);
            //            }
            //         );
            //
            // }catch (e) {}
            // }, [])




        if(loader){
            return(
                    <div
                        style={{height: '100vh'}}
                        className={'d-flex justify-content-center align-items-center'}>
                        <Spinner animation={"grow"} />
                    </div>
                )
        }else{
            return (
                <div className="App">
                    <NavBar/>
                    <AppRouter/>
                </div>
            );
        }
    }
)

export default App;