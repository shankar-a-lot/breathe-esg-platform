import { useEffect, useState } from "react";
import axios from "axios";

export default function DashboardPage() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetchSummary();
    }, []);

    const fetchSummary = async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await axios.get(
                "http://127.0.0.1:8000/api/normalization/summary/"
            );

            setData(response.data);
        } catch (error) {
            console.error(error);
            setError("Failed to load dashboard summary.");
            setData(null);
        } finally {
            setLoading(false);
        }
    };

    const cardStyle = {
        backgroundColor: "white",
        padding: "25px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        flex: 1,
        minWidth: "250px",
        minHeight: "110px",
        textAlign: "center",
        color: "#333"
    };

    const valueStyle = {
        fontSize: "40px",
        marginTop: "8px",
        marginBottom: 0,
        color: "#43548d",
        fontWeight: "bold"
    };

    return (
        <div style={{ marginBottom: "30px" }}>
            <h2 style={{ marginBottom: "20px"}}>ESG Dashboard</h2>

            {error ? (
                <div
                    style={{
                        backgroundColor: "#fee2e2",
                        color: "#991b1b",
                        padding: "14px 16px",
                        borderRadius: "10px",
                        marginBottom: "20px"
                    }}
                >
                    {error}
                </div>
            ) : null}

            <div
                style={{
                    display: "flex",
                    gap: "20px",
                    flexWrap: "wrap"
                }}
            >
                <div style={cardStyle}>
                    <h3>Total Emissions</h3>
                    <div style={valueStyle}>
                        {loading ? "..." : data?.total_emissions ?? "—"}
                    </div>
                </div>

                <div style={cardStyle}>
                    <h3>Total Records</h3>
                    <div style={valueStyle}>
                        {loading ? "..." : data?.total_records ?? "—"}
                    </div>
                </div>

                <div style={cardStyle}>
                    <h3>Flagged Records</h3>
                    <div style={valueStyle}>
                        {loading ? "..." : data?.flagged_records ?? "—"}
                    </div>
                </div>
            </div>
        </div>
    );
}

