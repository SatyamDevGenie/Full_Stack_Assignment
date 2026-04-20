import { motion } from 'framer-motion';

const LoadingSpinner = () => {
  return (
    <div className="flex justify-center items-center py-20">
      <motion.div
        animate={{
          rotate: 360,
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-16 h-16 border-4 border-gray-200 border-t-blue-500 rounded-full"
      />
    </div>
  );
};

export default LoadingSpinner;
