import UploadPage from "./pages/UploadPage";
import DashboardPage from "./pages/DashboardPage";
import EmissionTable from "./components/EmissionTable";

function App() {

  return (
    <div style={{
      minHeight: "100vh",
      backgroundColor: "#f5f7fb",
      fontFamily: "Arial"
    }}>

      <div style={{
        backgroundColor: "#0f172a",
        color: "white",
        padding: "20px 40px",
        fontSize: "28px",
        fontWeight: "bold"
      }}>
        ESG Emission Management Platform
      </div>

      <div style={{
        padding: "30px"
      }}>

        <UploadPage />

        <DashboardPage />

        <EmissionTable />

      </div>
    </div>
  );
}

export default App;