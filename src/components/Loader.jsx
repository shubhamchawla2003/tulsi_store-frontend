const Loader = ({ size = 'md' }) => {
  const sizes = { sm: 'w-6 h-6', md: 'w-12 h-12', lg: 'w-16 h-16' };
  return (
    <div className="flex justify-center items-center py-10">
      <div className={`${sizes[size]} border-4 border-tulsi-200 border-t-tulsi-600 rounded-full animate-spin`}></div>
    </div>
  );
};

export default Loader;
