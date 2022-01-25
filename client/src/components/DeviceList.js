import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Row} from "react-bootstrap";
import DeviceItem from "./DeviceItem";

const DeviceList = observer( () => {
    const {device} = useContext(Context);



    return (
        <Row className='d-flex '>
            {
                 device.devices.map( (d )=>{
                    return (
                        <DeviceItem
                            key={d.id}
                            {...d}
                            brand={ device.brands.filter( (b)=>b.id === d.brandId)[0]
                            }
                        />
                    )
                })
            }
        </Row>
    );
    }
);

export default DeviceList;
