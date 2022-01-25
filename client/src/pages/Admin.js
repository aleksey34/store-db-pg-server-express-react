import React, {useContext, useEffect, useState} from 'react';
import {Button, Container} from "react-bootstrap";
import CreateBrand from "../components/modals/CreateBrand";
import CreateDevice from "../components/modals/CreateDevice";
import CreateType from "../components/modals/CreateType";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";
import {Context} from "../index";

const Admin = () => {
    const [brandVisible , setBrandVisible] = useState( false );
    const [typeVisible , setTypeVisible] = useState( false );
    const [deviceVisible , setDeviceVisible] = useState( false );

    const {device} = useContext(Context);

    useEffect( ()=>{
        try {
            fetchTypes()
                .then( data=> device.setTypes(data));

            fetchBrands()
                .then( data=> device.setBrands( data ));

            fetchDevices(
                null ,
                null ,
                device.page ,
                device.limit
            )
                .then( data => {
                    device.setDevices(data.rows);
                    device.setTotalCount(data.count);
                });

        }catch (e) {}
    }, [])


    return (
        <Container className={'d-flex flex-column'}>
            <Button
                onClick={()=>setTypeVisible(true)}
                    variant={'outline-dark'}
                    className={'mt-4 p-2'}>
                Добавить тип
            </Button>
            <Button
                onClick={()=>setBrandVisible(true)}
                    variant={'outline-dark'}
                    className={'mt-4 p-2'}>
                Добавить Брэнд
            </Button>
            <Button
                onClick={()=>setDeviceVisible(true)}
                    variant={'outline-dark'}
                    className={'mt-4 p-2'}>
                Добавить устройство
            </Button>

            <CreateBrand show={brandVisible}    onHide={()=>setBrandVisible(false)} />
            <CreateDevice  show={deviceVisible} onHide={()=>setDeviceVisible(false)} />
            <CreateType show={ typeVisible}    onHide={()=>setTypeVisible(false)}  />
        </Container>
    );
};

export default Admin;
