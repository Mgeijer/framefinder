export default function TestPage() {
  return (
    <div className="p-8">
      <h1 className="text-4xl font-bold text-green-600">FrameFinder Test Page</h1>
      <p className="text-xl mt-4">If you can see this, the basic setup is working!</p>
      <div className="mt-8 p-4 bg-green-100 rounded-lg">
        <h2 className="text-2xl font-semibold">Status Check:</h2>
        <ul className="mt-2 space-y-1">
          <li>✅ Next.js is running</li>
          <li>✅ TypeScript is working</li>
          <li>✅ Tailwind CSS is loaded</li>
          <li>✅ App router is functional</li>
        </ul>
      </div>
      <div className="mt-4">
        <a href="/" className="text-blue-600 hover:underline">← Back to Home</a>
      </div>
    </div>
  )
}