export default function RegionBar({ region, countries, total }) {
  const pct = Math.round((countries.length / total) * 100)
  return (
    <div className="flex items-center gap-4">
      <div className="w-36 text-sm text-[#6969df]">{region}</div>
      <div className="flex-1 bg-gray-100 rounded-full h-3 overflow-hidden">
        <div className="h-3 bg-gradient-to-r from-violet-500 to-teal-500" style={{ width: `${pct}%` }} />
      </div>
      <div className="w-16 text-right text-sm font-medium text-gray-800">{countries.length}</div>
    </div>
  )
}
