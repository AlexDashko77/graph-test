interface GraphErrorProps {
  error: string;
}

export default function GraphError({ error }: GraphErrorProps) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-red-50 z-10">
      <div className="text-center text-red-600 max-w-md">
        <div className="text-5xl mb-4">⚠️</div>
        <p className="text-xl font-semibold mb-2">Error Loading Graph</p>
        <p className="text-sm">{error}</p>
      </div>
    </div>
  );
}
