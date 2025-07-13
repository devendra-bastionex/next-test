'use client';
import { useState, useEffect } from 'react';
import { Modal, Form, Button, Row, Col, Alert, Spinner } from 'react-bootstrap';
import { Formik } from 'formik';
import * as Yup from 'yup';

const validationSchema = Yup.object({
  name: Yup.string()
    .min(2, 'Product name must be at least 2 characters')
    .required('Product name is required'),
  description: Yup.string()
    .min(10, 'Description must be at least 10 characters')
    .required('Description is required'),
  price: Yup.number()
    .min(0, 'Price must be positive')
    .required('Price is required'),
  stock: Yup.number()
    .min(0, 'Stock must be positive')
    .integer('Stock must be a whole number')
    .required('Stock is required'),
  category: Yup.string()
    .min(2, 'Category must be at least 2 characters')
    .required('Category is required'),
  status: Yup.string().required('Status is required')
});

export default function ProductModal({ isOpen, onClose, product, onSave }) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  console.log("product===>>>", product);
  
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);

  const initialValues = {
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || '',
    stock: product?.stock || '',
    category: product?.category || '',
    status: product?.status || 'Active',
    image:product?.images?.medium || ''
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (values) => {
    setLoading(true);
    setError('');

    try {
      const url = product ? `/api/products/${product._id}` : '/api/products';
      const method = product ? 'PUT' : 'POST';

      const formData = new FormData();
      
      // Append form fields
      Object.keys(values).forEach(key => {
        formData.append(key, values[key]);
      });
      
      // Append image if selected
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      const response = await fetch(url, {
        method,
        body: formData, // Remove Content-Type header for FormData
      });

      const data = await response.json();

      if (data.success) {
        onSave(data.data);
        onClose();
        setSelectedImage(null);
        setImagePreview(null);
      } else {
        setError(data.error || 'Something went wrong');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal show={isOpen} onHide={onClose} size="lg" centered>
      <Modal.Header closeButton>
        <Modal.Title>{product ? 'Edit Product' : 'Add Product'}</Modal.Title>
      </Modal.Header>
      
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit: formikSubmit, isValid }) => (
          <>
            <Modal.Body>
              <Form onSubmit={formikSubmit}>
                {error && <Alert variant="danger">{error}</Alert>}
                
                <Form.Group className="mb-3">
                  <Form.Label>Product Image</Form.Label>
                  <Form.Control
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                  />
                  {imagePreview && (
                    <div className="mt-2">
                      <img 
                        src={imagePreview} 
                        alt="Preview" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </div>
                  )}
                  {values?.image && (
                    <div className="mt-2">
                      <img 
                        src={values?.image} 
                        alt="old" 
                        style={{ width: '100px', height: '100px', objectFit: 'cover', borderRadius: '4px' }}
                      />
                    </div>
                  )}
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Product Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={values.name}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.name && errors.name}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.name}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="description"
                    value={values.description}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    isInvalid={touched.description && errors.description}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.description}
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Price</Form.Label>
                      <Form.Control
                        type="number"
                        name="price"
                        value={values.price}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="0"
                        step="0.01"
                        isInvalid={touched.price && errors.price}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.price}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Stock</Form.Label>
                      <Form.Control
                        type="number"
                        name="stock"
                        value={values.stock}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        min="0"
                        isInvalid={touched.stock && errors.stock}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.stock}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                
                <Row>
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Category</Form.Label>
                      <Form.Control
                        type="text"
                        name="category"
                        value={values.category}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.category && errors.category}
                      />
                      <Form.Control.Feedback type="invalid">
                        {errors.category}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                  
                  <Col md={6}>
                    <Form.Group className="mb-3">
                      <Form.Label>Status</Form.Label>
                      <Form.Select
                        name="status"
                        value={values.status}
                        onChange={handleChange}
                        onBlur={handleBlur}
                        isInvalid={touched.status && errors.status}
                      >
                        <option value="Active">Active</option>
                        <option value="Inactive">Inactive</option>
                      </Form.Select>
                      <Form.Control.Feedback type="invalid">
                        {errors.status}
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
              </Form>
            </Modal.Body>
            
            <Modal.Footer>
              <Button variant="secondary" onClick={onClose}>
                Cancel
              </Button>
              <Button 
                variant="primary" 
                onClick={formikSubmit}
                disabled={loading || !isValid}
              >
                {loading ? (
                  <>
                    <Spinner size="sm" className="me-2" />
                    Saving...
                  </>
                ) : (
                  'Save'
                )}
              </Button>
            </Modal.Footer>
          </>
        )}
      </Formik>
    </Modal>
  );
}