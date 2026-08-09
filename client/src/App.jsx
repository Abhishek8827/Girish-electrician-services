import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";

function App() {
  return (
    <div className="min-h-screen bg-brand-black text-brand-white selection:bg-brand-yellow selection:text-brand-black">
      <Navbar />
      <main>
        <Hero />
        {/* Future sections will be added here */}
      </main>
    </div>
  );
}

export default App;
