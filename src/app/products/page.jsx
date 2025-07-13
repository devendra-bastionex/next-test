'use client';
import { Container, Row, Col, Card, Button, Spinner } from 'react-bootstrap';
import { useState, useEffect } from 'react';

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;
    
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products');
        const data = await response.json();
        
        if (isMounted && data.success) {
          setProducts(data.data);
        } else if (isMounted) {
          setError('Failed to load products');
        }
      } catch (error) {
        if (isMounted) {
          setError('Network error. Please try again.');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    };
    
    loadProducts();
    
    return () => {
      isMounted = false;
    };
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await fetch('/api/products');
      const data = await response.json();
      
      if (data.success) {
        setProducts(data.data);
      } else {
        setError('Failed to load products');
      }
    } catch (error) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Container className="py-5 text-center">
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
        <p className="mt-2">Loading products...</p>
      </Container>
    );
  }

  if (error) {
    return (
      <Container className="py-5 text-center">
        <div className="alert alert-danger">{error}</div>
        <Button onClick={fetchProducts} variant="primary">
          Try Again
        </Button>
      </Container>
    );
  }

  return (
    <Container className="py-5">
      <Row className="text-center mb-5">
        <Col>
          <h1 className="fw-bold">Our Products</h1>
          <p className="text-muted">Discover our amazing collection of premium products</p>
        </Col>
      </Row>
      
      {products.length === 0 ? (
        <Row>
          <Col className="text-center">
            <p className="text-muted">No products available</p>
          </Col>
        </Row>
      ) : (
        <Row>
          {products.map((product) => (
            <Col md={6} lg={3} key={product._id} className="mb-4">
              <Card className="h-100 shadow-sm">
                <Card.Body className="text-center">
                  {product.images?.medium ? (
                    <img 
                      src={product.images.medium} 
                      alt={product.name}
                      style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '4px' }}
                      className="mb-3"
                    />
                  ) : (
                    <div className="fs-1 mb-3">📦</div>
                  )}
                  <Card.Title className="fs-5">{product.name}</Card.Title>
                  <Card.Text className="text-muted small">
                    {product.category}
                  </Card.Text>
                  <Card.Text className="fw-bold text-primary fs-4">
                    ${product.price}
                  </Card.Text>
                  <Card.Text className="text-muted small">
                    Stock: {product.stock}
                  </Card.Text>
                  <Button variant="primary" size="sm">
                    Add to Cart
                  </Button>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </Container>
  );
}