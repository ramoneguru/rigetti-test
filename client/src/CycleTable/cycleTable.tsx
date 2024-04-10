import { CycleTableProps } from './cycleTableProps';
import './cycleTable.css';

const CycleTable: React.FC<CycleTableProps> = ({headers, cycleData, handleShowChart}) => {
  return (
    <table cellSpacing={0}>
      <thead>
        <tr>
          {headers.map((item, index) => {
            return (
              <th key={`${item}-${index}`}>{item}</th>
            )
          })}
        </tr>
      </thead>
      <tbody>
        {cycleData.map((item, index) => {
          return (
            <tr key={`${item.fridgeId}-${index}`}>
              <td>{item.fridgeId}</td>
              <td>{item.coolDownNumber}</td>
              <td>{item.coolDownStart}</td>
              <td>{item.coolDownEnd}</td>
              <td>{item.warmUpStart}</td>
              <td>{item.warmUpEnd}</td>
              <td onClick={() => handleShowChart(item)}>
                <span className='chart-link'>Show Chart</span>
              </td>
            </tr>
          )
        })}
      </tbody>
    </table>
  )
}

export { CycleTable };
