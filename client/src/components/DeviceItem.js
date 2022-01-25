import React from 'react';
import  {Image,Col , Card} from 'react-bootstrap';
import star from "../assets/star.svg";
import {useNavigate} from 'react-router-dom'; // instead useHistory!! NEW
import {DEVICE_PATH} from "../utils/constants";

const DeviceItem = ({id , name , price , rating , img , brand} ) => {
const navigate = useNavigate(); // instead useHistory and  history.push() function

    return (
        <Col md='3' className='mt-3'  onClick={()=>navigate(`${DEVICE_PATH}/${id}`)}>
            <Card border={'light'}  style={{width: 150 , cursor: 'pointer'}}>
                <Image src={`${process.env.REACT_APP_API_URL}${img}`} width={150} height={150}/>
                <div className='d-flex justify-content-between'>
                    <div className={'text-black-50'}>
                        {brand.name}
                    </div>
                    <div className={'d-flex'}>
                        <div>{rating}</div>
                        <Image src={star}/>
                    </div>
                </div>
                <div className={''}>{name}</div>
                <div>Цена: {price} руб.</div>
            </Card>
        </Col>
    );
};

export default DeviceItem;
