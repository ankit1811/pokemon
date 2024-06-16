

const SkeletonLoader = () => {
  return (
    <div className="max-w-sm bg-white border border-white-200 rounded-lg shadow dark:bg-gray-800 dark:border-white-700 animate-pulse border-2 border-white min-w-[350px] min-h-[500px]">
        <div className="flex items-center justify-center h-48 bg-gray-200  rounded-t-lg">
          {/* Placeholder for image */}
        </div>
        <div className="p-5 bg-gray-100 rounded-b-lg">
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
          <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded mb-2"></div>
        </div>
      </div>
  );
};

export default SkeletonLoader;