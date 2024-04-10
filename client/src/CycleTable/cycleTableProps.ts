import { Cycle } from "../Types/cycleProps"

type CycleTableProps = {
  headers: string[],
  cycleData: Cycle[],
  handleShowChart: (...args: any[]) => void
}

export type { CycleTableProps };
