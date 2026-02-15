import ModalHeader from "./ModalHeader";
import CodeViewer from "./CodeViewer";

interface CodeModalProps {
  isOpen: boolean;
  filePath: string;
  line: number;
  onClose: () => void;
}

export default function CodeModal({
  isOpen,
  filePath,
  line,
  onClose,
}: CodeModalProps) {
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-lg shadow-2xl w-full max-w-6xl h-[90vh] flex flex-col"
        onClick={(e) => e.stopPropagation()}
      >
        <ModalHeader filePath={filePath} line={line} onClose={onClose} />

        <div className="flex-1 overflow-hidden">
          <CodeViewer filePath={filePath} highlightLine={line} />
        </div>

        <div className="px-6 py-3 border-t border-gray-200 bg-gray-50 text-xs text-gray-500 text-center">
          Press{" "}
          <kbd className="px-2 py-1 bg-white border border-gray-300 rounded">
            ESC
          </kbd>{" "}
          or click outside to close
        </div>
      </div>
    </div>
  );
}
