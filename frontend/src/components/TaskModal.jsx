import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-toastify';
import { createTask, updateTask } from '../store/slices/taskSlice';
import { FiX } from 'react-icons/fi';

const TaskModal = ({ isOpen, onClose, task = null }) => {
  const dispatch = useDispatch();
  const { userInfo, users } = useSelector((state) => state.auth);
  
  const isEditing = !!task;
  const isCreator = task && task.creator._id === userInfo._id;
  const isAssignee = task && task.assignee && task.assignee._id === userInfo._id;

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Todo',
    dueDate: '',
    assignee: '',
  });

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title,
        description: task.description,
        status: task.status,
        dueDate: task.dueDate.split('T')[0],
        assignee: task.assignee ? task.assignee._id : '',
      });
    } else {
      setFormData({
        title: '',
        description: '',
        status: 'Todo',
        dueDate: '',
        assignee: '',
      });
    }
  }, [task, isOpen]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!formData.title || !formData.description || !formData.dueDate) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (isEditing) {
      // Update logic based on role
      let updateData = {};

      if (!task.assignee) {
        // Personal task - creator can update all fields
        updateData = {
          title: formData.title,
          description: formData.description,
          status: formData.status,
          dueDate: formData.dueDate,
        };
      } else if (isAssignee) {
        // Assignee can only update status
        updateData = {
          status: formData.status,
        };
      } else if (isCreator) {
        // Assigner can only update due date
        updateData = {
          dueDate: formData.dueDate,
        };
      }

      dispatch(updateTask({ id: task._id, taskData: updateData }));
      toast.success('Task updated successfully');
    } else {
      // Create new task
      const taskData = {
        title: formData.title,
        description: formData.description,
        status: formData.status,
        dueDate: formData.dueDate,
      };

      if (formData.assignee) {
        taskData.assignee = formData.assignee;
      }

      dispatch(createTask(taskData));
      toast.success('Task created successfully');
    }

    onClose();
  };

  // Determine which fields can be edited
  const canEditTitle = !isEditing || (!task.assignee && isCreator);
  const canEditDescription = !isEditing || (!task.assignee && isCreator);
  const canEditStatus = !isEditing || (!task.assignee && isCreator) || isAssignee;
  const canEditDueDate = !isEditing || (!task.assignee && isCreator) || (task.assignee && isCreator);
  const canEditAssignee = !isEditing;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            onClick={(e) => e.stopPropagation()}
            className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto m-4"
          >
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4 flex justify-between items-center z-10">
              <h2 className="text-xl sm:text-2xl font-bold text-gray-800">
                {isEditing ? 'Edit Task' : 'Create New Task'}
              </h2>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-gray-600 transition p-1"
              >
                <FiX className="text-xl sm:text-2xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-4 sm:p-6 space-y-4 sm:space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  disabled={!canEditTitle}
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter task title"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Description <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  disabled={!canEditDescription}
                  rows="4"
                  className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  placeholder="Enter task description"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Status <span className="text-red-500">*</span>
                  </label>
                  <select
                    name="status"
                    value={formData.status}
                    onChange={handleChange}
                    disabled={!canEditStatus}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  >
                    <option value="Todo">Todo</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Done">Done</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Due Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="date"
                    name="dueDate"
                    value={formData.dueDate}
                    onChange={handleChange}
                    disabled={!canEditDueDate}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition disabled:bg-gray-100 disabled:cursor-not-allowed"
                  />
                </div>
              </div>

              {canEditAssignee && (
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Assign To (Optional)
                  </label>
                  <select
                    name="assignee"
                    value={formData.assignee}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition"
                  >
                    <option value="">None (Personal Task)</option>
                    {users
                      .filter((user) => user._id !== userInfo._id)
                      .map((user) => (
                        <option key={user._id} value={user._id}>
                          {user.name} ({user.email})
                        </option>
                      ))}
                  </select>
                </div>
              )}

              {isEditing && task.assignee && (
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
                  <p className="text-xs sm:text-sm text-blue-800">
                    {isAssignee && (
                      <span>
                        <strong>Note:</strong> As the assignee, you can only update the status.
                      </span>
                    )}
                    {isCreator && (
                      <span>
                        <strong>Note:</strong> As the assigner, you can only update the due date.
                      </span>
                    )}
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 pt-4">
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:shadow-lg transition text-sm sm:text-base"
                >
                  {isEditing ? 'Update Task' : 'Create Task'}
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onClose}
                  className="w-full sm:w-auto px-6 bg-gray-200 hover:bg-gray-300 text-gray-700 py-2.5 sm:py-3 rounded-lg font-semibold transition text-sm sm:text-base"
                >
                  Cancel
                </motion.button>
              </div>
            </form>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default TaskModal;
