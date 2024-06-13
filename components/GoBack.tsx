import Link from "next/link";



const BackButton = () => {
  const goBack = () => {
    window.history.back()
  };

  return (
  
        <div onClick={goBack} className="cursor-pointer inline-flex items-center py-2  border border-transparent rounded-md font-semibold text-white hover:underline text-blue-700">
         
          {`< Back`}
        </div>
    
  );
};

export default BackButton;