import React, { useEffect } from 'react';
// import { Col, Row } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { LinkContainer } from 'react-router-bootstrap';
// import categories from '../categories';
import axios from '../axios';
import { useDispatch, useSelector } from "react-redux";
import ProductPreview from '../components/ProductPreview';
import { updateProducts } from '../features/productSlice';
// import salebanner from '../images/banner5.jpg';
import './Home.css';

function Home() {
    const dispatch = useDispatch();
    const products = useSelector((state) => state.products);
    const lastProducts = products.slice(0, 8);

    useEffect(() => {
        axios.get('/products').then(({ data }) => dispatch(updateProducts(data)));
     
    },[dispatch]);

  return (
    <div>     
     <div className="featured-products-container container mt-4">
     <h2>New Arrivals</h2>
     {/* last products here --> comes from the backend */}
     <div className="d-flex justify-content-center flex-wrap">
                    {lastProducts.map((product) => (
                        <ProductPreview {...product} />
                    ))}
                </div>
      
      <div>
                    <Link to="/category/all" style={{ textAlign: "right", display: "block", textDecoration: "none" }}>
                        See more {">>"}<br></br>
                    </Link>
                </div>
      </div>
      {/* banner display */}
      {/* <div className="sale_banner_container mt-4">
                <img src={salebanner} width="50%"  alt="book"/>
            </div> */}
            {/* <div className="recent-products-container container mt-4">
                <h2>Categories</h2>
                <Row>
                    {categories.map((category) => (
                        <LinkContainer to={`/category/${category.name.toLocaleLowerCase()}`}>
                            <Col md={4}>
                                <div style={{ backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${category.img})`, gap: "10px" }} className="category-tile">
                                    {category.name}
                                </div>
                            </Col>
                        </LinkContainer>
                    ))}
                      
                </Row>
            </div> */}
      </div>
  )
}

export default Home