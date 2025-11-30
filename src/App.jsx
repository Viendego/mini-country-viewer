import { useState, useMemo, useEffect } from 'react'
import SearchBar from './components/SearchBar'
import CountryCard from './components/CountryCard'
import countriesData from './data/countries.json'
import './index.css'
import DashboardV2 from './DashboardV2'

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

  const [showPreviewDashboard, setShowPreviewDashboard] = useState(false)
  const [theme, setTheme] = useState(() => {
    try {
      // Default to dark mode on first visit unless a preference is stored
      return localStorage.getItem('theme') || 'dark'
    } catch (e) {
      return 'dark'
    }
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {
      // ignore
    }
  }, [theme])

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-6 sm:py-8 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-8 sm:mb-10">
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100 mb-2">
            Countries
          </h1>
          <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base">
            Explore countries, capitals, and populations!
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-8 sm:mb-10 flex items-center justify-between">
          <div className="flex-1 mr-4">
            <SearchBar searchTerm={searchTerm} onSearchChange={setSearchTerm} />
          </div>
          <div>
            <div className="flex gap-2">
              <button
                onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
                className="px-3 py-2 rounded-md bg-gray-100 dark:bg-gray-800 text-sm text-gray-700 dark:text-gray-200 hover:opacity-90"
                aria-label="Toggle theme"
              >
                {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
              <button
                onClick={() => setShowPreviewDashboard((s) => !s)}
                className="px-3 py-2 rounded-md bg-indigo-600 text-white text-sm hover:bg-indigo-700"
              >
                {showPreviewDashboard ? 'Close Preview' : 'Open Dashboard Preview'}
              </button>
            </div>
          </div>
        </div>

        {showPreviewDashboard && (
          <div className="mb-8">
            <DashboardV2 />
          </div>
        )}

        {/* Results Info */}
        {filteredCountries.length > 0 && (
          <p className="text-gray-600 dark:text-gray-300 text-xs sm:text-sm mb-6">
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
                  console.log('onToggle called for', country.code)
                  console.trace()
                  setExpandedSet((prev) => {
                    const next = new Set(prev)
                    const wasExpanded = next.has(country.code)
                    if (wasExpanded) next.delete(country.code)
                    else next.add(country.code)
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
                
              />
            </svg>
            <p className="text-gray-600 dark:text-gray-300 text-base sm:text-lg font-medium mb-2">
              No countries found
            </p>
            <p className="text-gray-500 dark:text-gray-300 text-sm sm:text-base">
              Try searching with different keywords
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
