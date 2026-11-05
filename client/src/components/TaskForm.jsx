import { useEffect, useState } from "react";

const emptyForm = {
  itemName: "",
  quantity: "",
  station: "General",
  priority: "Medium",
  dueTime: "",
  status: "Pending",
  notes: ""
};

export default function TaskForm({ editingTask, onSave, onCancel, saving }) {
  const [form, setForm] = useState(emptyForm);

  useEffect(() => {
    if (editingTask) {
      setForm({
        itemName: editingTask.itemName,
        quantity: editingTask.quantity,
        station: editingTask.station,
        priority: editingTask.priority,
        dueTime: editingTask.dueTime,
        status: editingTask.status,
        notes: editingTask.notes || ""
      });
    } else {
      setForm(emptyForm);
    }
  }, [editingTask]);

  function handleChange(event) {
    const { name, value } = event.target;
    setForm((currentForm) => ({ ...currentForm, [name]: value }));
  }

  async function handleSubmit(event) {
    event.preventDefault();
    const saved = await onSave(form);

    if (saved && !editingTask) {
      setForm(emptyForm);
    }
  }

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      <div className="form-heading">
        <div>
          <p className="eyebrow">Prep details</p>
          <h2>{editingTask ? "Edit task" : "Add a prep task"}</h2>
        </div>
        {editingTask && (
          <button className="text-button" type="button" onClick={onCancel}>
            Cancel editing
          </button>
        )}
      </div>

      <div className="form-grid">
        <label>
          Item name
          <input
            name="itemName"
            value={form.itemName}
            onChange={handleChange}
            placeholder="e.g. Slice onions"
            maxLength="80"
            required
          />
        </label>

        <label>
          Quantity
          <input
            name="quantity"
            value={form.quantity}
            onChange={handleChange}
            placeholder="e.g. 3 kg"
            maxLength="30"
            required
          />
        </label>

        <label>
          Station
          <select name="station" value={form.station} onChange={handleChange}>
            <option>General</option>
            <option>Grill</option>
            <option>Fryer</option>
            <option>Larder</option>
            <option>Pastry</option>
          </select>
        </label>

        <label>
          Priority
          <select name="priority" value={form.priority} onChange={handleChange}>
            <option>Low</option>
            <option>Medium</option>
            <option>High</option>
          </select>
        </label>

        <label>
          Due time
          <input
            name="dueTime"
            type="time"
            value={form.dueTime}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Status
          <select name="status" value={form.status} onChange={handleChange}>
            <option>Pending</option>
            <option>In Progress</option>
            <option>Completed</option>
          </select>
        </label>
      </div>

      <label>
        Notes <span className="optional">(optional)</span>
        <textarea
          name="notes"
          value={form.notes}
          onChange={handleChange}
          placeholder="Add a useful preparation note"
          maxLength="250"
          rows="3"
        />
      </label>

      <button className="primary-button" type="submit" disabled={saving}>
        {saving ? "Saving..." : editingTask ? "Save changes" : "Add task"}
      </button>
    </form>
  );
}

