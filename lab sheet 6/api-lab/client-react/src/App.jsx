import { useEffect, useState } from 'react'
import axios from 'axios'
import './App.css'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000'
const API_KEY = import.meta.env.VITE_API_KEY || 'my-secret-key'

function App() {
  const [tasks, setTasks] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [newTask, setNewTask] = useState('')

  const fetchTasks = async () => {
    try {
      setLoading(true)
      setError('')
      const response = await axios.get(`${API_URL}/api/tasks`)
      setTasks(response.data)
    } catch (err) {
      setError(
        err.response?.data?.message ||
          'Unable to load tasks. Please check the server.'
      )
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchTasks()
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!newTask.trim()) return

    try {
      const response = await axios.post(
        `${API_URL}/api/tasks`,
        { title: newTask, completed: false },
        {
          headers: {
            'Content-Type': 'application/json',
            'x-api-key': API_KEY,
          },
        }
      )

      setTasks((prev) => [response.data, ...prev])
      setNewTask('')
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Could not create task.')
    }
  }

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/api/tasks/${id}`, {
        headers: {
          'x-api-key': API_KEY,
        },
      })

      setTasks((prev) => prev.filter((task) => task.id !== id))
      setError('')
    } catch (err) {
      setError(err.response?.data?.message || 'Task could not be deleted.')
    }
  }

  return (
    <div className="app-container">
      <h1>Task Manager</h1>

      <form onSubmit={handleSubmit} className="task-form">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Enter a new task"
        />
        <button type="submit">Add Task</button>
      </form>

      {loading && <p className="status">Loading...</p>}
      {error && <p className="error">{error}</p>}

      {!loading && !error && (
        <ul className="task-list">
          {tasks.length === 0 ? (
            <li className="empty">No tasks available.</li>
          ) : (
            tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span>{task.title}</span>
                <button onClick={() => handleDelete(task.id)}>Delete</button>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  )
}

export default App
