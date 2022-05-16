import { AnyAction } from "redux";
import { createReducer, createAsyncAction, createAction } from "../../redux/reduxActionTools";

const UPDATE_FILTER_MAP = "artifact/UPDATE_FILTER_MAP";
const UPDATE_FILTER_MAP_SUCCESS = "artifact/UPDATE_FILTER_MAP_SUCCESS";
const UPDATE_WEIGHT_MAP = "artifact/UPDATE_WEIGHT_MAP";
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

const actions = {
  updateFilterMap: createAction(UPDATE_FILTER_MAP, undefined, undefined),
  updateWeightMap: createAction(UPDATE_WEIGHT_MAP, undefined, undefined),
};
const reducers = createReducer()
  .when(UPDATE_FILTER_MAP, updateFilterMap)
  .when(UPDATE_WEIGHT_MAP, updateWeightMap)
  .build(initialState);

export { reducers as default, actions };
