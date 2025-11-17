import { useState } from 'react'

export default function CountryCard({ country }) {
  const [isExpanded, setIsExpanded] = useState(false)

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded)
  }

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      toggleExpanded()
    }
  }

  const formatPopulation = (population) => {
    return new Intl.NumberFormat('en-US').format(population)
  }

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={toggleExpanded}
      onKeyDown={handleKeyDown}
      className="bg-white rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
    >
      {/* Card Header - Always Visible */}
      <div className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border-b border-gray-100">
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-12 h-8 sm:w-14 sm:h-10 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 text-sm sm:text-base truncate">
            {country.name}
          </h3>
          <p className="text-gray-500 text-xs sm:text-sm truncate">
            {country.region}
          </p>
        </div>
        <button
          className="flex-shrink-0 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label={isExpanded ? 'Collapse details' : 'Expand details'}
        >
          <svg
            className={`w-5 h-5 transform transition-transform duration-200 ${
              isExpanded ? 'rotate-180' : ''
            }`}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </button>
      </div>

      {/* Expandable Details */}
      {isExpanded && (
        <div className="px-4 sm:px-5 py-4 bg-gray-50 border-t border-gray-100 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-gray-600 text-sm font-medium">Capital</span>
            <span className="text-gray-900 text-sm font-medium text-right">
              {country.capital}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600 text-sm font-medium">Population</span>
            <span className="text-gray-900 text-sm font-medium text-right">
              {formatPopulation(country.population)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
