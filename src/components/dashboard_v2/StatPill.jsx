export default function StatPill({ label, value, sub }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow flex flex-col">
      <div className="text-xs uppercase text-gray-500 dark:text-gray-300">{label}</div>
      <div className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="mt-1 text-xs text-gray-400 dark:text-gray-300">{sub}</div>
    </div>
  )
}
