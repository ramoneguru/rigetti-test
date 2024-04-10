import React from "react";
import { Chart as ChartJS, ArcElement, Tooltip, Legend, CategoryScale, LinearScale,
  BarElement,  PointElement, LineElement } from 'chart.js';
import { CycleTable } from '../CycleTable/cycleTable';
import { Cycle } from '../Types/cycleProps';
import { fetchCycleData } from '../Data/fetchCycleData';
import { getAggregatedCycleData, getCamelCaseData } from '../Utils/cycleUtils';
import { CyclePie } from '../Chart/cyclePie';
import { CycleBar } from '../Chart/cycleBar';
import './dashboard.css';

ChartJS.register(ArcElement, Tooltip, Legend, CategoryScale, LinearScale, BarElement, PointElement, LineElement);

const Dashboard = () => {
    // cheating here since I know the headers will all be the same for each object
    const headers = ["Fridge Id","Cooldown Number","Cooldown Start","Cooldown End","Warmup Start","Warmup End", "Chart Links"];
    // For ease of use we are keeping the table data and chart data separate
    const [cycleTableData, setCycleTableData] = React.useState<Cycle[]>();
    const [cycleChartData, setCycleChartData] = React.useState();
    const [selectedFridge, setSelectedFridge] = React.useState();
    const [currentCycleChartData, setCurrentCycleChartData] = React.useState();

    React.useEffect(() => {
      // API not working? Replace getCycleData with fetchCycleDataHardcoded
      fetchCycleData().then((res: Cycle[]) => {
        // Using camelCase since out of habit, no real technical reason for it
        const camelCaseData = getCamelCaseData(res);
        // Once we've loaded the raw data, we need to do some calculations in order to get the
        // data structured for our chart data
        const updatedCycleChartData = getAggregatedCycleData(camelCaseData);
        setCycleTableData(camelCaseData);
        setCycleChartData(updatedCycleChartData);
      });
    }, []);

    const handleShowChart = (cycleInstanceData: Cycle) => {
      const chartData = cycleChartData?.filter((item) => item.fridgeId === cycleInstanceData.fridgeId && item.cycleId === cycleInstanceData.coolDownNumber)
      // Select the '0' index since there will only be 1 element in the filtered result set
      setCurrentCycleChartData(chartData[0]);
    }

    const handleSelectFridgeChange = (e) => {
      const selected = e.target.value;
      setSelectedFridge(selected);
      setCurrentCycleChartData(undefined);
    }

    const filteredData = cycleTableData?.filter((item) => item.fridgeId === selectedFridge);
    const tableData = (filteredData?.length > 0) ? filteredData : cycleTableData;

    return (
      <React.Fragment>
        <h1>Cycle Dashboard</h1>
        {/* This could be an individual component, and use a variable amount of fridgeIds */}
        <div className="cycle-fridge">
          <label htmlFor="options">Select a fridge: </label>
          <select id="options" value={selectedFridge} onChange={handleSelectFridgeChange}>
            <option value="all">All fridges</option>
            <option value="0">0</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
          </select>
        </div>
        {cycleTableData ? (
          <CycleTable cycleData={tableData} headers={headers} handleShowChart={handleShowChart}/>
          ) : (
            <div>Loading...</div>
          )
        }
        {currentCycleChartData ? (
          <div className="chart-grid">
            <CyclePie chartData={currentCycleChartData} />
            <CycleBar chartData={currentCycleChartData} />
          </div>
          ) : (
            <div>No Chart Selected</div>
          )
        }
      </React.Fragment>
    )
}

export { Dashboard };
