import countriesData from './data/countries.json'
import StatPill from './components/dashboard_v2/StatPill'
import CountryCardLarge from './components/dashboard_v2/CountryCardLarge'
import RegionBar from './components/dashboard_v2/RegionBar'

function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n)
}

export default function DashboardV2() {
  const totalCountries = countriesData.length
  const totalPopulation = countriesData.reduce((s, c) => s + (c.population || 0), 0)
  const regions = [...new Set(countriesData.map((c) => c.region))]
  const byRegion = regions.map((r) => ({
    region: r,
    count: countriesData.filter((c) => c.region === r).length,
  }))
  const topRegion = [...byRegion].sort((a, b) => b.count - a.count)[0]
  const top6 = [...countriesData].sort((a, b) => b.population - a.population).slice(0, 6)
  const featured = countriesData.find((c) => c.name === 'Algeria') || top6[0]
  const featuredMillions = featured && featured.population ? (featured.population / 1_000_000).toFixed(1) : null

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-gray-50 to-white dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 py-12 px-8 text-gray-900 dark:text-gray-100">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
            <div>
            <h1 className="text-5xl font-extrabold leading-tight text-gray-900 dark:text-[#4f46e5]">Global Country Insights</h1>
            <p className="mt-2 text-gray-600 dark:text-gray-300 max-w-xl">
              {`Overview: ${totalCountries} countries across ${regions.length} regions, total population ${formatNumber(totalPopulation)}.`}
              {top6.length > 0 && (
                <> {` Largest country: ${top6[0].name} (${formatNumber(top6[0].population)}).`}</>
              )}
              {topRegion && (` Most countries in region: ${topRegion.region} (${topRegion.count}).`)}
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="px-4 py-2 rounded-md bg-transparent border border-gray-200 dark:border-gray-700 text-sm text-gray-700 dark:text-gray-200">Share</button>
            <button className="px-4 py-2 rounded-md bg-indigo-600 text-white text-sm">Filters</button>
          </div>
        </div>

        <div className="grid grid-cols-12 gap-6">
          {/* Left column: main editorial area */}
          <div className="col-span-12 lg:col-span-8 space-y-6">
            <div className="grid grid-cols-3 gap-4">
              <StatPill label="Countries" value={totalCountries} sub="active" />
              <StatPill label="Total Population" value={formatNumber(totalPopulation)} sub="people" />
              <StatPill label="Regions" value={regions.length} sub="distinct" />
            </div>

            <section className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg p-6">
              <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100">Top Populated Countries</h2>
              <p className="text-sm text-gray-500 dark:text-gray-300 mt-1">Quick glance: largest populations in the dataset.</p>

              <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-4">
                {top6.map((c) => (
                  <CountryCardLarge key={c.code} country={c} />
                ))}
              </div>
            </section>

            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow p-6">
              <h3 className="text-md font-semibold text-gray-800 dark:text-gray-100 mb-4">Regional Breakdown</h3>
              <div className="space-y-3">
                {regions.map((r) => (
                  <RegionBar key={r} region={r} countries={countriesData.filter((c) => c.region === r)} total={totalCountries} />
                ))}
              </div>
            </div>
          </div>

          {/* Right column: context + actions */}
          <aside className="col-span-12 lg:col-span-4">
            <div className="sticky top-6 space-y-5">
              <div className="bg-[#4F46E5] text-white rounded-2xl p-5 shadow-lg">
                <div className="text-sm uppercase opacity-80">Snapshot</div>
                <div className="mt-3 text-2xl font-bold">{formatNumber(totalPopulation)}</div>
                <div className="mt-2 text-xs opacity-80">Population across {totalCountries} countries</div>
              </div>

              <div className="bg-[#4F46E5] rounded-2xl p-4 shadow">
                <h2 className="text-lg font-semibold text-gray-800 dark:text-gray-100 mb-3">Featured Nation</h2>

                <div className="flex items-start gap-4">
                  <img src={featured.flag} alt={`${featured.name} flag`} className="w-14 h-10 object-cover rounded" />
                  <div className="flex-1">
                    <div className="text-sm text-gray-500 dark:text-gray-300">{featured.region}</div>
                    <div className="mt-1 font-semibold text-gray-900 dark:text-gray-100">{featured.name}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Capital: <span className="font-medium text-gray-800 dark:text-gray-100">{featured.capital}</span></div>
                    <div className="text-sm text-gray-600 dark:text-gray-300">Population: <span className="font-medium text-gray-800 dark:text-gray-100">{formatNumber(featured.population)}</span></div>

                    <p className="mt-3 text-sm text-gray-700 dark:text-gray-200">
                      {featured.name === 'Algeria'
                        ? 'Algeria is the most populous country in our dataset with approximately 46.0 million people.'
                        : `${featured.name} is the most populous country in our dataset with approximately ${featuredMillions} million people.`}
                    </p>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-gray-800 rounded-2xl p-4 shadow">
                <h4 className="text-sm font-semibold text-gray-800 dark:text-gray-100 mb-3">Preview</h4>
                <div className="grid grid-cols-1 gap-3">
                  {top6.slice(0, 4).map((c, i) => (
                    <div key={c.code} className="flex items-center gap-3">
                      <div className="flex items-center justify-center w-8 h-6 rounded bg-indigo-50 dark:bg-indigo-700 text-indigo-700 dark:text-indigo-100 text-xs font-semibold">{`Top ${i + 1}`}</div>
                      <img src={c.flag} alt="flag" className="w-10 h-7 object-cover rounded" />
                      <div className="text-sm">
                        <div className="font-medium text-gray-900 dark:text-gray-100">{c.name}</div>
                        <div className="text-xs text-gray-500 dark:text-gray-300">{c.region}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
