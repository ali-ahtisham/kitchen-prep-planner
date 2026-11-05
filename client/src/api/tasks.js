const tasksUrl = "/api/tasks";

async function handleResponse(response) {
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "The request failed");
  }

  return data;
}

export async function fetchTasks() {
  const response = await fetch(tasksUrl);
  return handleResponse(response);
}

export async function createTask(task) {
  const response = await fetch(tasksUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  return handleResponse(response);
}

export async function updateTask(id, task) {
  const response = await fetch(`${tasksUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(task)
  });
  return handleResponse(response);
}

export async function deleteTask(id) {
  const response = await fetch(`${tasksUrl}/${id}`, {
    method: "DELETE"
  });
  return handleResponse(response);
}

