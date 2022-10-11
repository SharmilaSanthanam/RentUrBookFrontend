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
                                <option value="TechnicalBooks">Technical Books</option>
                                <option value="KidsStoryBooks">Kids Story Books</option>
                                <option value="Novels">Novels</option>

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