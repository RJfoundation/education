import Link from "next/link";

export default function Home() {
  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Welcome to Education Platform</h1>
      <p>A modern learning management system for JSC, SSC, and HSC students.</p>
      
      <div style={{ marginTop: "30px" }}>
        <Link href="/signup">
          <a style={{ marginRight: "20px", padding: "10px 20px", background: "#007bff", color: "white", textDecoration: "none", borderRadius: "5px" }}>
            Sign Up
          </a>
        </Link>
        
        <Link href="/dashboard">
          <a style={{ padding: "10px 20px", background: "#28a745", color: "white", textDecoration: "none", borderRadius: "5px" }}>
            Dashboard
          </a>
        </Link>
      </div>
    </div>
  );
}
