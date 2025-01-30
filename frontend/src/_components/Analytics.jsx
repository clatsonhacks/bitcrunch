import React from 'react';
import { LineChart, BarChart3 } from 'lucide-react';
import Graph from './Graph';

function Analytics() {
  return (
    <div className="grid grid-cols-2 gap-6">
      <Graph title="Line Graph" icon={LineChart} />
      <Graph title="What If Graph" icon={BarChart3} />
    </div>
  );
}

export default Analytics;