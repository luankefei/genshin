import { AnyAction } from "redux";
import {
  createReducer,
  createAsyncAction,
  createAction,
} from "../../redux/reduxActionTools";
import { minorKeys, minorStat } from "../../utils/artifact.dict";

const CREATE_ARTIFACTS = "artifact/CREATE_ARTIFACTS";
const UPDATE_FILTER_MAP = "artifact/UPDATE_FILTER_MAP";
const UPDATE_FILTER_MAP_SUCCESS = "artifact/UPDATE_FILTER_MAP_SUCCESS";
const UPDATE_WEIGHT_MAP = "artifact/UPDATE_WEIGHT_MAP";
const UPDATE_ARTIFACTS = "artifact/UPDATE_ARTIFACTS";
// const UPDATE_WEIGHT_MAP_SUCCESS = "artifact/UPDATE_WEIGHT_MAP_SUCCESS";

// const facts = [
//   {
//     set: "EchoesOfAnOffering",
//     slot: "flower",
//     rarity: 5,
//     level: 20,
//     lock: false,
//     location: "",
//     mainKey: "hp",
//     minors: [
//       { key: "cr", value: 10.5 },
//       { key: "er", value: 11.7 },
//       { key: "hpp", value: 4.1 },
//       { key: "atkp", value: 8.7 },
//     ],
//     data: { index: 0, affnum: { cur: 0, avg: 0, min: 0, max: 0 }, lock: false },
//   },
//   {
//     set: "OceanHuedClam",
//     slot: "flower",
//     rarity: 5,
//     level: 20,
//     lock: false,
//     location: "",
//     mainKey: "hp",
//     minors: [
//       { key: "er", value: 17.5 },
//       { key: "atk", value: 16 },
//       { key: "atkp", value: 15.2 },
//       { key: "hpp", value: 5.3 },
//     ],
//     data: { index: 1, affnum: { cur: 0, avg: 0, min: 0, max: 0 }, lock: false },
//   },
// ];

type IState = any;

const initialState = {
  artifacts: [],
  artifactsBackup: [],

  filteredArtifacts: [],
  filterMap: {
    set: "",
    slot: "",
    mainKey: "", // mainKey should be better...
    location: "all", // 'all' is a temporary workaround, fix it later
    lock: "", // '', 'true', 'false'
    lvRange: 0,
  },
  weightMap: {
    hp: 0,
    atk: 0,
    def: 0,
    hpp: 0,
    atkp: 0.5,
    defp: 0,
    em: 0.5,
    er: 0.5,
    cr: 1,
    cd: 1,
  },
  sortBy: "avg",
};

function updateWeightMap(state: IState, action: AnyAction) {
  const { weightMap } = state;
  const { key, value } = action.payload;
  const obj = JSON.parse(JSON.stringify(weightMap));
  obj[key] = value;

  return {
    ...state,
    weightMap: obj,
  };
}

function updateFilterMap(state: IState, action: AnyAction) {
  const { filterMap } = action.payload;

  console.log("in store updateFilter", filterMap);

  return {
    ...state,
    filterMap,
  };
}

function createArtifacts(state: IState, action: AnyAction) {
  const { artifacts } = action.payload;

  return {
    ...state,
    artifacts,
    artifactsBackup: artifacts,
  };
}

const WeightCache: { [key: string]: any } = {};
const AffnumDistrCache: { [key: string]: any } = {};

function clear() {
  this.data.score = 0;
  this.data.charScores = [];
  this.data.defeat = 0;
}

