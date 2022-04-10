import { createReducer, createAsyncAction, createAction } from "../../redux/reduxActionTools";

const RECORD = "custom/RECORD";

const initialState = {
  artifacts: [],
  filteredArtifacts: [],
  filter: {
    set: "",
    slot: "",
    main: "", // mainKey should be better...
    location: "all", // 'all' is a temporary workaround, fix it later
    lock: "", // '', 'true', 'false'
    lvRange: [0, 20],
  },
  weight: { hp: 0, atk: 0, def: 0, hpp: 0, atkp: 0.5, defp: 0, em: 0.5, er: 0.5, cr: 1, cd: 1 },
};

const actions = {};
const reducers = createReducer().build(initialState);

export { reducers as default, actions };
