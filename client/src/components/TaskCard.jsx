export default function TaskCard({ task, onEdit, onDelete, onStatusChange }) {
  return (
    <article className={`task-card priority-${task.priority.toLowerCase()}`}>
      <div className="task-card-heading">
        <div>
          <div className="badges">
            <span className={`badge status-${task.status.toLowerCase().replace(" ", "-")}`}>
              {task.status}
            </span>
            <span className={`badge priority-${task.priority.toLowerCase()}-badge`}>
              {task.priority} priority
            </span>
          </div>
          <h3>{task.itemName}</h3>
        </div>
        <span className="due-time">Due {task.dueTime}</span>
      </div>

      <dl className="task-details">
        <div>
          <dt>Quantity</dt>
          <dd>{task.quantity}</dd>
        </div>
        <div>
          <dt>Station</dt>
          <dd>{task.station}</dd>
        </div>
      </dl>

      {task.notes && <p className="task-notes">{task.notes}</p>}

      <div className="task-actions">
        {task.status !== "Completed" && (
          <button
            className="complete-button"
            type="button"
            onClick={() => onStatusChange(task, "Completed")}
          >
            Mark completed
          </button>
        )}
        <button className="secondary-button" type="button" onClick={() => onEdit(task)}>
          Edit
        </button>
        <button className="danger-button" type="button" onClick={() => onDelete(task._id)}>
          Delete
        </button>
      </div>
    </article>
  );
}

