import Header from "./Header";
import Body from "./Body";
import Footer from "./Footer";

export default function Dashboard() {
  return (
    
      <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>
      <Header />
      <main style={{ flex: 1 }}>
        <Body />
      </main>
      <Footer />
    </div>
  
    
  );
}
