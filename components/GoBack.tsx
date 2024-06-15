
const BackButton = () => {
  const goBack = () => {
    window.history.back()
  };

  return (
  
        <div onClick={goBack} className="cursor-pointer inline-flex items-center py-2  border border-transparent rounded-md font-semibold hover:underline text-primary">
          {`< Back`}
        </div>
    
  );
};

export default BackButton;