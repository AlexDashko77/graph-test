export default function EmptyState() {
  return (
    <div className="flex-1 flex items-center justify-center">
      <div className="text-center max-w-md px-4">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">
          Search for a Function
        </h2>
        <p className="text-gray-500">
          Use the search bar above to find a function and visualize its call
          graph. Try searching for{" "}
          <span className="font-mono text-blue-600">main</span>,
          <span className="font-mono text-blue-600">Handler</span>, or
          <span className="font-mono text-blue-600">Process</span>.
        </p>
      </div>
    </div>
  );
}
