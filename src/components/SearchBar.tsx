interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  onClear: () => void;
}

export default function SearchBar({
  value,
  onChange,
  onClear,
}: SearchBarProps) {
  return (
    <div className="md:block md:relative md:bottom-0 md:left-0 md:right-0 md:max-w-full fixed bottom-10 left-[5%] right-0 max-w-[90%] z-10">
      <div className="relative flex-1 md:max-w-md md:mx-auto">
        <input
          type="text"
          placeholder="Поиск по названию или адресу"
          className="w-full text-sm shadow-lg md:shadow-md rounded-md focus:ring-2 focus:ring-blue-500 pl-4 pr-10 py-3 md:py-2 placeholder-gray-500 bg-white border border-gray-200 md:border-gray-300"
          value={value}
          onChange={(e) => onChange(e.target.value)}
        />
        {value && (
          <button
            onClick={onClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        )}
      </div>
    </div>
  );
}
