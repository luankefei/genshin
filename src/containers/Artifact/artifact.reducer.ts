import { AnyAction } from "redux";
import { createReducer, createAsyncAction, createAction } from "../../redux/reduxActionTools";

const UPDATE_FILTER_MAP = "artifact/UPDATE_FILTER_MAP";
const UPDATE_FILTER_MAP_SUCCESS = "artifact/UPDATE_FILTER_MAP_SUCCESS";
const UPDATE_WEIGHT_MAP = "artifact/UPDATE_WEIGHT_MAP";
const UPDATE_ARTIFACTS = "artifact/UPDATE_ARTIFACTS";
// const UPDATE_WEIGHT_MAP_SUCCESS = "artifact/UPDATE_WEIGHT_MAP_SUCCESS";

type IState = any;

const initialState = {
  artifacts: [],

  filteredArtifacts: [],
  filterMap: {
    set: "",
    slot: "",
    mainKey: "", // mainKey should be better...
    location: "all", // 'all' is a temporary workaround, fix it later
    lock: "", // '', 'true', 'false'
    lvRange: 0,
  },
  weightMap: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 },
  weightMapInUse: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 },
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

const updateArtifacts = (state: IState) => {
  const { filterMap, weightInUse } = state;
  // state.loading = true;

  let ret = state.artifacts.slice();
  // filter
  // basic filter
  if (filterMap.set) ret = ret.filter((a) => a.set == filterMap.set);
  if (filterMap.slot) ret = ret.filter((a) => a.slot == filterMap.slot);
  if (filterMap.main) ret = ret.filter((a) => a.mainKey == filterMap.main);
  if (filterMap.location != "all") ret = ret.filter((a) => a.location == filterMap.location);
  if (filterMap.lock) ret = ret.filter((a) => a.lock.toString() == filterMap.lock);
  ret = ret.filter((a) => filterMap.lvRange[0] <= a.level && a.level <= filterMap.lvRange[1]);

  // weight
  state.weightMapInUse = state.useWeightJson ? JSON.parse(state.weightJson) : { ...state.weight };

  // update affix numbers
  for (let a of ret) {
    a.clear();
    if (state.sortBy == "score") a.updateScore();
    a.updateAffnum(weightInUse);
  }

  // sort in descending order of score
  if (state.sortBy == "score") ret.sort((a, b) => b.data.score - a.data.score);
  // sort in descending order of affix number
  else if (state.sortBy)
    ret.sort((a, b) => (b.data.affnum as any)[state.sortBy] - (a.data.affnum as any)[state.sortBy]);
  // sort in ascending order of index
  else ret.sort((a, b) => a.data.index - b.data.index);

  // update
  return {
    ...state,
    artifacts: ret,
  };
};

const actions = {
  updateFilterMap: createAction(UPDATE_FILTER_MAP, undefined, undefined),
  updateWeightMap: createAction(UPDATE_WEIGHT_MAP, undefined, undefined),
  updateArtifacts: createAction(UPDATE_ARTIFACTS, undefined, undefined),
};
const reducers = createReducer()
  .when(UPDATE_FILTER_MAP, updateFilterMap)
  .when(UPDATE_WEIGHT_MAP, updateWeightMap)
  .when(UPDATE_ARTIFACTS, updateArtifacts)
  .build(initialState);

export { reducers as default, actions };
