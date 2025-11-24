import { useEffect, useRef, useState } from 'react'

export default function SearchBar({ searchTerm, onSearchChange }) {
  const inputRef = useRef(null)
  const [isFocused, setIsFocused] = useState(false)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

  const suggestions = [
    { label: 'Search by Country', example: 'Armenia', displayExample: 'e.g., "Armenia"' },
    { label: 'Search by Capital', example: 'Vienna', displayExample: 'e.g., "Vienna"' },
    { label: 'Search by Region', example: 'Asia', displayExample: 'e.g., "Asia"' },
  ]

  const handleSuggestionClick = (example) => {
    onSearchChange(example)
    setIsFocused(false)
  }

  return (
    <div className="relative">
      <div className="absolute left-3 sm:left-4 top-1/2 transform -translate-y-1/2 text-gray-400">
        <svg
          className="w-5 h-5"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </div>
      <input
        ref={inputRef}
        type="text"
        placeholder="Search countries..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setTimeout(() => setIsFocused(false), 200)}
        className="w-full pl-10 sm:pl-12 pr-4 py-3 sm:py-4 bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base placeholder-gray-400"
        aria-label="Search countries"
        title="Search by country name, region, or capital (e.g., 'Asia', 'Argentina', 'Tirana')"
      />
      {isFocused && !searchTerm && (
        <div className="absolute top-full mt-2 w-full bg-white border border-gray-200 rounded-lg shadow-lg z-10">
          {suggestions.map((suggestion, idx) => (
            <div
              key={idx}
              onClick={() => handleSuggestionClick(suggestion.example)}
              className="px-4 py-3 border-b border-gray-100 last:border-b-0 hover:bg-blue-50 cursor-pointer transition-colors"
            >
              <p className="text-sm font-medium text-gray-700">{suggestion.label}</p>
              <p className="text-xs text-gray-500">{suggestion.displayExample}</p>
            </div>
          ))}
        </div>
      )}
      {searchTerm && (
        <button
          onClick={() => onSearchChange('')}
          className="absolute right-3 sm:right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Clear search"
        >
          <svg
            className="w-5 h-5"
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
      )}
    </div>
  )
}
