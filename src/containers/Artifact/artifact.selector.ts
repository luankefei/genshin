import { createSelector } from "reselect";

const selectArtifact = (state: any) => state.artifact;

const makeSelectWeightMap = () => createSelector(selectArtifact, (state) => state.weightMap);
const makeSelectFilterMap = () => createSelector(selectArtifact, (state) => state.filterMap);
const makeSelectWeightMapInUse = () => createSelector(selectArtifact, (state) => state.weightMapInUse);

export { makeSelectWeightMap, makeSelectFilterMap, makeSelectWeightMapInUse };
