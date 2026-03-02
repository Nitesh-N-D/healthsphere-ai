import {
  LineChart, Line, BarChart, Bar, AreaChart, Area,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend
} from 'recharts'

interface ChartProps {
  data: any[]
  type?: 'line' | 'bar' | 'area'
  dataKeys: { key: string; color: string; name?: string }[]
  xKey: string
  height?: number
  grid?: boolean
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="glass-card px-4 py-3 text-xs">
        <p className="text-obsidian-300 mb-2">{label}</p>
        {payload.map((p: any, i: number) => (
          <p key={i} style={{ color: p.color }} className="font-medium">
            {p.name}: {p.value}
          </p>
        ))}
      </div>
    )
  }
  return null
}

export default function Chart({ data, type = 'line', dataKeys, xKey, height = 300, grid = true }: ChartProps) {
  const commonProps = {
    data,
    margin: { top: 5, right: 5, left: -20, bottom: 5 },
  }

  const axisStyle = { fill: '#627d98', fontSize: 11 }

  const renderChart = () => {
    if (type === 'bar') {
      return (
        <BarChart {...commonProps}>
          {grid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,212,191,0.08)" />}
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#627d98' }} />
          {dataKeys.map(dk => (
            <Bar key={dk.key} dataKey={dk.key} fill={dk.color} name={dk.name || dk.key} radius={[4, 4, 0, 0]} />
          ))}
        </BarChart>
      )
    }
    if (type === 'area') {
      return (
        <AreaChart {...commonProps}>
          {grid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,212,191,0.08)" />}
          <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
          <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend wrapperStyle={{ fontSize: 11, color: '#627d98' }} />
          {dataKeys.map(dk => (
            <Area
              key={dk.key}
              type="monotone"
              dataKey={dk.key}
              stroke={dk.color}
              fill={`${dk.color}20`}
              name={dk.name || dk.key}
              strokeWidth={2}
            />
          ))}
        </AreaChart>
      )
    }
    return (
      <LineChart {...commonProps}>
        {grid && <CartesianGrid strokeDasharray="3 3" stroke="rgba(45,212,191,0.08)" />}
        <XAxis dataKey={xKey} tick={axisStyle} axisLine={false} tickLine={false} />
        <YAxis tick={axisStyle} axisLine={false} tickLine={false} />
        <Tooltip content={<CustomTooltip />} />
        <Legend wrapperStyle={{ fontSize: 11, color: '#627d98' }} />
        {dataKeys.map(dk => (
          <Line
            key={dk.key}
            type="monotone"
            dataKey={dk.key}
            stroke={dk.color}
            name={dk.name || dk.key}
            strokeWidth={2}
            dot={{ fill: dk.color, r: 4, strokeWidth: 0 }}
            activeDot={{ r: 6 }}
          />
        ))}
      </LineChart>
    )
  }

  return (
    <ResponsiveContainer width="100%" height={height}>
      {renderChart()}
    </ResponsiveContainer>
  )
}
