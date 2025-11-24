import { useState, useMemo } from 'react'
import SearchBar from './components/SearchBar'
import CountryCard from './components/CountryCard'
import countriesData from './data/countries.json'
import './index.css'

export default function App() {
  const [searchTerm, setSearchTerm] = useState('')
  const [expandedSet, setExpandedSet] = useState(() => new Set())

  // Filter countries based on search term (match name, region, or capital)
  const filteredCountries = useMemo(() => {
    const q = (searchTerm || '').trim().toLowerCase()
    if (!q) return countriesData

    return countriesData.filter((country) => {
      const name = (country.name || '').toLowerCase()
      const region = (country.region || '').toLowerCase()
      const capital = (country.capital || '').toLowerCase()
      return name.includes(q) || region.includes(q) || capital.includes(q)
    })
  }, [searchTerm])

  return (
    <div className="min-h-screen bg-gray-50 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
            Countries
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Explore countries, capitals, and populations
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sm:mb-10">
          <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
        </div>

        {/* Results Info */}
        {filteredCountries.length > 0 && (
          <p className="text-gray-600 text-xs sm:text-sm mb-6">
            Showing {filteredCountries.length} of {countriesData.length} countries
          </p>
        )}

        {/* Country Grid */}
        {filteredCountries.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {filteredCountries.map((country) => (
              <CountryCard
                key={country.code}
                country={country}
                isExpanded={expandedSet.has(country.code)}
                onToggle={() => {
                  // eslint-disable-next-line no-console
                  console.log('onToggle called for', country.code)
                  // eslint-disable-next-line no-console
                  console.trace()
                  setExpandedSet((prev) => {
                    const next = new Set(prev)
                    const wasExpanded = next.has(country.code)
                    if (wasExpanded) next.delete(country.code)
                    else next.add(country.code)
                    // Trace toggle for debugging
                    // eslint-disable-next-line no-console
                    console.log('toggle:', country.code, !wasExpanded)
                    return next
                  })
                }}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12 sm:py-16">
            <svg
              className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-gray-300 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={1.5}
                d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <p className="text-gray-600 text-base sm:text-lg font-medium mb-2">
              No countries found
            </p>
            <p className="text-gray-500 text-sm sm:text-base">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
