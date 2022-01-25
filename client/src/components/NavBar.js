import React, {useContext} from 'react';
import {Navbar , Container , Nav, Button } from 'react-bootstrap';
import {NavLink, useNavigate} from "react-router-dom";
import {ADMIN_PATH, LOGIN_PATH, SHOP_PATH} from "../utils/constants";
import {Context} from "../index";
import {observer} from "mobx-react-lite";

const NavBar = observer( () => {
    const navigate = useNavigate();
    const {user} = useContext(Context);

    const logOut = ()=>{
        user.setIsAuth(false);
        user.setUser({});
        localStorage.removeItem('token');
    }

        return (
            <Navbar bg="dark" variant='dark' expand="lg">
                <Container fluid>
                    <NavLink to={SHOP_PATH} style={{color: 'white' , textDecoration:'none'}}>
                        <Navbar.Brand>
                       КупиДевайс
                        </Navbar.Brand>
                    </NavLink>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="ms-lg-auto my-2 my-lg-0"
                            // style={{ maxHeight: '100px' }}
                            // navbarScroll
                            style={{color: 'white'}}
                        >
                            {
                                user.isAuth ?
                                    <>
                                    <Button
                                        variant='outline-light'
                                        onClick={()=>navigate(ADMIN_PATH)}>
                                        Админ Панель
                                    </Button>
                                    <Button
                                        onClick={()=>{
                                            logOut()
                                            navigate(SHOP_PATH)
                                        }}
                                        variant='outline-light'
                                        className='ms-2'>
                                        Выйти
                                    </Button>
                                    </>
                                    :
                                    <>
                                    <Button
                                       onClick={()=>{navigate(LOGIN_PATH)}}
                                        variant='outline-light'>
                                        Авторизация
                                    </Button>
                                    </>
                            }
                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        );
    }
);

export default NavBar;
