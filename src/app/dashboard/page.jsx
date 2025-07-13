'use client';
import { useState, useEffect } from 'react';
import "@/app/dashboard/dashboard.css"  

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const userData = localStorage.getItem('user');
    if (userData) {
      setUser(JSON.parse(userData));
    }
  }, []);

  return (
    <div className="dashboard-content">
      <div className="dashboard-cards">
        <div className="card">
          <h3>Total Users</h3>
          <p className="card-number">150</p>
        </div>
        
        <div className="card">
          <h3>Total Products</h3>
          <p className="card-number">45</p>
        </div>
        
        <div className="card">
          <h3>Total Orders</h3>
          <p className="card-number">89</p>
        </div>
        
        <div className="card">
          <h3>Revenue</h3>
          <p className="card-number">$12,450</p>
        </div>
      </div>
      
      <div className="recent-activity">
        <h3>Recent Activity</h3>
        <div className="activity-list">
          <div className="activity-item">
            <span>New user registered</span>
            <span className="activity-time">2 hours ago</span>
          </div>
          <div className="activity-item">
            <span>Order #1234 completed</span>
            <span className="activity-time">4 hours ago</span>
          </div>
          <div className="activity-item">
            <span>Product updated</span>
            <span className="activity-time">6 hours ago</span>
          </div>
        </div>
      </div>
    </div>
  );
}