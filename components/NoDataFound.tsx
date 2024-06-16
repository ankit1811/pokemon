
const NoDataFound = ({message=""}:{message?:string}) => {
  return (
    <div className="flex justify-center items-baseline min-h-screen position:absolute">
    <div className="text-center sm:w-1/2">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4">No Data Found</h2>
      <p className="text-gray-500 text-sm sm:text-base">{message}</p>
    </div>
  </div>
  )   
}

export default NoDataFound