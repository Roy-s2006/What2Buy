import React, { useState, useMemo } from "react";
import logo from "./assets/logo.png";
import { LAPTOPS } from "./laptops.js";
import sortIcon from "./assets/sort.png";
// Add your laptops here, one object per laptop, separated by commas.
// Copy the example below, edit the values, and keep going.
//
// useCase must be exactly one of: "student", "office", "gaming", "creative"
//
// { id: 1, name: "Acer Aspire 5", brand: "Acer", price: 42999, ram: 8, storage: 512, screen: 15.6, rating: 4.2, useCase: "student", battery: 9, weight: 1.7,
//   prices: { Amazon: 42999, Flipkart: 43499, Croma: 43999 } },
// { id: 1, name: "Acer Aspire 5", ..., image: "https://example.com/acer-aspire-5.jpg",
//   prices: { Amazon: 42999, Flipkart: 43499 } },


const USE_CASES = [
  { value: "all", label: "Any use" },
  { value: "student", label: "Student / everyday" },
  { value: "office", label: "Office / work" },
  { value: "gaming", label: "Gaming" },
  { value: "creative", label: "Creative / design" },
];

const SORTS = [
  { value: "recommended", label: "Recommended" },
  { value: "price_low", label: "Price: low to high" },
  { value: "price_high", label: "Price: high to low" },
  { value: "rating", label: "Rating: highest" },
  { value: "ram", label: "RAM: highest" },
];

function formatINR(n) {
  return "\u20b9" + n.toLocaleString("en-IN");
}

function LaptopCard({ laptop }) {
  const [expanded, setExpanded] = useState(false);
  const getPrice = (d) => (typeof d === "object" ? d.price : d);
const bestStore = Object.entries(laptop.prices).sort((a, b) => getPrice(a[1]) - getPrice(b[1]))[0];
bestStore[1] = getPrice(bestStore[1]);

  return (
    
    <div className="laptop-card" style={{
      background: "var(--surface-2)",
      border: "0.5px solid var(--border)",
      borderRadius: "12px",
      padding: "1.25rem",
      display: "flex",
      flexDirection: "column",
      gap: "10px",
    }}>
      <img
        src={laptop.image || "https://via.placeholder.com/300x200?text=No+Image"}
        alt={laptop.name}
         loading="lazy"
        style={{ width: "100%", height: "160px", objectFit: "contain", background: "#c4b08a", borderRadius: "8px" }}
      />
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
        <div>
          <p style={{ fontSize: "12px", color: "var(--text-muted)", margin: 0, letterSpacing: "0.02em", textTransform: "uppercase" }}>{laptop.brand}</p>
          <p style={{ fontWeight: 500, fontSize: "17px", margin: "2px 0 0" }}>{laptop.name}</p>
        </div>
        <div style={{ display: "flex", alignItems: "center", gap: "4px", background: "var(--bg-success)", color: "var(--text-success)", fontSize: "13px", fontWeight: 500, padding: "3px 8px", borderRadius: "999px" }}>
          <i className="ti ti-star" style={{ fontSize: "13px" }} aria-hidden="true"></i>
          {laptop.rating}
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: "8px", fontSize: "12.5px", fontFamily: "var(--font-mono)", color: "var(--text-secondary)", borderTop: "0.5px solid var(--border)", borderBottom: "0.5px solid var(--border)", padding: "10px 0" }}>
        <div><i className="ti ti-cpu" aria-hidden="true"></i> {laptop.ram}GB RAM</div>
        <div><i className="ti ti-device-sd-card" aria-hidden="true"></i> {laptop.storage}GB</div>
        <div><i className="ti ti-device-desktop" aria-hidden="true"></i> {laptop.screen}"</div>
        <div><i className="ti ti-battery" aria-hidden="true"></i> {laptop.battery}h</div>
      </div>

      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}>
        <span style={{ fontSize: "22px", fontWeight: 500 }}>{formatINR(laptop.price)}</span>
        <span style={{ fontSize: "12px", color: "var(--text-secondary)" }}>best: {bestStore[0]}</span>
      </div>
      <div style={{ display: "flex", gap: "6px", flexWrap: "wrap" }}>
        {laptop.gpu && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>{laptop.gpu}</span>}
        {laptop.buildQuality && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>{laptop.buildQuality} build</span>}
        {laptop.backlitKeyboard && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>Backlit keyboard</span>}
        {laptop.fingerprintSensor && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>Fingerprint sensor</span>}
        {laptop.touchscreen && <span style={{ fontSize: "11.5px", background: "var(--surface-1)", padding: "2px 8px", borderRadius: "999px", color: "var(--text-secondary)" }}>Touchscreen</span>}
      </div>

      <button onClick={() => setExpanded(!expanded)} style={{ fontSize: "13px" }}>
        {expanded ? "Hide price comparison" : "Compare prices"}
        <i className={`ti ti-chevron-${expanded ? "up" : "down"}`} style={{ marginLeft: "6px", fontSize: "13px" }} aria-hidden="true"></i>
      </button>

      {expanded && (
  <div style={{ display: "flex", flexDirection: "column", gap: "6px", marginTop: "2px" }}>
    {Object.entries(laptop.prices).map(([store, data]) => {
      const price = getPrice(data);
      const url = typeof data === "object" ? data.url : null;
      const isBest = price === bestStore[1];
      const rowStyle = { display: "flex", justifyContent: "space-between", alignItems: "center", fontSize: "13.5px", padding: "6px 10px", background: isBest ? "var(--bg-success)" : "var(--surface-1)", borderRadius: "6px", textDecoration: "none", cursor: url ? "pointer" : "default" };
      const content = (
        <>
          <span style={{ color: isBest ? "var(--text-success)" : "var(--text-secondary)" }}>{store}</span>
          <span style={{ fontWeight: 500, color: "var(--text-primary)" }}>{formatINR(price)}</span>
        </>
      );
      return url
        ? <a key={store} href={url} target="_blank" rel="noopener sponsored" style={rowStyle}>{content}</a>
        : <div key={store} style={rowStyle}>{content}</div>;
    })}
          <p style={{ fontSize: "11.5px", color: "var(--text-muted)", margin: "4px 0 0" }}>Sample prices for demo. Wire these to real affiliate links or a price API later.</p>
        </div>
      )}
    </div>
  );
}
const BRANDS = ["all", ...new Set(LAPTOPS.map(l => l.brand))].sort((a, b) => a === "all" ? -1 : a.localeCompare(b));
export default function App() {
  const [useCase, setUseCase] = useState("all");
  const [maxPrice, setMaxPrice] = useState(400000);
  const [minRam, setMinRam] = useState(0);
  const [sortBy, setSortBy] = useState("recommended");
  const [brand, setBrand] = useState("all");

  const filtered = useMemo(() => {
   let list = LAPTOPS.filter(l =>
  (useCase === "all" || l.useCase === useCase) &&
  (brand === "all" || l.brand === brand) &&
  l.price <= maxPrice &&
  l.ram >= minRam
);
    if (sortBy === "price_low") list = [...list].sort((a, b) => a.price - b.price);
    if (sortBy === "price_high") list = [...list].sort((a, b) => b.price - a.price);
    if (sortBy === "rating") list = [...list].sort((a, b) => b.rating - a.rating);
    if (sortBy === "ram") list = [...list].sort((a, b) => b.ram - a.ram);
    return list;
 }, [useCase, brand, maxPrice, minRam, sortBy]);

  return (
    <div style={{ maxWidth: "980px", margin: "0 auto", padding: "1.5rem", fontFamily: "var(--font-sans)" }}>
 <div style={{ marginBottom: "1.5rem", display: "flex", flexDirection: "column", alignItems: "center", textAlign: "center", gap: "8px" }}>
    <img src={logo} alt="What2Buy!" style={{ height: "100px", maxWidth: "90%" }} />

    <p style={{ color: "var(--text-primary)", fontWeight: 600, margin: 0 }}>Filter by what matters, compare prices, buy where it's cheapest.</p>
</div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))", gap: "12px", marginBottom: "1.5rem", background: "var(--surface-1)", padding: "1rem", borderRadius: "12px" }}>
        <div>
  <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Brand</label>
  <select value={brand} onChange={e => setBrand(e.target.value)} style={{ width: "100%" }}>
    {BRANDS.map(b => <option key={b} value={b}>{b === "all" ? "Any brand" : b}</option>)}
  </select>
