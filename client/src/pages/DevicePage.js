import React, {useContext, useEffect, useState} from 'react';
import {Container, Row, Col, Image, Card, Button} from "react-bootstrap";
import bigStar from "../assets/bigStar.svg";
import {useParams} from 'react-router-dom';
import {fetchOneDevice} from "../http/deviceApi";
import {Context} from "../index";


const DevicePage = () => {
    const {device} = useContext(Context);
    const [currentDevice , setCurrentDevice] = useState({});

    const getCurrentBrand = ()=>{
        return device.brands.filter( (b)=> b.id === currentDevice.brandId )[0];
    }


    const {id} = useParams();

    useEffect(()=>{
        fetchOneDevice(id)
            .then( data => setCurrentDevice(data))
            .catch( e=>{});

    }, [])

    // const device = {id:1, name:'iphone 13 pro' ,
    //     price: 25000 , rating: 5 ,
    //     img:'3fdfb3aa-589d-429f-b945-18475a362ef6.jpg'};
    // const description = [
    //     {id:1 , title: 'Оперативная память' , description: '5гб'},
    //     {id:2 , title: 'Камера' , description: '15мп'},
    //     {id:3 , title: 'Процесор' , description: 'Пентиум 3'},
    //     {id:4 , title: 'Кол-во ядер' , description: '2'},
    //     {id:5 , title: 'Аккомулятор' , description: '4000'},
    // ];
        return (
        <Container>
            <Row className={'mt-3'}>
                <Col md={4}>
                    {
                        (currentDevice && currentDevice.img) &&
                        <Image width={300} height={300} src={`${process.env.REACT_APP_API_URL}${currentDevice.img}`}/>
                    }
                </Col>
                <Col md={4}>
                    <Row className={'d-flex align-items-center flex-column'}>
                        <h1 className={'h1 text-center'}>{getCurrentBrand() ?  getCurrentBrand().name : '' } {currentDevice.name}</h1>
                        <div style={{background: `url(${bigStar}) center center / cover no-repeat ` ,
                        width: 240 , height: 240 ,fontSize: 64}}
                             className={'d-flex align-items-center justify-content-center'}>
                                {currentDevice.rating}
                        </div>
                    </Row>
                </Col>
                <Col md={4}>
                    <Card className={'d-flex flex-column align-items-center justify-content-around'}
                    style={{fontSize:32 , width: 300 , height: 300, border: '5px solid lightgray'}}
                    >
                        <h3>От: {currentDevice.price} рублей.</h3>
                        <Button variant={'outline-dark'}>Добавить в корзину</Button>
                    </Card>
                </Col>
            </Row>
            <Row className={'d-flex flex-column mt-3'}>
                <h2 className={'h2'}>Характиристики</h2>
                {
                    (currentDevice && currentDevice.info)  &&  currentDevice.info.map( (info , index)=>{
                        return (
                            <Row key={info.id}
                                 style={
                                     {
                                         backgroundColor: index % 2 === 0 ? 'lightgray' : 'transparent' ,
                                         padding: 10
                                     }
                                 }>
                                {info.title}: {info.description}
                            </Row>
                        )
                    })
                }
            </Row>
        </Container>
    );
};

export default DevicePage;
