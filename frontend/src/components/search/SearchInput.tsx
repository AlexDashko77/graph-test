interface SearchInputProps {
  value: string;
  loading: boolean;
  onChange: (value: string) => void;
  onFocus: () => void;
}

export default function SearchInput({
  value,
  loading,
  onChange,
  onFocus,
}: SearchInputProps) {
  return (
    <div className="relative">
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={onFocus}
        placeholder="Search for a function (e.g., 'main', 'Handler')..."
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      {loading && (
        <div className="absolute right-3 top-3">
          <div className="animate-spin h-5 w-5 border-2 border-blue-500 border-t-transparent rounded-full" />
        </div>
      )}
    </div>
  );
}
