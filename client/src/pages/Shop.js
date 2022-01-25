import React
    , {useContext, useEffect}
    from 'react';
import  {Container , Row , Col} from "react-bootstrap";
import TypeBar from "../components/TypeBar";
import BrandBar from "../components/BrandBar";
import DeviceList from "../components/DeviceList";
import {observer} from "mobx-react-lite";
import Pages from "../components/Pages";

import {Context} from "../index";
import {fetchBrands, fetchDevices, fetchTypes} from "../http/deviceApi";

const Shop = observer( () => {
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
                device.page,
                device.limit
            )
                .then( data => {

                    device.setDevices(data.rows);
                    device.setTotalCount(data.count);
                    // console.log(data.rows , data.count);
                });

        }catch (e) {}

    }, [])

    useEffect( ()=>{

        fetchDevices(
            device.selectedType.id ,
            device.selectedBrand.id ,
            device.page,
            device.limit
        )
            .then(  data =>{
                device.setDevices(data.rows);
                device.setTotalCount(data.count);
            })

    }, [ device.selectedBrand.id , device.selectedType.id, device.page, device.limit ])


        return (
            <Container>
                <Row className='mt-3'>
                    <Col md={3}>
                        <TypeBar />
                    </Col>
                    <Col md={9}>
                        <BrandBar/>
                        <DeviceList/>
                        <Pages/>
                    </Col>
                </Row>
            </Container>
        );
    }
)

export default Shop;
