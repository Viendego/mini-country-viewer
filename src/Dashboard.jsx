import { useMemo } from 'react'
import countriesData from './data/countries.json'
import StatCard from './components/dashboard/StatCard'
import CountryTile from './components/dashboard/CountryTile'

function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n)
}

export default function Dashboard() {
  const stats = useMemo(() => {
    const totalCountries = countriesData.length
    const totalPopulation = countriesData.reduce((s, c) => s + (c.population || 0), 0)
    const regions = [...new Set(countriesData.map((c) => c.region))]
    const byRegion = regions.map((r) => ({
      region: r,
      count: countriesData.filter((c) => c.region === r).length,
    }))
    const top = [...countriesData].sort((a, b) => b.population - a.population).slice(0, 6)

    return { totalCountries, totalPopulation, regions, byRegion, top }
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-10 px-6 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <header className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-extrabold tracking-tight text-gray-900 dark:text-gray-100">World Insights</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-300">A premium dashboard view of country data — editorial layout and bite-sized insights.</p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm text-sm text-gray-700 dark:text-gray-200 hover:shadow-md">Export</button>
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg shadow-sm text-sm hover:bg-blue-700">Add Filter</button>
          </div>
        </header>

        <section className="grid grid-cols-12 gap-6">
          <div className="col-span-12 lg:col-span-8">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
              <StatCard label="Countries" value={stats.totalCountries} />
              <StatCard label="Total Population" value={formatNumber(stats.totalPopulation)} />
              <StatCard label="Regions" value={stats.regions.length} />
            </div>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6 mb-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-4">Global Highlights</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mb-4">Top countries by population — quick glance. Flags help you visually scan for familiar places.</p>

              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {stats.top.map((c) => (
                  <div key={c.code} className="flex items-center gap-4 bg-gray-50 dark:bg-gray-700 rounded-xl p-3">
                    <img src={c.flag} alt={`${c.name} flag`} className="w-14 h-10 object-cover rounded" />
                    <div className="truncate">
                      <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{c.name}</div>
                      <div className="text-xs text-gray-500 dark:text-gray-300">{c.region}</div>
                      <div className="text-xs text-gray-700 dark:text-gray-100 font-semibold">{formatNumber(c.population)}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow p-6">
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Regional Breakdown</h3>
              <div className="space-y-3">
                {stats.byRegion.map((r) => (
                  <div key={r.region} className="flex items-center gap-4">
                    <div className="w-40 text-sm text-gray-700 dark:text-gray-300">{r.region}</div>
                    <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
                      <div
                        className="h-3 bg-gradient-to-r from-indigo-500 to-blue-400"
                        style={{ width: `${Math.round((r.count / stats.totalCountries) * 100)}%` }}
                      />
                    </div>
                    <div className="w-20 text-right text-sm font-medium text-gray-800 dark:text-gray-100">{r.count}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <aside className="col-span-12 lg:col-span-4">
            <div className="bg-white rounded-2xl shadow-lg p-6 sticky top-6">
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Top 5 Most Populous</h3>
              <div className="space-y-3">
                {stats.top.slice(0, 5).map((c) => (
                  <CountryTile key={c.code} country={c} />
                ))}
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  )
}
