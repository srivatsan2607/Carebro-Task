import React from 'react'
import './Chart.css'
import { LineChart, Line, XAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';



function Chart ( { title, data, dataKey, grid } )
{
	return (
		<div className="chart">
			<h3 className="chart_title">{ title }</h3>
			<ResponsiveContainer width="100%" height="100%" aspect={ 4 / 1 }>
				<LineChart data={ data } width={ 500 }
					height={ 300 }>
					<XAxis dataKey="name" stroke="#5550bd" />
					<Line type="monotone" dataKey={ dataKey } stroke="#5550bd" />
					<Tooltip />
					{ grid && <CartesianGrid stroke="#e0dfdf" strokeDasharray="5 5" /> }
					<Legend />
				</LineChart>
			</ResponsiveContainer>
		</div>
	)
}

export default Chart
