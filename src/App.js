import { useState } from "react";

function App() {
  const COLLEGES = {
    TSS: "TSS-Avanthi-College",
    MRCE: "MRCE"
  };

  const tssYear = 3;
  const mrceYear = 1;

  const tssBatches = [
    "CSE-A",
    "CSE-B",
    "CSE-C",
    "DS",
    "AIML",
    "CSC",
    "ECE",
    "EEE",
    "CIV"
  ];

  const mrceBatches = [
    "CSE-C",
    "CSD-B",
    "CSD-A",
    "CSM-A",
    "CSM-C",
    "CSE-A",
    "CSE-D",
    "CSD-C",
    "CSM-B",
    "ECE-B",
    "CSE-E",
    "ECE-A",
    "CSE-B",
    "CSE-F"
  ];

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: COLLEGES.TSS,
    year: tssYear,
    batch: "",
    regNo: "",
    phNo: ""
  });

  const [availableBatches, setAvailableBatches] = useState(tssBatches);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");
  const [success, setSuccess] = useState(false);

  /* ---------- HANDLE INPUT CHANGE ---------- */
  const handleChange = (e) => {
    const { name, value } = e.target;

    // College change logic
    if (name === "college") {
      if (value === COLLEGES.MRCE) {
        setAvailableBatches(mrceBatches);
        setFormData((prev) => ({
          ...prev,
          college: value,
          year: mrceYear,
          batch: ""
        }));
      } else {
        setAvailableBatches(tssBatches);
        setFormData((prev) => ({
          ...prev,
          college: value,
          year: tssYear,
          batch: ""
        }));
      }
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  /* ---------- HANDLE SUBMIT ---------- */
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");
    setSuccess(false);

    try {
      const res = await fetch(
        "https://tssplatform.onrender.com/api/student/create-single",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(formData)
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Something went wrong");
      }

      setSuccess(true);
      setMessage("Student created successfully.");

      setFormData({
        name: "",
        email: "",
        college: formData.college,
        year: formData.year,
        batch: "",
        regNo: "",
        phNo: ""
      });
    } catch (error) {
      setSuccess(false);
      setMessage(error.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Create Student</h1>
        <p style={styles.subtitle}>TSS Student Management Portal</p>
      </div>

      <form style={styles.form} onSubmit={handleSubmit}>
        <div style={styles.grid}>
          <Input label="Full Name" name="name" value={formData.name} onChange={handleChange} />
          <Input label="Email Address" name="email" value={formData.email} onChange={handleChange} />
          <Input label="Register Number" name="regNo" value={formData.regNo} onChange={handleChange} />
          <Input label="Phone Number" name="phNo" value={formData.phNo} onChange={handleChange} />

          {/* College Dropdown */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>College</label>
            <select
              name="college"
              value={formData.college}
              onChange={handleChange}
              style={styles.input}
            >
              <option value={COLLEGES.TSS}>TSS-Avanthi-College</option>
              <option value={COLLEGES.MRCE}>MRCE</option>
            </select>
          </div>

          {/* Year */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Year</label>
            <input value={formData.year} disabled style={styles.disabledInput} />
          </div>

          {/* Batch Dropdown */}
          <div style={styles.inputGroup}>
            <label style={styles.label}>Batch</label>
            <select
              name="batch"
              value={formData.batch}
              onChange={handleChange}
              style={styles.input}
              required
            >
              <option value="">Select Batch</option>
              {availableBatches.map((batch, index) => (
                <option key={index} value={batch}>
                  {batch}
                </option>
              ))}
            </select>
          </div>
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating Student..." : "Create Student"}
        </button>

        {message && (
          <div
            style={{
              ...styles.message,
              backgroundColor: success ? "#e6f9f0" : "#ffe6e6",
              color: success ? "#0f9d58" : "#d93025"
            }}
          >
            {message}
          </div>
        )}
      </form>
    </div>
  );
}

/* ---------- REUSABLE INPUT ---------- */
const Input = ({ label, name, value, onChange }) => (
  <div style={styles.inputGroup}>
    <label style={styles.label}>{label}</label>
    <input
      type="text"
      name={name}
      value={value}
      onChange={onChange}
      style={styles.input}
      required
    />
  </div>
);

/* ---------- STYLES ---------- */
const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(135deg, #eef2f7, #d9e4f5)",
    padding: "60px 20px",
    fontFamily:
      "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif"
  },
  header: {
    textAlign: "center",
    marginBottom: "40px"
  },
  title: {
    fontSize: "32px",
    fontWeight: "600",
    marginBottom: "5px",
    color: "#1f2937"
  },
  subtitle: {
    fontSize: "14px",
    color: "#6b7280"
  },
  form: {
    maxWidth: "900px",
    margin: "0 auto"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "25px"
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column"
  },
  label: {
    marginBottom: "6px",
    fontSize: "14px",
    fontWeight: "500",
    color: "#374151"
  },
  input: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #cbd5e1",
    fontSize: "14px",
    outline: "none",
    backgroundColor: "#fff"
  },
  disabledInput: {
    padding: "10px 12px",
    borderRadius: "6px",
    border: "1px solid #e5e7eb",
    backgroundColor: "#f3f4f6",
    fontSize: "14px"
  },
  button: {
    marginTop: "35px",
    width: "100%",
    padding: "12px",
    background: "linear-gradient(90deg, #2563eb, #1e40af)",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "15px",
    fontWeight: "600",
    cursor: "pointer"
  },
  message: {
    marginTop: "20px",
    padding: "12px",
    borderRadius: "6px",
    textAlign: "center",
    fontSize: "14px",
    fontWeight: "500"
  }
};

export default App;