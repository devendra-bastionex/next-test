'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Container, Row, Col, Spinner } from 'react-bootstrap';
import Sidebar from '@/component/Sidebar';

export default function DashboardLayout({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (!token || !userData) {
      router.push('/login');
      return;
    }
    
    try {
      setUser(JSON.parse(userData));
    } catch (error) {
      router.push('/login');
    } finally {
      setLoading(false);
    }
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem('token');
    
    try {
      await fetch('/api/users/logout', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
    } catch (error) {
      console.error('Logout API failed:', error);
    }
    
    localStorage.clear();
    router.push('/login');
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: '100vh' }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <Container fluid className="p-0">
      <Row className="g-0">
        <Col xs={12} md={3} lg={2} className="sidebar-col">
          <Sidebar userRole={user.role} onLogout={handleLogout} />
        </Col>
        
        <Col xs={12} md={9} lg={10} className="main-content-col">
          <div className="content-header bg-white border-bottom px-4 py-3">
            <div className="d-flex justify-content-between align-items-center">
              <h4 className="mb-0">Welcome, {user.name}</h4>
              <span className="badge bg-primary">{user.role.toUpperCase()}</span>
            </div>
          </div>
          
          <div className="content-body p-4">
            {children}
          </div>
        </Col>
      </Row>
      
      <style jsx>{`
        .sidebar-col {
          position: fixed;
          height: 100vh;
          z-index: 1000;
        }
        
        .main-content-col {
          margin-left: 16.666667%; /* Bootstrap col-md-2 width */
          min-height: 100vh;
          background-color: #f8f9fa;
        }
        
        @media (max-width: 768px) {
          .sidebar-col {
            position: relative;
            height: auto;
          }
          
          .main-content-col {
            margin-left: 0;
          }
        }
      `}</style>
    </Container>
  );
}