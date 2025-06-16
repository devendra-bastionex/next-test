import Link from "next/link";
import React from "react";

export default function Header() {
  return (
    <header>
        <main>
            <div className="header-logo">Logo</div>
            <ul className="header-menu">
                <li><Link href="/">Home</Link></li>
                <li><Link href="/about">About</Link></li>
                <li><Link href="/course">Course</Link></li>
                <li><Link href="/login">Login</Link></li>
            </ul>
        </main>
    </header>
  );
}
