import CountUp from './CountUp.jsx'

/**
 * value: numeric part to animate (e.g. 78)
 * suffix/prefix: static text around it (e.g. suffix="/100" or "%")
 * decimals: decimal places to animate to
 */
export default function StatCard({ label, value, suffix = '', prefix = '', decimals = 0, icon: Icon, tone = 'default', delayClass = '' }) {
  const toneColor = {
    default: '#3b9eff',
    danger: '#ef4a5c',
    success: '#2fd480',
    warning: '#f5a623',
  }[tone]

  return (
    <div className={`stat-card anim-in ${delayClass}`}>
      <div className="stat-label">{label}</div>
      <div className="stat-value">
        <CountUp value={value} decimals={decimals} prefix={prefix} suffix={suffix} />
      </div>
      {Icon && (
        <div className="stat-icon">
          <Icon size={20} color={toneColor} />
        </div>
      )}
    </div>
  )
}
