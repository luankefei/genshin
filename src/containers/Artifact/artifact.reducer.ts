import { AnyAction } from "redux";
import { createReducer, createAsyncAction, createAction } from "../../redux/reduxActionTools";

const UPDATE_FILTER_MAP = "artifact/UPDATE_FILTER_MAP";
const UPDATE_FILTER_MAP_SUCCESS = "artifact/UPDATE_FILTER_MAP_SUCCESS";

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

function updateFilterMap(state: any, action: AnyAction) {
  const { filterMap } = action.payload;

  console.log("in store updateFilter", filterMap);

  return {
    ...state,
    filterMap,
  };
}

const actions = {
  updateFilterMap: createAction(UPDATE_FILTER_MAP, undefined, undefined),
};
const reducers = createReducer().when(UPDATE_FILTER_MAP, updateFilterMap).build(initialState);

export { reducers as default, actions };
