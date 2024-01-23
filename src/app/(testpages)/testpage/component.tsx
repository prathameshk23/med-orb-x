export default function Component() {
  return (
    <div className="w-full max-w-md mx-auto">
      <div className="flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-md p-6 space-y-4">
        <p className="text-gray-500">Drag and drop your files here</p>
        <div className="relative">
          <input
            className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            id="file"
            type="file"
          />
          <label
            className="flex items-center justify-center px-4 py-2 border border-gray-300 rounded-md text-sm leading-4 font-medium text-gray-700 hover:text-gray-500"
            htmlFor="file"
          >
            Browse files
          </label>
        </div>
      </div>
    </div>
  );
}
