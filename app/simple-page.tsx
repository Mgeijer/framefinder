export default function SimplePage() {
  return (
    <div className="min-h-screen bg-white p-8">
      <div className="max-w-4xl mx-auto text-center">
        <h1 className="text-6xl font-bold text-green-600 mb-6">
          FrameFinder
        </h1>
        <p className="text-2xl text-gray-600 mb-8">
          Find Your Perfect Eyeglass Style in Seconds
        </p>
        <div className="bg-green-50 p-6 rounded-lg">
          <h2 className="text-2xl font-semibold mb-4">🎉 Success!</h2>
          <p className="text-lg">Your FrameFinder site is working perfectly!</p>
        </div>
        <div className="mt-8 space-y-4">
          <div className="bg-blue-50 p-4 rounded">
            <h3 className="font-semibold">Next Steps:</h3>
            <p>Ready to implement face detection and recommendations!</p>
          </div>
        </div>
      </div>
    </div>
  )
}