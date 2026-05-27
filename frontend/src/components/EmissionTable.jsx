import { useEffect, useState } from "react";
import axios from "axios";

export default function EmissionTable() {

    const [records, setRecords] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchRecords();

    }, []);

    const fetchRecords = async () => {

        try {

            const response = await axios.get(
                "http://127.0.0.1:8000/api/normalization/records/"
            );

            console.log(response.data);

            setRecords(response.data);

        } catch (error) {

            console.error("Error fetching records:", error);

        } finally {

            setLoading(false);
        }
    };

    const tableContainer = {
        backgroundColor: "white",
        padding: "30px",
        borderRadius: "12px",
        boxShadow: "0 2px 10px rgba(0,0,0,0.1)",
        marginTop: "30px"
    };

    const tableStyle = {
        width: "100%",
        borderCollapse: "collapse",
        marginTop: "20px"
    };

    const thStyle = {
        backgroundColor: "#e2e8f0",
        padding: "14px",
        textAlign: "left",
        fontSize: "15px"
    };

    const tdStyle = {
        padding: "14px",
        borderBottom: "1px solid #e5e7eb"
    };

    return (
        <div style={tableContainer}>

            <h2
                style={{
                    marginBottom: "10px",
                    color: "#0f172a"
                }}
            >
                Emission Records
            </h2>

            {loading ? (

                <p>Loading records...</p>

            ) : records.length === 0 ? (

                <div
                    style={{
                        padding: "20px",
                        border: "1px dashed #cbd5e1",
                        borderRadius: "8px",
                        textAlign: "center",
                        color: "#475569"
                    }}
                >
                    No records to display yet.
                    Upload data to populate the table.
                </div>

            ) : (

                <table style={tableStyle}>

                    <thead>

                        <tr>

                            <th style={{...thStyle, color: "#333", textAlign: "center"}}>ID</th>

                            <th style={{...thStyle, color: "#333", textAlign: "center"}}>Category</th>

                            <th style={{...thStyle, color: "#333", textAlign: "center"}}>Scope</th>

                            <th style={{...thStyle, color: "#333", textAlign: "center"}}>CO2E</th>

                            <th style={{...thStyle, color: "#333", textAlign: "center"}}>Status</th>

                        </tr>

                    </thead>

                    <tbody>

                        {records.map((record) => (

                            <tr
                                key={record.id}
                                style={{
                                    transition: "0.2s", color: "#0f172a",
                                    backgroundColor: "#f8fafc",
                                    borderRadius: "8px",
                                    marginBottom: "10px"
                                }}
                            >

                                <td style={{...tdStyle, textAlign: "center"}}>
                                    {record.id}
                                </td>

                                <td style={{...tdStyle, textAlign: "center"}}>
                                    {record.category}
                                </td>

                                <td style={{...tdStyle, textAlign: "center"}}>
                                    {record.scope}
                                </td>

                                <td style={{...tdStyle, textAlign: "center"}}>
                                    {record.co2e}
                                </td>

                                <td style={{...tdStyle, textAlign: "center"}}>

                                    <span
                                        style={{
                                            backgroundColor:
                                                record.status === "APPROVED"
                                                    ? "#16a34a"
                                                    : record.status === "REJECTED"
                                                    ? "#dc2626"
                                                    : "#f59e0b",

                                            color: "white",

                                            padding: "6px 12px",

                                            borderRadius: "20px",

                                            fontSize: "12px",

                                            fontWeight: "bold"
                                        }}
                                    >
                                        {record.status}
                                    </span>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            )}

        </div>
    );
}