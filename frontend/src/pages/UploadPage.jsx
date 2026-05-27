import { useState } from "react";
import axios from "axios";

export default function UploadPage() {
    const [file, setFile] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleUpload = async () => {

        if (!file) {
            alert("Please select a file");
            return;
        }

        const formData = new FormData();

        formData.append("file", file);
        formData.append("source_type", "SAP");
        formData.append("organization_id", 1);

        try {

            setLoading(true);

            const response = await axios.post(
                "http://127.0.0.1:8000/api/ingestion/upload/",
                formData
            );

            alert(response.data.message);

        } catch (error) {

            console.error(error);
            alert("Upload failed");

        } finally {
            setLoading(false);
        }
    };

    return (
        <div style={{
            backgroundColor: "white",
            padding: "30px",
            borderRadius: "12px",
            marginBottom: "30px",
            boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                    maxWidth: "600px",
                    margin: "0 auto"
        }}>

            <h2 style={{ marginBottom: "20px" , fontWeight: "bold", color: "#333"}}>
                Upload ESG Data
            </h2>

            <input
                type="file"
                onChange={(e) => setFile(e.target.files[0])}
                style={{ marginBottom: "20px" , padding: "10px", borderRadius: "8px", border: "1px solid #ccc" , width: "100%" , maxWidth: "400px" , fontSize: "16px" , color: "#333" , backgroundColor: "#f9f9f9" , cursor: "pointer" , transition: "background-color 0.3s ease" }}
            />

            <br />

            <button
                onClick={handleUpload}
                style={{
                    backgroundColor: "#628de9",
                    color: "white",
                    border: "none",
                    padding: "12px 24px",
                    borderRadius: "8px",
                    cursor: "pointer",
                    fontWeight: "bold"
                }}
            >
                {loading ? "Uploading..." : "Upload File"}
            </button>

        </div>
    );
}