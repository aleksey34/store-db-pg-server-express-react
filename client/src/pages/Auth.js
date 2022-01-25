import React, {useContext, useState} from 'react';
import  {Button, Card, Container, Form , Row} from "react-bootstrap";
import {NavLink, useLocation, useNavigate} from "react-router-dom";
import {LOGIN_PATH, REGISTRATION_PATH, SHOP_PATH} from "../utils/constants";
import {login, registration} from "../http/userAPI";
import {observer} from "mobx-react-lite";
import {Context} from "../index";


const Auth = observer( () => {
    const navigate = useNavigate();
    const {pathname} = useLocation();
    const isLoginRender =  pathname === LOGIN_PATH;

    const [email , setEmail] = useState('');
    const [password , setPassword] = useState('');

    const { user } = useContext(Context);

    const click= async (email , password)=>{
        try {
            let data;
            if(isLoginRender){
                data = await login( email , password);
            }else{
                data = await registration( email , password);
                console.log(data);
            }

            if(data && data.id){
                user.setUser(data);
                user.setIsAuth(true);
                navigate(SHOP_PATH);
            }

        }catch (e) {
            alert(e.response.data.message)
        }


    }


        return (
            <Container
                className="d-flex justify-content-center align-items-center"
                style={{height: window.innerHeight -54}}
            >
                <Card  className='p-5' style={{width: 600}}>
                            <h2 className='m-auto'>{isLoginRender ? 'Авторизация'  : 'Регистрация'}</h2>
                            <Form className='d-flex flex-column'
                            onClick={e=>e.preventDefault()}
                            >
                                <Form.Control
                                    value={email}
                                    onChange={e=>setEmail(e.target.value)}
                                    type='email'
                                    className='mt-3'
                                    placeholder='Введите email...'  />
                                <Form.Control
                                    value={password}
                                    onChange={e=>setPassword(e.target.value)}
                                    type='password'
                                    className='mt-3'
                                    placeholder='Введите пароль...'  />
                                <Row className='d-flex justify-content-between mt-3 px-2'>
                                    <div className='w-auto'>
                                        {isLoginRender ? 'Нет аккаунта?' : 'Зарегистрировался?'} <NavLink to={isLoginRender ? REGISTRATION_PATH : LOGIN_PATH} >
                                        !{isLoginRender ?  ' Зарегистрируйся' : ' Войти'}
                                    </NavLink>
                                    </div>
                                    <Button
                                        onClick={ async (e)=>{

                                          await  click(email , password);

                                          }
                                        }
                                        type='submit'
                                            variant="outline-success"
                                            className='w-auto'>
                                        {isLoginRender ?  'Войти' : 'Зарегистрироваться'}
                                    </Button>
                                </Row>
                            </Form>
                    </Card>
            </Container>
        );
    }
);

export default Auth;
