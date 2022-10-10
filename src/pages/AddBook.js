import React, { useState } from "react";
import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
import { useCreateProductMutation } from "../services/appApi";
import { useNavigate } from "react-router-dom";
import axios from "../axios";
import './AddBook.css';



function AddBook() {
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("");
    const [images, setImages] = useState([]);
    const [imgToRemove, setImgToRemove] = useState(null);
    const navigate = useNavigate();

    const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

    function handleRemoveImg(imgObj) {
        setImgToRemove(imgObj.public_id);
        axios
            .delete(`/images/${imgObj.public_id}/`)
            .then((res) => {
                setImgToRemove(null);
                setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
            })
            .catch((e) => console.log(e));
    }

    function handleSubmit(e) {
        e.preventDefault();
        if (!name || !description || !price || !category || !images.length) {
            return alert("Please fill out all the fields");
        }
        createProduct({ name, description, price, category, images }).then(({ data }) => {
            if (data.length > 0) {
                setTimeout(() => {
                    navigate("/");
                }, 1500);
            }
        });
    }

    function showWidget() {
        const widget = window.cloudinary.createUploadWidget(
            {
                cloudName: "dlpwhg7qc",
                uploadPreset: "RentUrBook",
            },
            (error, result) => {
                if (!error && result.event === "success") {
                    setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
                }
            }
        );
        widget.open();
    }
    return (

        <Container>
            <Row>
                <Col md={6} className="add-book_form_container">
                    <Form style={{ width: "100%" }} onSubmit={handleSubmit}> 
                        <h1 className="mt-4">Add your Book Details</h1>
                        {isSuccess && <Alert variant="success">Your Book Details added successfully!!!</Alert>}
                        {isError && <Alert variant="danger">{error.data}</Alert>}
                        <Form.Group className="mb-3">
                            <Form.Label>Book name</Form.Label>
                            <Form.Control type="text" placeholder="Enter Book name" value={name} required onChange={(e) => setName(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Book description</Form.Label>
                            <Form.Control as="textarea" placeholder="Book description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Form.Label>Renting Price($)</Form.Label>
                            <Form.Control type="number" placeholder="Renting Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
                        </Form.Group>

                        <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
                            <Form.Label>Category</Form.Label>
                            <Form.Select>
                                <option disabled selected>
                                    -- Select One --
                                </option>
                                <option value="general">general</option>
                                <option value="technical">technical</option>
                                <option value="novels">novels</option>
                                <option value="kids_stories">kids_stories</option>
                                <option value="competitive_exams">competitive_exams</option>

                            </Form.Select>
                        </Form.Group>

                        <Form.Group className="mb-3">
                            <Button className="upload_button" type="button" onClick={showWidget} >
                                Upload Images
                            </Button>
                            <div className="images-preview-container">
                                {images.map((image) => (
                                    <div className="image-preview">
                                        <img src={image.url} alt="book" />
                                        {/* adding icon for removing images */}
                                        {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
                                    </div>
                                ))}
                            </div>
                        </Form.Group>

                        <Form.Group>
                            <Button className="add_book_button" type="submit" disabled={isLoading || isSuccess}>
                                Add the Book
                            </Button>
                        </Form.Group>
                    </Form>
                </Col>
                <Col md={6} className="add-book_image_container"></Col>
            </Row>
        </Container>
    )

}

export default AddBook;


// import React, { useState } from "react";
// import { Alert, Col, Container, Form, Row, Button } from "react-bootstrap";
// import { useNavigate } from "react-router-dom";
// import { useCreateProductMutation } from "../services/appApi";
// import axios from "../axios";
// import "./AddBook.css";
// // import "./NewProduct.css";

// function NewProduct() {
//     const [name, setName] = useState("");
//     const [description, setDescription] = useState("");
//     const [price, setPrice] = useState("");
//     const [category, setCategory] = useState("");
//     const [images, setImages] = useState([]);
//     const [imgToRemove, setImgToRemove] = useState(null);
//     const navigate = useNavigate();
//     const [createProduct, { isError, error, isLoading, isSuccess }] = useCreateProductMutation();

//     function handleRemoveImg(imgObj) {
//         setImgToRemove(imgObj.public_id);
//         axios
//             .delete(`/images/${imgObj.public_id}/`)
//             .then((res) => {
//                 setImgToRemove(null);
//                 setImages((prev) => prev.filter((img) => img.public_id !== imgObj.public_id));
//             })
//             .catch((e) => console.log(e));
//     }

//     function handleSubmit(e) {
//         e.preventDefault();
//         if (!name || !description || !price || !category || !images.length) {
//             return alert("Please fill out all the fields");
//         }
//         createProduct({ name, description, price, category, images }).then(({ data }) => {
//             if (data.length > 0) {
//                 setTimeout(() => {
//                     navigate("/");
//                 }, 1500);
//             }
//         });
//     }

//     function showWidget() {
//         const widget = window.cloudinary.createUploadWidget(
//             {
//                 cloudName: "learn-code-10",
//                 uploadPreset: "dcizdwph",
//             },
//             (error, result) => {
//                 if (!error && result.event === "success") {
//                     setImages((prev) => [...prev, { url: result.info.url, public_id: result.info.public_id }]);
//                 }
//             }
//         );
//         widget.open();
//     }

//     return (
//         <Container>
//             <Row>
//                 <Col md={6} className="new-product__form--container">
//                     <Form style={{ width: "100%" }} onSubmit={handleSubmit}>
//                         <h1 className="mt-4">Create a product</h1>
//                         {isSuccess && <Alert variant="success">Product created with succcess</Alert>}
//                         {isError && <Alert variant="danger">{error.data}</Alert>}
//                         <Form.Group className="mb-3">
//                             <Form.Label>Product name</Form.Label>
//                             <Form.Control type="text" placeholder="Enter product name" value={name} required onChange={(e) => setName(e.target.value)} />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Product description</Form.Label>
//                             <Form.Control as="textarea" placeholder="Product description" style={{ height: "100px" }} value={description} required onChange={(e) => setDescription(e.target.value)} />
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Form.Label>Price($)</Form.Label>
//                             <Form.Control type="number" placeholder="Price ($)" value={price} required onChange={(e) => setPrice(e.target.value)} />
//                         </Form.Group>

//                         <Form.Group className="mb-3" onChange={(e) => setCategory(e.target.value)}>
//                             <Form.Label>Category</Form.Label>
//                             <Form.Select>
//                                 <option disabled selected>
//                                     -- Select One --
//                                 </option>
//                                 <option value="technology">technology</option>
//                                 <option value="tablets">tablets</option>
//                                 <option value="phones">phones</option>
//                                 <option value="laptops">laptops</option>
//                             </Form.Select>
//                         </Form.Group>

//                         <Form.Group className="mb-3">
//                             <Button type="button" onClick={showWidget}>
//                                 Upload Images
//                             </Button>
//                             <div className="images-preview-container">
//                                 {images.map((image) => (
//                                     <div className="image-preview">
//                                         <img src={image.url} />
//                                         {imgToRemove !== image.public_id && <i className="fa fa-times-circle" onClick={() => handleRemoveImg(image)}></i>}
//                                     </div>
//                                 ))}
//                             </div>
//                         </Form.Group>

//                         <Form.Group>
//                             <Button type="submit" disabled={isLoading || isSuccess}>
//                                 Create Product
//                             </Button>
//                         </Form.Group>
//                     </Form>
//                 </Col>
//                 <Col md={6} className="new-product__image--container"></Col>
//             </Row>
//         </Container>
//     );
// }

// export default NewProduct;



