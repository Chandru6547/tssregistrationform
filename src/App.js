import { useState } from "react";

function App() {
  const fixedCollege = "TSS-Avanthi-College";
  const fixedYear = 3;

  const batches = [
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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    college: fixedCollege,
    year: fixedYear,
    batch: "",
    regNo: "",
    phNo: ""
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

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

      setMessage("✅ Student Created Successfully!");
      setFormData({
        name: "",
        email: "",
        college: fixedCollege,
        year: fixedYear,
        batch: "",
        regNo: "",
        phNo: ""
      });

    } catch (error) {
      setMessage("❌ " + error.message);
    }

    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <form style={styles.form} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Create Student</h2>

        <div style={styles.formGroup}>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Email</label>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>College</label>
          <input
            type="text"
            value={formData.college}
            disabled
            style={{ ...styles.input, backgroundColor: "#f3f3f3" }}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Year</label>
          <input
            type="text"
            value={formData.year}
            disabled
            style={{ ...styles.input, backgroundColor: "#f3f3f3" }}
          />
        </div>

        <div style={styles.formGroup}>
          <label>Batch</label>
          <select
            name="batch"
            value={formData.batch}
            onChange={handleChange}
            style={styles.input}
            required
          >
            <option value="">Select Batch</option>
            {batches.map((batch, index) => (
              <option key={index} value={batch}>
                {batch}
              </option>
            ))}
          </select>
        </div>

        <div style={styles.formGroup}>
          <label>Register Number</label>
          <input
            type="text"
            name="regNo"
            value={formData.regNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label>Phone Number</label>
          <input
            type="text"
            name="phNo"
            value={formData.phNo}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Creating..." : "Submit"}
        </button>

        {message && (
          <p style={{ marginTop: "15px", textAlign: "center" }}>
            {message}
          </p>
        )}
      </form>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    background: "#f4f6f9"
  },
  form: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.1)"
  },
  heading: {
    textAlign: "center",
    marginBottom: "20px"
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    marginBottom: "15px"
  },
  input: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginTop: "5px"
  },
  button: {
    width: "100%",
    padding: "10px",
    background: "#007bff",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};

export default App;
