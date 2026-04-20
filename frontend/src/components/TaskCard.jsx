import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { motion } from 'framer-motion';
import { toast } from 'react-toastify';
import { deleteTask } from '../store/slices/taskSlice';
import { FiEdit2, FiTrash2, FiCalendar, FiUser } from 'react-icons/fi';
import TaskModal from './TaskModal';

const TaskCard = ({ task }) => {
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const dispatch = useDispatch();
  const { userInfo } = useSelector((state) => state.auth);

  const isCreator = task.creator._id === userInfo._id;
  const isAssignee = task.assignee && task.assignee._id === userInfo._id;

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      dispatch(deleteTask(task._id));
      toast.success('Task deleted successfully');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Todo':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Done':
        return 'bg-green-100 text-green-800 border-green-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <>
      <motion.div
        layout
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.9 }}
        whileHover={{ y: -5 }}
        className="bg-white rounded-xl shadow-md hover:shadow-xl transition-all p-6 border border-gray-100"
      >
        <div className="flex justify-between items-start mb-4">
          <h3 className="text-xl font-bold text-gray-800 flex-1 pr-2">
            {task.title}
          </h3>
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold border ${getStatusColor(
              task.status
            )}`}
          >
            {task.status}
          </span>
        </div>

        <p className="text-gray-600 mb-4 line-clamp-3">{task.description}</p>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <FiCalendar className="text-blue-500" />
            <span>Due: {formatDate(task.dueDate)}</span>
          </div>

          {task.assignee && (
            <div className="flex items-center gap-2 text-sm">
              <FiUser className="text-purple-500" />
              <span className="text-gray-600">
                {isCreator ? (
                  <>
                    Assigned to:{' '}
                    <span className="font-semibold text-purple-600">
                      {task.assignee.name}
                    </span>
                  </>
                ) : (
                  <>
                    Assigned by:{' '}
                    <span className="font-semibold text-purple-600">
                      {task.creator.name}
                    </span>
                  </>
                )}
              </span>
            </div>
          )}

          {!task.assignee && (
            <div className="flex items-center gap-2 text-sm">
              <span className="px-2 py-1 bg-indigo-100 text-indigo-700 rounded-md text-xs font-medium">
                Personal Task
              </span>
            </div>
          )}
        </div>

        <div className="flex gap-2 pt-4 border-t border-gray-100">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => setIsEditModalOpen(true)}
            className="flex-1 flex items-center justify-center gap-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition"
          >
            <FiEdit2 />
            Edit
          </motion.button>

          {isCreator && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleDelete}
              className="flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
            >
              <FiTrash2 />
            </motion.button>
          )}
        </div>
      </motion.div>

      <TaskModal
        isOpen={isEditModalOpen}
        onClose={() => setIsEditModalOpen(false)}
        task={task}
      />
    </>
  );
};

export default TaskCard;
