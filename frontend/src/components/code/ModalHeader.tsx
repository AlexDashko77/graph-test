interface ModalHeaderProps {
  filePath: string;
  line: number;
  onClose: () => void;
}

export default function ModalHeader({
  filePath,
  line,
  onClose,
}: ModalHeaderProps) {
  return (
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-200">
      <div className="flex-1">
        <h3 className="text-lg font-semibold text-gray-900">Source Code</h3>
        <p className="text-sm text-gray-500 font-mono mt-1">
          {filePath}:{line}
        </p>
      </div>
      <button
        onClick={onClose}
        className="ml-4 p-2 hover:bg-gray-100 rounded-lg transition-colors"
        title="Close (ESC)"
      >
        <svg
          className="w-6 h-6 text-gray-500"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}
