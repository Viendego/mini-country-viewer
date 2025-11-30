function formatNumber(n) {
  return new Intl.NumberFormat('en-US').format(n)
}

export default function CountryTile({ country }) {
  return (
    <div className="flex items-center gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
      <img src={country.flag} alt={`${country.name} flag`} className="w-12 h-8 object-cover rounded" />
      <div className="flex-1 min-w-0">
        <div className="text-sm font-medium text-gray-900 dark:text-gray-100 truncate">{country.name}</div>
        <div className="text-xs text-gray-500 dark:text-gray-300 truncate">{country.capital} • {country.region}</div>
      </div>
      <div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{formatNumber(country.population)}</div>
    </div>
  )
}
