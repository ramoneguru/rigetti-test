type Cycle = {
  coolDownEnd: string,
  coolDownNumber: number,
  coolDownStart: string,
  warmUpEnd: string,
  warmUpStart: string,
  fridgeId: number,
}

type CycleData = {
  coldTime: number | string,
  coolDownTime: number | string,
  warmTime: number | string,
  warmUpTime: number | string
}

type CycleChart = {
  fridgeId: string,
  cycleId: string,
  cycleDataList: CycleData[],
  cyclePercentageList: CycleData[]
}

export type { Cycle, CycleChart };
