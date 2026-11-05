export default function Summary({ tasks }) {
  const counts = {
    total: tasks.length,
    pending: tasks.filter((task) => task.status === "Pending").length,
    inProgress: tasks.filter((task) => task.status === "In Progress").length,
    completed: tasks.filter((task) => task.status === "Completed").length
  };

  return (
    <section className="summary-grid" aria-label="Preparation summary">
      <article className="summary-card total">
        <span>Total</span>
        <strong>{counts.total}</strong>
      </article>
      <article className="summary-card pending">
        <span>Pending</span>
        <strong>{counts.pending}</strong>
      </article>
      <article className="summary-card progress">
        <span>In progress</span>
        <strong>{counts.inProgress}</strong>
      </article>
      <article className="summary-card complete">
        <span>Completed</span>
        <strong>{counts.completed}</strong>
      </article>
    </section>
  );
}

