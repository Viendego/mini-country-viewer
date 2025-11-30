import { useState } from 'react'

export default function CountryCard({ country, isExpanded: isExpandedProp, onToggle: onToggleProp }) {
  const [isExpandedInternal, setIsExpandedInternal] = useState(false)
  const isControlled = typeof isExpandedProp === 'boolean' && typeof onToggleProp === 'function'
  const isExpanded = isControlled ? isExpandedProp : isExpandedInternal

  const toggleExpanded = () => {
    if (isControlled) onToggleProp()
    else {
      setIsExpandedInternal((s) => {
        const next = !s
        console.log('internal toggle:', country.code, next)
        return next
      })
    }
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
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden focus:outline-none">
      <div
        role="button"
        tabIndex={0}
        onClick={(e) => {
          console.log('header click', country.code)
          toggleExpanded()
        }}
        onKeyDown={handleKeyDown}
        className="p-4 sm:p-5 flex items-center gap-3 sm:gap-4 border-b border-gray-100 dark:border-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
      >
        <img
          src={country.flag}
          alt={`${country.name} flag`}
          className="w-12 h-8 sm:w-14 sm:h-10 object-cover rounded"
        />
        <div className="flex-1 min-w-0">
          <h3 className="font-semibold text-gray-900 dark:text-gray-100 text-sm sm:text-base truncate">
            {country.name}
          </h3>
          <p className="text-gray-500 dark:text-gray-300 text-xs sm:text-sm truncate">
            {country.region}
          </p>
        </div>
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation()
            console.log('button click', country.code)
            toggleExpanded()
          }} 
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
        <div className="px-4 sm:px-5 py-4 bg-gray-50 dark:bg-gray-700 border-t border-gray-100 dark:border-gray-700 space-y-3">
          <div className="flex justify-between items-start">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Capital</span>
            <span className="text-gray-900 dark:text-gray-100 text-sm font-medium text-right">
              {country.capital}
            </span>
          </div>
          <div className="flex justify-between items-start">
            <span className="text-gray-600 dark:text-gray-300 text-sm font-medium">Population</span>
            <span className="text-gray-900 dark:text-gray-100 text-sm font-medium text-right">
              {formatPopulation(country.population)}
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
