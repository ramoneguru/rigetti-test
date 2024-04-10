import { Cycle } from "../Types/cycleProps";

const getCamelCaseData = (data): Cycle[] => {
  return data.map((item) => {
    return ({
      fridgeId: item.fridge_id,
      coolDownNumber: item.cooldown_number,
      coolDownStart: item.cooldown_start,
      coolDownEnd: item.cooldown_end,
      warmUpStart: item.warmup_start,
      warmUpEnd: item.warmup_end
    });
  })
}

const getTimeDiff = (endTime: string, startTime: string) => {
  const et = new Date(endTime);
  const st = new Date(startTime);
  return et - st;
}

const convertToTimeUnits = (ms: number) => {
  const seconds = (ms / 1000).toFixed(1);
  const minutes = (ms / (1000 * 60)).toFixed(1);
  const hours = (ms / (1000 * 60 * 60)).toFixed(1);
  const days = (ms / (1000 * 60 * 60 * 24)).toFixed(1);
  return {
    seconds,
    minutes,
    hours,
    days
  };
}

const getCyclePercentageList = (fridgeId: number, data: Cycle | undefined, coolDownStart: string, coolDownEnd: string, warmUpStart: string, warmUpEnd: string) => {
  const coolDownTime = getTimeDiff(coolDownEnd, coolDownStart);
  const coldTime = getTimeDiff(warmUpStart, coolDownEnd);
  const warmUpTime = getTimeDiff(warmUpEnd, warmUpStart);
  const warmTime = (data && fridgeId === data.fridgeId) ? getTimeDiff(data.coolDownStart, warmUpEnd) : 0;

  const totalTime = coolDownTime + coldTime + warmUpTime + warmTime;

  const cyclePercentageList = {
    coolDownTime: ((coolDownTime / totalTime) * 100).toFixed(2),
    coldTime: ((coldTime / totalTime) * 100).toFixed(2),
    warmUpTime: ((warmUpTime / totalTime) * 100).toFixed(2),
    warmTime: ((warmTime / totalTime) * 100).toFixed(2),
  }
  return cyclePercentageList;
}

const getAggregatedCycleData = (data: Cycle[]) => {
  const resultList = data.map((item, index) => {
    // Use the fridgeId to decide if there is a potential nextCycle
    const nextCycle = (data[index+1] && item.fridgeId === data[index+1].fridgeId) ? data[index+1] : undefined;
    const cycle = {
      fridgeId: item.fridgeId,
      cycleId: item.coolDownNumber,
      cyclePercentageList: getCyclePercentageList(
        item.fridgeId,
        nextCycle,
        item.coolDownStart,
        item.coolDownEnd,
        item.warmUpStart,
        item.warmUpEnd
      ),
      cycleDataList: {
        // Cooldown time, ie. from cooldown_start to cooldown_end, per cycle
        coolDownTime: getTimeDiff(item.coolDownEnd, item.coolDownStart),
        // Cold time, ie. from cooldown_end to warmup_start, per cycle
        coldTime: getTimeDiff(item.warmUpStart, item.coolDownEnd),
        // Warmup time, ie. from warmup_start to warmup_end, per cycle
        warmUpTime: getTimeDiff(item.warmUpEnd, item.warmUpStart),
        // Warm time, ie. from warmup_end of one cycle to cooldown_start of the next cycle of the
        // same fridge, per cycle
        warmTime: (nextCycle) ? getTimeDiff(nextCycle.coolDownStart, item.warmUpEnd) : 0
      }
    }
    return cycle;
  });
  return resultList;
}

export { getCamelCaseData, convertToTimeUnits, getCyclePercentageList, getAggregatedCycleData };
