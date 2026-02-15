interface NavigationControlsProps {
  canGoBack: boolean;
  canGoForward: boolean;
  onBack: () => void;
  onForward: () => void;
}

export default function NavigationControls({
  canGoBack,
  canGoForward,
  onBack,
  onForward,
}: NavigationControlsProps) {
  return (
    <div className="flex gap-2">
      <button
        onClick={onBack}
        disabled={!canGoBack}
        className="p-3 rounded-xl bg-white border-2 border-gray-300 hover:border-violet-400 hover:bg-violet-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-white transition-all shadow-lg hover:shadow-xl"
        title="Go back"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M15 19l-7-7 7-7"
          />
        </svg>
      </button>

      <button
        onClick={onForward}
        disabled={!canGoForward}
        className="p-3 rounded-xl bg-white border-2 border-gray-300 hover:border-violet-400 hover:bg-violet-50 disabled:opacity-40 disabled:cursor-not-allowed disabled:hover:border-gray-300 disabled:hover:bg-white transition-all shadow-lg hover:shadow-xl"
        title="Go forward"
      >
        <svg
          className="w-6 h-6 text-gray-700"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2.5}
            d="M9 5l7 7-7 7"
          />
        </svg>
      </button>
    </div>
  );
}
