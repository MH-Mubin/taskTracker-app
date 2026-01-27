import { useEffect, useRef, useState } from 'react';
import ConfirmModal from '../components/ConfirmModal';
import DailyProgress from '../components/DailyProgress';
import Navbar from '../components/Navbar';
import TaskList from '../components/TaskList';
import {
    addTask,
    deleteTask,
    getRecurringTasksWithStatus,
    toggleRecurringTask
} from '../utils/storage';

function Repetitive() {
  const [tasks, setTasks] = useState([]);
  const [toast, setToast] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [taskToDelete, setTaskToDelete] = useState(null);
  const [formData, setFormData] = useState({ title: '', description: '' });
  const formRef = useRef(null);

  const refreshTasks = () => {
    setTasks(getRecurringTasksWithStatus());
  };

  useEffect(() => {
    refreshTasks();
  }, []);

  const showToast = (message, type = 'success') => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    addTask({
      title: formData.title,
      description: formData.description,
      priority: 'High',
      status: 'Pending',
      isRecurring: true
    });
    setFormData({ title: '', description: '' });
    refreshTasks();
    showToast('Daily routine added!');
  };

  const handleDelete = (id) => {
    setTaskToDelete(id);
    setShowModal(true);
  };

  const confirmDelete = () => {
    deleteTask(taskToDelete);
    refreshTasks();
    showToast('Daily routine removed!', 'info');
    setShowModal(false);
    setTaskToDelete(null);
  };

  const cancelDelete = () => {
    setShowModal(false);
    setTaskToDelete(null);
  };

  const handleToggleStatus = (task) => {
    toggleRecurringTask(task.id);
    refreshTasks();
    const newStatus = task.status === 'Pending' ? 'Completed' : 'Pending';
    showToast(`Routine marked as ${newStatus}!`);
  };

  const completedCount = tasks.filter(t => t.status === 'Completed').length;
  const totalTasks = tasks.length;

  return (
    <div className="tasks-page">
      <Navbar />
      {toast && (
        <div className={`toast toast-${toast.type}`}>
          {toast.message}
        </div>
      )}
      <ConfirmModal
        isOpen={showModal}
        message="Remove this daily routine? This will delete all completion history."
        onConfirm={confirmDelete}
        onCancel={cancelDelete}
      />
      <div className="container">
        {/* Simple Form for Daily Routines */}
        <form className="task-form repetitive-form" onSubmit={handleSubmit} ref={formRef}>
          <h3>🔄 Add Daily Routine</h3>
          <p className="form-subtitle">These tasks reset every day at midnight</p>
          
          <input
            type="text"
            name="title"
            placeholder="Routine name (e.g., Morning exercise)"
            value={formData.title}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description (optional)"
            value={formData.description}
            onChange={handleChange}
            rows="2"
          />

          <button type="submit">Add Routine</button>
        </form>

        {/* Daily Routines Section */}
        <div className="daily-routines-section">
          <div className="section-header">
            <div className="section-title">
              <h3>📅 Your Daily Routines</h3>
              <span className="section-subtitle">Complete these tasks every day</span>
            </div>
            {totalTasks > 0 && (
              <DailyProgress completed={completedCount} total={totalTasks} />
            )}
          </div>
          <TaskList
            tasks={tasks}
            onEdit={() => {}}
            onDelete={handleDelete}
            onToggleStatus={handleToggleStatus}
            isRecurring={true}
            emptyMessage="No daily routines yet. Add one above to get started!"
          />
        </div>
      </div>
    </div>
  );
}

export default Repetitive;