// 不确定是否能用上，暂不放开
/*
function updateScore() {
  this.data.score = 0;
  this.data.charScores = [];
  function get_weight(minors: string) {
    if (minors in WeightCache) return WeightCache[minors];
    return (WeightCache[minors] = JSON.parse(minors));
  }
  const AffnumCache: { [key: string]: number } = {};
  function get_affnum(artifact: any, minors: string, weight: { [key: string]: number }) {
    if (minors in AffnumCache) return AffnumCache[minors];
    let s = artifact.getAvgAffnum(weight);
    // for (let m of artifact.minors) {
    //     s += weight[m.key] * m.value / data.minorStat[m.key].v
    // }
    // here 'affnum' should be Math.round('current affnum' * 10)
    return (AffnumCache[minors] = Math.round(s * 10));
  }
  function get_affnum_distr(minors: string, main: string, weight: { [key: string]: number }) {
    let distr_key = minors + "|" + main;
    if (distr_key in AffnumDistrCache) return AffnumDistrCache[distr_key];
    let d = affnumDistr(main, weight);
    return (AffnumDistrCache[distr_key] = d);
  }
  const ScoreCache: { [key: string]: number } = {};
  function get_score(minors: string, slot: string, main: string, distr: number[], affnum: number) {
    if (minors in ScoreCache) return ScoreCache[minors];
    let p = data.mainDistr[slot][main] / 5;
    let x = affnum >= distr.length ? 1 : distr[affnum];
    return (ScoreCache[minors] = (p * x + 1 - p) ** 100);
  }
  for (let charKey in build) {
    // if the main stat is not recommanded, skip
    if (!build[charKey].main[this.slot].includes(this.mainKey)) continue;
    // set factor
    let n_set = 2;
    if (build[charKey].set[4].includes(this.set)) {
      n_set = 1;
    } else if (build[charKey].set[2].includes(this.set)) {
      n_set = 1;
    }
    // get score
    let weight = get_weight(build[charKey].minors);
    let affnum = get_affnum(this, build[charKey].minors, weight);
    let distr = get_affnum_distr(build[charKey].minors, this.mainKey, weight);
    let score = get_score(build[charKey].minors, this.slot, this.mainKey, distr, affnum) ** n_set;
    // console.log(charKey, build[charKey].minors)
    // console.log(weight)
    // console.log(affnum)
    // console.log(distr)
    // console.log(score)
    // update
    if (score < 0.001) continue;
    this.data.charScores.push({ charKey, score });
    this.data.score = Math.max(this.data.score, score);
  }
  this.data.charScores.sort((a, b) => b.score - a.score);
}
*/

// validate() {
//   assert(this.rarity == 5, 'Only 5 star artifacts are supported')
//   assert([3, 4].includes(this.minors.length), 'Invalid artifact: number of minors is not 3 or 4')
//   assert(this.level >= 0 && this.level <= 20, 'Invalid artifact: invalid level')
//   assert(this.level < 4 || this.minors.length == 4, 'Invalid artifact: number of minors is not 4')
// }

function argmax(obj: { [key: string]: number }, A: Set<string>): unknown {
  let m: number | undefined = undefined,
    ma: string | undefined = undefined;
  A.forEach((a) => {
    if (a in obj) {
      if (m === undefined || obj[a] > m) {
        m = obj[a];
        ma = a;
      }
    }
  });
  return ma;
}

function argmin(obj: { [key: string]: number }, A: Set<string>): unknown {
  let m: number | undefined = undefined,
    ma: string | undefined = undefined;
  A.forEach((a) => {
    if (a in obj) {
      if (m === undefined || obj[a] < m) {
        m = obj[a];
        ma = a;
      }
    }
  });
  return ma;
}

