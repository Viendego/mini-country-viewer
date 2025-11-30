export default function StatCard({ label, value }) {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-5 flex flex-col justify-between">
      <div className="text-sm text-gray-500 dark:text-gray-300">{label}</div>
      <div className="mt-3 text-2xl font-extrabold text-gray-900 dark:text-gray-100">{value}</div>
      <div className="mt-2 text-xs text-gray-400 dark:text-gray-300">Updated just now</div>
    </div>
  )
}
