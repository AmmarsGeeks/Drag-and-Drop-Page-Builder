"use client"

export default function DashboardPage() {
  // Dummy state to replace useFormContext
  const state = {
    forms: [
      { id: 1, title: "Form A", visits: 10, submissions: 5 },
      { id: 2, title: "Form B", visits: 20, submissions: 10 }
    ],
    pendingForms: {
      3: { id: 3, title: "Form C (Pending)", visits: 0, submissions: 0 }
    }
  };
  
  const allForms = [
    ...state.forms,
    ...Object.values(state.pendingForms)
  ];
  
  const stats = {
    visits: state.forms.reduce((sum, form) => sum + form.visits, 0),
    submissions: state.forms.reduce((sum, form) => sum + form.submissions, 0),
    submissionRate: 0,
    bounceRate: 0,
  };
  
  if (stats.visits > 0) {
    stats.submissionRate = (stats.submissions / stats.visits) * 100;
    stats.bounceRate = 100 - stats.submissionRate;
  }

  return (
    <section style={{ padding: "1rem" }}>
      <hr style={{ margin: "1rem 0" }} />
      <h2>Your Forms</h2>
      <hr style={{ margin: "1rem 0" }} />
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
        {/* Create Form Button */}
        <button style={{ padding: "0.5rem", background: "#eee", border: "1px solid #ccc", borderRadius: "4px" }}>
          + Create Form
        </button>
        
        {/* Render forms */}
        {allForms.map((form) => (
          <div 
            key={form.id} 
            style={{ border: "1px solid #ccc", borderRadius: "4px", padding: "1rem" }}
          >
            <h3>{form.title}</h3>
            <p>Visits: {form.visits}</p>
            <p>Submissions: {form.submissions}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
