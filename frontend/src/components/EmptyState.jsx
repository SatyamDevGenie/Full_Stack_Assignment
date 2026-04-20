import { motion } from 'framer-motion';
import { FiInbox } from 'react-icons/fi';

const EmptyState = ({ filter, onCreateTask }) => {
  const getEmptyMessage = () => {
    switch (filter) {
      case 'personal':
        return 'No personal tasks yet';
      case 'assigned':
        return 'You haven\'t assigned any tasks';
      case 'received':
        return 'No tasks assigned to you';
      case 'todo':
        return 'No tasks in Todo status';
      case 'in-progress':
        return 'No tasks in progress';
      case 'done':
        return 'No completed tasks';
      default:
        return 'No tasks found';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center py-12 sm:py-20 px-4"
    >
      <motion.div
        animate={{
          y: [0, -10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="bg-gradient-to-br from-blue-100 to-purple-100 p-6 sm:p-8 rounded-full mb-4 sm:mb-6"
      >
        <FiInbox className="text-5xl sm:text-6xl text-gray-400" />
      </motion.div>
      
      <h3 className="text-xl sm:text-2xl font-bold text-gray-700 mb-2 text-center">
        {getEmptyMessage()}
      </h3>
      
      <p className="text-sm sm:text-base text-gray-500 mb-4 sm:mb-6 text-center px-4">
        {filter === 'all' ? 'Create your first task to get started' : 'Try a different filter or create a new task'}
      </p>
      
      {filter === 'all' && (
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onCreateTask}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-lg font-semibold shadow-lg hover:shadow-xl transition text-sm sm:text-base"
        >
          Create Your First Task
        </motion.button>
      )}
    </motion.div>
  );
};

export default EmptyState;
