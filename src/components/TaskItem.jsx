function TaskItem({ task, onEdit, onDelete, onToggleStatus }) {
  const priorityClass = `priority-${task.priority.toLowerCase()}`;
  const statusClass = task.status === 'Completed' ? 'completed' : 'pending';

  return (
    <div className={`task-item ${statusClass}`}>
      <div className="task-header">
        <h4>{task.title}</h4>
        <span className={`priority-badge ${priorityClass}`}>
          {task.priority}
        </span>
      </div>
      
      <p className="task-description">{task.description}</p>
      
      <div className="task-meta">
        <span className="due-date">Due: {task.dueDate}</span>
        <span className={`status-badge ${statusClass}`}>{task.status}</span>
      </div>

      <div className="task-actions">
        <button onClick={() => onToggleStatus(task)} className="toggle-btn">
          {task.status === 'Pending' ? 'Mark Complete' : 'Mark Pending'}
        </button>
        <button onClick={() => onEdit(task)} className="edit-btn">
          Edit
        </button>
        <button onClick={() => onDelete(task.id)} className="delete-btn">
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
