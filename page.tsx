"use client";

import React, { useState, useEffect } from "react";

export default function Home() {
  const [routes, setRoutes] = useState([]);
  const [formStatus, setFormStatus] = useState({ message: "", type: "" });
  const [loading, setLoading] = useState(false);

  const scriptURL = "https://script.google.com/macros/s/AKfycbwIFCijBHaw2DUGqX_6RfKL8wFotXwwnMHOdfqv1qkmsKyPYIwNZUI2NTdy9Cz1_O8sgw/exec";
  const sheetAPI = "https://opensheet.elk.sh/AKfycbwIFCijBHaw2DUGqX_6RfKL8wFotXwwnMHOdfqv1qkmsKyPYIwNZUI2NTdy9Cz1_O8sgw/Bookings";

  useEffect(() => {
    fetch(sheetAPI)
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setRoutes(data.filter((row) => row.Status === "Confirmed"));
        }
      })
      .catch((err) => console.error("Error fetching routes:", err));
  }, []);

  const handleBookingSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());

    try {
      await fetch(scriptURL, { method: "POST", body: JSON.stringify(data) });
      setFormStatus({ message: "Request received! We'll contact you shortly.", type: "success" });
      e.target.reset();
    } catch (error) {
      setFormStatus({ message: "Submission error. Please call Kyle directly.", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#020617", color: "#f8fafc", fontFamily: "system-ui, -apple-system, sans-serif", scrollBehavior: "smooth" }}>
      
      {/* --- Premium Navigation --- */}
      <nav style={{ 
        position: "fixed", top: 0, width: "100%", zIndex: 1000, 
        backdropFilter: "blur(12px)", backgroundColor: "rgba(15, 23, 42, 0.8)",
        borderBottom: "1px solid rgba(255,255,255,0.1)", padding: "1rem 2rem"
      }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "1.25rem", fontWeight: "800", letterSpacing: "-0.05em", color: "#60a5fa" }}>INDEPENDENT BLADE</h1>
          <div style={{ display: "flex", gap: "2rem" }}>
            {["Services", "Industries", "Booking", "Contact"].map((item) => (
              <a key={item} href={`#${item.toLowerCase()}`} style={{ fontSize: "0.875rem", fontWeight: "500", color: "#94a3b8", textDecoration: "none" }}>{item}</a>
            ))}
          </div>
        </div>
      </nav>

      {/* --- Hero Section --- */}
      <header style={{ 
        padding: "160px 20px 100px", textAlign: "center", 
        background: "radial-gradient(circle at top, #1e293b 0%, #020617 100%)" 
      }}>
        <h2 style={{ fontSize: "clamp(2.5rem, 6vw, 4rem)", fontWeight: "800", letterSpacing: "-0.02em", marginBottom: "1.5rem" }}>
          Precision Tooling. <span style={{ color: "#3b82f6" }}>Expert Care.</span>
        </h2>
        <p style={{ maxWidth: "600px", margin: "0 auto", color: "#94a3b8", fontSize: "1.25rem", lineHeight: "1.6" }}>
          Premium blade sharpening and supply for industrial operations across the Highveld and Lowveld.
        </p>
        <div style={{ marginTop: "2.5rem" }}>
          <a href="#booking" style={{ 
            backgroundColor: "#2563eb", color: "white", padding: "1rem 2.5rem", 
            borderRadius: "99px", fontWeight: "600", textDecoration: "none", display: "inline-block" 
          }}>Book a Service</a>
        </div>
      </header>

      {/* --- Services --- */}
      <section id="services" style={{ maxWidth: "1200px", margin: "0 auto", padding: "100px 20px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "2rem" }}>
          <ServiceCard title="Blade Sharpening" desc="State-of-the-art precision for circular saws, planers, and custom industrial tooling." />
          <ServiceCard title="Logistics" desc="Integrated collection and delivery routes to keep your production line moving." />
          <ServiceCard title="Premium Supply" desc="Authorized supplier of high-performance commercial blades tailored to your industry." />
        </div>
      </section>

      {/* --- Industries --- */}
      <section id="industries" style={{ backgroundColor: "#0f172a", padding: "100px 20px" }}>
        <div style={{ maxWidth: "1200px", margin: "0 auto", textAlign: "center" }}>
          <h3 style={{ fontSize: "2rem", marginBottom: "3rem" }}>Industries We Empower</h3>
          <div style={{ display: "flex", flexWrap: "wrap", justifyContent: "center", gap: "1rem" }}>
            {["Sawmills", "Shopfitters", "Furniture", "Packaging", "Joinery", "Grooming"].map((ind) => (
              <span key={ind} style={{ padding: "0.75rem 1.5rem", backgroundColor: "rgba(255,255,255,0.05)", borderRadius: "8px", border: "1px solid rgba(255,255,255,0.1)" }}>{ind}</span>
            ))}
          </div>
        </div>
      </section>

      {/* --- Booking Form --- */}
      <section id="booking" style={{ padding: "100px 20px" }}>
        <div style={{ 
          maxWidth: "800px", margin: "0 auto", backgroundColor: "#1e293b", 
          padding: "3rem", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.1)" 
        }}>
          <h3 style={{ fontSize: "2rem", marginBottom: "0.5rem", textAlign: "center" }}>Service Request</h3>
          <p style={{ textAlign: "center", color: "#94a3b8", marginBottom: "2.5rem" }}>Turnaround: 3–5 Business Days</p>
          
          <form onSubmit={handleBookingSubmit} style={{ display: "grid", gap: "1.25rem" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <input name="name" placeholder="Full Name" required style={inputStyle} />
              <input name="phone" placeholder="Phone Number" required style={inputStyle} />
            </div>
            <input name="email" type="email" placeholder="Email Address" required style={inputStyle} />
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1.25rem" }}>
              <input name="area" placeholder="Area (e.g. Secunda)" required style={inputStyle} />
              <input name="date" type="date" required style={inputStyle} />
            </div>
            <textarea name="notes" placeholder="Notes (Quantity, blade types...)" style={{ ...inputStyle, minHeight: "120px" }} />
            
            <button type="submit" disabled={loading} style={{ 
              backgroundColor: "#3b82f6", color: "white", padding: "1.25rem", 
              borderRadius: "12px", fontWeight: "700", border: "none", cursor: "pointer" 
            }}>
              {loading ? "PROCESSING..." : "CONFIRM BOOKING"}
            </button>
          </form>
          {formStatus.message && (
            <div style={{ 
              marginTop: "1.5rem", textAlign: "center", padding: "1rem", borderRadius: "8px",
              backgroundColor: formStatus.type === "success" ? "rgba(34,197,94,0.1)" : "rgba(239,68,68,0.1)",
              color: formStatus.type === "success" ? "#4ade80" : "#f87171"
            }}>{formStatus.message}</div>
          )}
        </div>
      </section>

      {/* --- Upcoming Routes --- */}
      <section id="routes" style={{ maxWidth: "1200px", margin: "0 auto", padding: "0 20px 100px" }}>
        <h3 style={{ fontSize: "1.5rem", marginBottom: "2rem", textAlign: "center" }}>Planned Service Routes</h3>
        <div style={{ display: "grid", gap: "1rem" }}>
          {routes.length > 0 ? routes.map((r, i) => (
            <div key={i} style={{ display: "flex", justifyContent: "space-between", padding: "1.5rem", backgroundColor: "rgba(255,255,255,0.03)", borderRadius: "12px", border: "1px solid rgba(255,255,255,0.05)" }}>
              <span style={{ fontWeight: "700", color: "#3b82f6" }}>{r["Preferred Date"]}</span>
              <span>{r.Area}</span>
            </div>
          )) : <p style={{ textAlign: "center", color: "#64748b" }}>No active routes scheduled.</p>}
        </div>
      </section>

      {/* --- Footer --- */}
      <footer id="contact" style={{ backgroundColor: "#020617", padding: "60px 20px", borderTop: "1px solid rgba(255,255,255,0.05)", textAlign: "center" }}>
        <p style={{ color: "#94a3b8", marginBottom: "1rem" }}>Kyle: 084 035 6467 | indblade27@gmail.com</p>
        <p style={{ fontSize: "0.75rem", opacity: 0.5 }}>© 2026 INDEPENDENT BLADE. ALL RIGHTS RESERVED.</p>
      </footer>

      {/* WhatsApp Button */}
      <a href="https://wa.me/27840356467" target="_blank" style={{ 
        position: "fixed", bottom: "30px", right: "30px", width: "60px", height: "60px", 
        backgroundColor: "#22c55e", borderRadius: "50%", display: "flex", 
        alignItems: "center", justifyContent: "center", textDecoration: "none", fontSize: "2rem" 
      }}>💬</a>
    </div>
  );
}

const inputStyle = {
  backgroundColor: "rgba(15, 23, 42, 0.5)", border: "1px solid rgba(255,255,255,0.1)",
  borderRadius: "12px", padding: "1rem", color: "white", outline: "none", fontSize: "1rem"
};

function ServiceCard({ title, desc }) {
  return (
    <div style={{ padding: "2.5rem", backgroundColor: "#0f172a", borderRadius: "24px", border: "1px solid rgba(255,255,255,0.05)" }}>
      <h4 style={{ fontSize: "1.5rem", marginBottom: "1rem", color: "#3b82f6" }}>{title}</h4>
      <p style={{ color: "#94a3b8", lineHeight: "1.6" }}>{desc}</p>
    </div>
  );
}