</div>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Use case</label>
          <select value={useCase} onChange={e => setUseCase(e.target.value)} style={{ width: "100%" }}>
            {USE_CASES.map(u => <option key={u.value} value={u.value}>{u.label}</option>)}
          </select>
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Max price: {formatINR(maxPrice)}</label>
          <input type="range" min="30000" max="400000" step="5000" value={maxPrice} onChange={e => setMaxPrice(Number(e.target.value))} style={{ width: "100%" }} />
        </div>
        <div>
          <label style={{ display: "block", fontSize: "12px", color: "var(--text-secondary)", marginBottom: "4px" }}>Min RAM: {minRam}GB</label>
          <input type="range" min="0" max="16" step="8" value={minRam} onChange={e => setMinRam(Number(e.target.value))} style={{ width: "100%" }} />
        </div>
        <div style={{ display: "flex", alignItems: "center", position: "relative", width: "40px", height: "40px" }}>
  <img src={sortIcon} alt="Sort" style={{ width: "40px", height: "40px" }} />
  <select
    value={sortBy}
    onChange={e => setSortBy(e.target.value)}
    style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%", opacity: 0, cursor: "pointer" }}
  >
    {SORTS.map(s => <option key={s.value} value={s.value}>{s.label}</option>)}
  </select>
</div>      
      </div>

      <p style={{ fontSize: "13px", color: "var(--text-muted)", marginBottom: "1rem" }}>{filtered.length} laptops match</p>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: "14px" }}>
        {filtered.map(l => <LaptopCard key={l.id} laptop={l} />)}
      </div>

      {filtered.length === 0 && (
        <p style={{ textAlign: "center", color: "var(--text-muted)", padding: "2rem 0" }}>No laptops match these filters. Try widening your range.</p>
      )}

      <div style={{ marginTop: "2rem", border: "1px dashed var(--border-strong)", borderRadius: "12px", padding: "1.5rem", textAlign: "center", color: "var(--text-muted)", fontSize: "13px" }}>
        Ad space (300x250) — reserved for AdSense or affiliate banners once the site has traffic
      </div>
    </div>
  );
}