// TODO: 处理this.data，传入数据直接修改
function updateAffnum(w: { [key: string]: number }) {
  // Refer to ./README.md for symbols and equations
  this.data.affnum = { cur: 0, avg: 0, min: 0, max: 0 };
  let A: Set<string> = new Set(),
    Ac = new Set(minorKeys),
    sum_w = 0;
  Ac.delete(this.mainKey);
  for (let a of this.minors) {
    this.data.affnum.cur += (w[a.key] * a.value) / minorStat[a.key].v / 0.85;
    A.add(a.key);
    Ac.delete(a.key);
    sum_w += w[a.key];
  }
  if (this.minors.length == 3) {
    // avg
    let dn = 0,
      nm = 0; // denominator and numerator
    Ac.forEach((a_key) => {
      nm += w[a_key] * minorStat[a_key].p;
      dn += minorStat[a_key].p;
    });
    this.data.affnum.avg = this.data.affnum.cur + sum_w + (2 * nm) / dn;
    // max
    let a4_key = argmax(w, Ac) as string;
    A.add(a4_key);
    let astar_key = argmax(w, A) as string;
    A.delete(a4_key);
    this.data.affnum.max =
      this.data.affnum.cur + (w[a4_key] + 4 * w[astar_key]) / 0.85;
    // min
    a4_key = argmin(w, Ac) as string;
    A.add(a4_key);
    astar_key = argmin(w, A) as string;
    A.delete(a4_key);
    this.data.affnum.min =
      this.data.affnum.cur + ((w[a4_key] + 4 * w[astar_key]) * 0.7) / 0.85;
  } else {
    // this.minors.length == 4
    let n = Math.ceil((20 - this.level) / 4); // n.o. upgrades
    // avg
    this.data.affnum.avg = this.data.affnum.cur + (n * sum_w) / 4;
    // max
    let astar_key = argmax(w, A) as string;
    this.data.affnum.max = this.data.affnum.cur + (n * w[astar_key]) / 0.85;
    // min
    astar_key = argmin(w, A) as string;
    this.data.affnum.min =
      this.data.affnum.cur + (n * w[astar_key] * 0.7) / 0.85;
  }
}

// 5.17 这里使用backup（全部）数据，但最终数据流向artifacts
const updateArtifacts = (state: IState) => {
  const { filterMap, weightMap, artifactsBackup } = state;

  console.log("artifactsBackup", artifactsBackup.length);
  console.log("artifacts", state.artifacts.length);
  let ret = artifactsBackup.slice();

  console.log("updateArtifacts", ret.length);

  // filter
  // basic filter
  if (filterMap.set) ret = ret.filter((a) => a.set == filterMap.set);
  if (filterMap.slot) ret = ret.filter((a) => a.slot == filterMap.slot);
  if (filterMap.mainKey)
    ret = ret.filter((a) => a.mainKey == filterMap.mainKey);
  if (filterMap.location != "all")
    ret = ret.filter((a) => a.location == filterMap.location);
  if (filterMap.lock)
    ret = ret.filter((a) => a.lock.toString() == filterMap.lock);
  ret = ret.filter((a) => filterMap.lvRange >= a.level);

  // weight
  const weightMapObj = JSON.parse(JSON.stringify(weightMap));

  // update affix numbers
  for (let a of ret) {
    clear.call(a);
    updateAffnum.call(a, weightMapObj);
  }

  // sort in descending order of score
  // if (state.sortBy == "score") ret.sort((a, b) => b.data.score - a.data.score);
  // // sort in descending order of affix number
  // else if (state.sortBy)
  //   ret.sort(
  //     (a, b) =>
  //       (b.data.affnum as any)[state.sortBy] -
  //       (a.data.affnum as any)[state.sortBy]
  //   );
  // // sort in ascending order of index
  // else ret.sort((a, b) => a.data.index - b.data.index);

  // update
  return {
    ...state,
    artifacts: ret,
    weightInUse: weightMapObj,
  };
};

const actions = {
  createArtifacts: createAction(CREATE_ARTIFACTS, undefined, undefined),
  updateFilterMap: createAction(UPDATE_FILTER_MAP, undefined, undefined),
  updateWeightMap: createAction(UPDATE_WEIGHT_MAP, undefined, undefined),
  updateArtifacts: createAction(UPDATE_ARTIFACTS, undefined, undefined),
};
const reducers = createReducer()
  .when(CREATE_ARTIFACTS, createArtifacts)
  .when(UPDATE_FILTER_MAP, updateFilterMap)
  .when(UPDATE_WEIGHT_MAP, updateWeightMap)
  .when(UPDATE_ARTIFACTS, updateArtifacts)
  .build(initialState);

export { reducers as default, actions };
