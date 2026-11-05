import { useEffect, useMemo, useState } from "react";
import {
  createTask,
  deleteTask,
  fetchTasks,
  updateTask
} from "./api/tasks.js";
import Summary from "./components/Summary.jsx";
import TaskCard from "./components/TaskCard.jsx";
import TaskForm from "./components/TaskForm.jsx";

const filters = ["All", "Pending", "In Progress", "Completed"];

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [filter, setFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    loadTasks();
  }, []);

  async function loadTasks() {
    try {
      setLoading(true);
      setError("");
      setTasks(await fetchTasks());
    } catch (requestError) {
      setError(`${requestError.message}. Check that the server and MongoDB are running.`);
    } finally {
      setLoading(false);
    }
  }

  async function handleSave(form) {
    try {
      setSaving(true);
      setError("");

      if (editingTask) {
        const updated = await updateTask(editingTask._id, form);
        setTasks((currentTasks) =>
          currentTasks.map((task) => (task._id === updated._id ? updated : task))
        );
        setEditingTask(null);
      } else {
        const created = await createTask(form);
        setTasks((currentTasks) => [created, ...currentTasks]);
      }

      return true;
    } catch (requestError) {
      setError(requestError.message);
      return false;
    } finally {
      setSaving(false);
    }
  }

  async function handleStatusChange(task, status) {
    try {
      setError("");
      const updated = await updateTask(task._id, { ...task, status });
      setTasks((currentTasks) =>
        currentTasks.map((currentTask) =>
          currentTask._id === updated._id ? updated : currentTask
        )
      );
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  async function handleDelete(id) {
    const confirmed = window.confirm("Delete this preparation task?");
    if (!confirmed) return;

    try {
      setError("");
      await deleteTask(id);
      setTasks((currentTasks) => currentTasks.filter((task) => task._id !== id));
      if (editingTask?._id === id) setEditingTask(null);
    } catch (requestError) {
      setError(requestError.message);
    }
  }

  const visibleTasks = useMemo(() => {
    if (filter === "All") return tasks;
    return tasks.filter((task) => task.status === filter);
  }, [filter, tasks]);

  return (
    <>
      <header className="hero">
        <div className="page-shell hero-content">
          <div>
            <p className="eyebrow light">Kitchen operations</p>
            <h1>Kitchen Prep Planner</h1>
            <p className="hero-copy">
              Keep today&apos;s preparation clear, prioritised and ready for service.
            </p>
          </div>
          <div className="service-badge">
            <span>Today&apos;s focus</span>
            <strong>Ready for service</strong>
          </div>
        </div>
      </header>

      <main className="page-shell main-layout">
        <Summary tasks={tasks} />

        {error && (
          <div className="error-message" role="alert">
            {error}
          </div>
        )}

        <section className="workspace-grid">
          <TaskForm
            editingTask={editingTask}
            onSave={handleSave}
            onCancel={() => setEditingTask(null)}
            saving={saving}
          />

          <div className="task-panel">
            <div className="panel-heading">
              <div>
                <p className="eyebrow">Daily list</p>
                <h2>Preparation tasks</h2>
              </div>
              <span className="task-count">{visibleTasks.length} shown</span>
            </div>

            <div className="filter-row" aria-label="Filter tasks">
              {filters.map((item) => (
                <button
                  className={filter === item ? "filter-button active" : "filter-button"}
                  type="button"
                  key={item}
                  onClick={() => setFilter(item)}
                >
                  {item}
                </button>
              ))}
            </div>

            {loading ? (
              <p className="empty-state">Loading preparation tasks...</p>
            ) : visibleTasks.length === 0 ? (
              <div className="empty-state">
                <strong>No tasks in this view.</strong>
                <span>Add a task or choose a different status filter.</span>
              </div>
            ) : (
              <div className="task-list">
                {visibleTasks.map((task) => (
                  <TaskCard
                    key={task._id}
                    task={task}
                    onEdit={setEditingTask}
                    onDelete={handleDelete}
                    onStatusChange={handleStatusChange}
                  />
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </>
  );
}

