import { useState } from 'react';

function TaskItem({ task, onEdit, onDelete, onToggleStatus, isRecurring = false }) {
  const [expanded, setExpanded] = useState(false);
  const isCompleted = task.status === 'Completed';
  const needsSeeMore = task.description && task.description.length > 150;

  return (
    <div className={`task-item ${isCompleted ? 'completed' : 'pending'} ${isRecurring ? 'recurring' : ''} ${isRecurring && isCompleted ? 'completed-recurring' : ''}`}>
      <div className="task-header">
        <h4>{task.title}</h4>
        <div className="task-badges">
          {isRecurring && <span className="recurring-badge">🔄 Daily</span>}
          <span className={`priority-badge priority-${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>
        </div>
      </div>
      
      {task.description && (
        <>
          <p className={`task-description ${expanded ? 'expanded' : ''}`}>
            {task.description}
          </p>
          {needsSeeMore && (
            <button className="see-more-btn" onClick={() => setExpanded(!expanded)}>
              {expanded ? 'See less' : 'See more'}
            </button>
          )}
        </>
      )}
      
      <div className="task-meta">
        {!isRecurring && task.dueDate && (
          <span className="due-date">📅 {task.dueDate}</span>
        )}
        {isRecurring && (
          <span className="due-date">🔄 Resets at midnight</span>
        )}
        <span className={`status-badge ${isCompleted ? 'completed' : 'pending'}`}>
          {task.status}
        </span>
      </div>
      
      <div className="task-actions">
        <button className="toggle-btn" onClick={() => onToggleStatus(task)}>
          {isCompleted ? '↩️ Undo' : '✓ Complete'}
        </button>
        {!isRecurring && (
          <button className="edit-btn" onClick={() => onEdit(task)}>
            ✏️ Edit
          </button>
        )}
        <button className="delete-btn" onClick={() => onDelete(task.id)}>
          🗑️ Delete
        </button>
      </div>
    </div>
  );
}

export default TaskItem;
