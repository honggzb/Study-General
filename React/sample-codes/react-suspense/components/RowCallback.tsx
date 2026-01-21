const RowCallback = () => {
  return (
    <div className="flex justify-between p-2.5 bg-white rounded-[26px] shadow border border-black border-opacity-10 items-center w-full">
      <div className="flex items-center">
        <div className="w-20 h-20 mr-5">
          <div className="suspense-element w-20 h-20 bg-gray-300 rounded-[22px] flex justify-center items-center"></div>
        </div>
        <div className="w-34">
          <div className="suspense-element bg-gray-300 w-32 h-6 rounded-xl" />
          <div className="suspense-element bg-gray-300 w-20 h-6 rounded-xl mt-2" />
        </div>
      </div>
      <div className="flex mr-2">
        <div className="w-6 h-6 mt-1"></div>
        <div className="suspense-element bg-gray-300 w-10 h-10 rounded-full" />
      </div>
    </div>
  );
};

export default RowCallback;