function App() {
  return (
    <div className="min-h-screen bg-brand-black flex items-center justify-center">
      <div className="text-center">
        <h1 className="text-5xl font-bold text-brand-yellow text-glow-yellow mb-4">
          Girish Electrician Services
        </h1>
        <p className="text-brand-gray text-xl">
          Tailwind v4 Foundation:{" "}
          <span className="text-brand-white font-mono">ACTIVE</span>
        </p>
        <button className="mt-6 px-6 py-2 bg-brand-yellow text-brand-black font-bold rounded-full glow-yellow hover:bg-brand-yellow-glow transition-all">
          Test Button
        </button>
      </div>
    </div>
  );
}

export default App;
