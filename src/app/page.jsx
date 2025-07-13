'use client';
import { Container, Row, Col, Button, Card } from 'react-bootstrap';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const features = [
    {
      title: 'Premium Quality',
      description: 'High-quality products crafted with attention to detail',
      icon: '⭐'
    },
    {
      title: 'Fast Delivery',
      description: 'Quick and reliable shipping to your doorstep',
      icon: '🚚'
    },
    {
      title: 'Secure Payment',
      description: 'Safe and secure payment processing',
      icon: '🔒'
    },
    {
      title: '24/7 Support',
      description: 'Round-the-clock customer support',
      icon: '💬'
    }
  ];

  useEffect(() => {
    fetchFeaturedProducts();
  }, []);

  const fetchFeaturedProducts = async () => {
    try {
      const response = await fetch('/api/products/featured');
      const data = await response.json();
      
      if (data.success) {
        setFeaturedProducts(data.data);
      }
    } catch (error) {
      console.error('Error fetching featured products:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section bg-primary text-white py-5">
        <Container>
          <Row className="align-items-center min-vh-75">
            <Col lg={6}>
              <h1 className="display-4 fw-bold mb-4">Welcome to Snich</h1>
              <p className="lead mb-4">
                Discover premium quality clothing and accessories. 
                Shop the latest trends with unbeatable prices and fast delivery.
              </p>
              <div className="d-flex gap-3">
                <Button as={Link} href="/products" variant="light" size="lg">
                  Shop Now
                </Button>
                <Button as={Link} href="/login" variant="outline-light" size="lg">
                  Login
                </Button>
              </div>
            </Col>
            <Col lg={6} className="text-center">
              <div className="hero-image">
                <h2 className="display-1">🛍️</h2>
                <p className="fs-4">Premium Fashion Store</p>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Features Section */}
      <section className="py-5">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Why Choose Us?</h2>
              <p className="text-muted">We provide the best shopping experience</p>
            </Col>
          </Row>
          <Row>
            {features.map((feature, index) => (
              <Col md={6} lg={3} key={index} className="mb-4">
                <Card className="h-100 text-center border-0 shadow-sm">
                  <Card.Body>
                    <div className="fs-1 mb-3">{feature.icon}</div>
                    <Card.Title>{feature.title}</Card.Title>
                    <Card.Text className="text-muted">
                      {feature.description}
                    </Card.Text>
                  </Card.Body>
                </Card>
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* Featured Products */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="text-center mb-5">
            <Col>
              <h2 className="fw-bold">Featured Products</h2>
              <p className="text-muted">Check out our best-selling items</p>
            </Col>
          </Row>
          <Row>
            {loading ? (
              <Col className="text-center">
                <p>Loading featured products...</p>
              </Col>
            ) : featuredProducts.length > 0 ? (
              featuredProducts.map((product) => (
                <Col md={6} lg={3} key={product._id} className="mb-4">
                  <Card className="h-100 shadow-sm">
                    <Card.Body className="text-center">
                      {product.images?.medium ? (
                        <img 
                          src={product.images.medium} 
                          alt={product.name}
                          style={{ width: '100%', height: '150px', objectFit: 'cover', borderRadius: '4px' }}
                          className="mb-3"
                        />
                      ) : (
                        <div className="fs-1 mb-3">📦</div>
                      )}
                      <Card.Title className="fs-5">{product.name}</Card.Title>
                      <Card.Text className="fw-bold text-primary fs-4">
                        ${product.price}
                      </Card.Text>
                      <Button variant="primary" size="sm">
                        Add to Cart
                      </Button>
                    </Card.Body>
                  </Card>
                </Col>
              ))
            ) : (
              <Col className="text-center">
                <p className="text-muted">No featured products available</p>
              </Col>
            )}
          </Row>
          <Row className="text-center mt-4">
            <Col>
              <Button as={Link} href="/products" variant="outline-primary" size="lg">
                View All Products
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* CTA Section */}
      <section className="py-5 bg-dark text-white">
        <Container>
          <Row className="text-center">
            <Col>
              <h2 className="fw-bold mb-3">Ready to Start Shopping?</h2>
              <p className="lead mb-4">
                Join thousands of satisfied customers and discover amazing deals
              </p>
              <div className="d-flex justify-content-center gap-3">
                <Button as={Link} href="/register" variant="light" size="lg">
                  Sign Up Now
                </Button>
                <Button as={Link} href="/about" variant="outline-light" size="lg">
                  Learn More
                </Button>
              </div>
            </Col>
          </Row>
        </Container>
      </section>

      <style jsx>{`
        .min-vh-75 {
          min-height: 75vh;
        }
        
        .hero-section {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
        }
        
        .hero-image {
          animation: float 3s ease-in-out infinite;
        }
        
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
      `}</style>
    </>
  );
}
