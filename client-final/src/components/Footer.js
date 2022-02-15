import React from 'react';
import logo from '../style/icons/logoFooter.svg'
import '../css/footer.css'
import { Container, Navbar, Nav } from 'react-bootstrap';


export const Footer = () => {
    return (

        <Navbar className="footer">
            <Container >
                <Nav.Link href="/" className="logo-footer" >
                    <img src={logo} />
                </Nav.Link>

                <Nav className="navFooter" as='ul' >
                    <Nav.Item as="li" className="footer-category">
                        <Nav.Link eventKey="disabled" className="footer-category" >BREAKFAST</Nav.Link>
                    </Nav.Item>

                    <Nav.Item as="li" className="footer-category" >
                        <Nav.Link eventKey="disabled" className="footer-category">BRUNCH</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="footer-category">
                        <Nav.Link eventKey="disabled" className="footer-category">LUNCH</Nav.Link>
                    </Nav.Item>
                    <Nav.Item as="li" className="footer-category">
                        <Nav.Link eventKey="disabled" className="footer-category">DINNER</Nav.Link>
                    </Nav.Item>
                </Nav>



                <div className="copyright">
                    <span>Baby's Food Place</span> <br />
                    <span>copyright © 2021</span>
                </div>
            </Container>
        </Navbar>

    )
}






// export const Footer = () => {
//     return (

//         <div className="container-footer">
//             <div className="logo-footer">
//                 <img  src={logo} alt="" />
//             </div>
//             <div className="categories">
//                 <p className="footer-cat">Breakfast</p> <br />
//                 <div className="circle-3"></div>
//                 <p className="footer-cat">Brunch</p>
//                 <div className="circle-3"></div>
//                 <p className="footer-cat">Lunch</p>
//                 <div className="circle-3"></div>
//                 <p className="footer-cat">Dinner</p>
//             </div>

//             <div className="copyright">
//                 <span>Baby's Food Place</span> <br />
//                 <span>copyright © 2021</span>
//             </div>

//         </div>
//     );
// };
