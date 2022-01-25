import React, {useContext} from 'react';
import {observer} from "mobx-react-lite";
import {Context} from "../index";
import {Card, Row} from "react-bootstrap";

const BrandBar = observer(  ()=> {
    const { device } = useContext(Context);

        return (
            <Row className=''>
                {
                    device.brands.length > 0 &&   device.brands.map( (brand )=>{
                        return (
                            <Card
                                style={{cursor:'pointer'}}
                                className={`p-3 w-auto`}
                                border={brand.id === device.selectedBrand.id ? 'danger' : 'light'}
                                key={brand.id}
                                onClick={()=>device.setSelectedBrand(brand.id === device.selectedBrand.id
                                    ? {}
                                    : brand)}
                            >
                                {brand.name}
                            </Card>
                        )
                    })
                }
            </Row>

        );
    }
)
export default BrandBar;