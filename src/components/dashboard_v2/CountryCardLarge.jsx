function formatNumber(n) {
	return new Intl.NumberFormat('en-US').format(n)
}

export default function CountryCardLarge({ country }) {
	return (
		<div className="flex items-center gap-4 bg-gray-50 dark:bg-gray-800 rounded-xl p-4">
			<img src={country.flag} alt={`${country.name} flag`} className="w-16 h-10 object-cover rounded" />
			<div className="flex-1 min-w-0">
				<div className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">{country.name}</div>
				<div className="text-xs text-gray-500 dark:text-gray-300 truncate">{country.capital} • {country.region}</div>
			</div>
			<div className="text-sm font-semibold text-gray-800 dark:text-gray-100">{formatNumber(country.population)}</div>
		</div>
	)
}

