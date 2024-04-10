import { API_CYCLE } from "../Constants/const";
import data from './data.json';

const fetchCycleData = () => {
  return fetch(API_CYCLE).then((res) => res.json());
}

const fetchCycleDataHardcoded = () => {
  return Promise.resolve(data);
}

export { fetchCycleData, fetchCycleDataHardcoded };
