'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import "@/component/Sidebar.css"

export default function Sidebar({ userRole, onLogout }) {
  const router = useRouter();

  const adminMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'User Management', path: '/dashboard/users', icon: '👥' },
    { name: 'Customer Management', path: '/dashboard/customers', icon: '🛍️' },
    { name: 'Products', path: '/dashboard/products', icon: '📦' },
    { name: 'Orders', path: '/dashboard/orders', icon: '📋' },
    { name: 'Profile', path: '/dashboard/profile', icon: '👤' }
  ];

  const userMenu = [
    { name: 'Dashboard', path: '/dashboard', icon: '📊' },
    { name: 'Customer Management', path: '/dashboard/customers', icon: '🛍️' },
    { name: 'Products', path: '/dashboard/products', icon: '📦' },
    { name: 'Orders', path: '/dashboard/orders', icon: '📋' },
    { name: 'Profile', path: '/dashboard/profile', icon: '👤' }
  ];

  const menuItems = userRole === 'admin' ? adminMenu : userMenu;

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>{userRole === 'admin' ? 'Admin Panel' : 'User Panel'}</h2>
      </div>
      
      <ul className="sidebar-menu">
        {menuItems.map((item, index) => (
          <li key={index} className="menu-item">
            <Link href={item.path} className="menu-link">
              <span className="menu-icon">{item.icon}</span>
              <span className="menu-text">{item.name}</span>
            </Link>
          </li>
        ))}
        
        <li className="menu-item logout-item">
          <button onClick={onLogout} className="menu-link logout-btn">
            <span className="menu-icon">🚪</span>
            <span className="menu-text">Logout</span>
          </button>
        </li>
      </ul>
      
      <style jsx>{`
        
      `}</style>
    </div>
  );
}
