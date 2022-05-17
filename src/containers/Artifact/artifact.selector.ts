import { createSelector } from "reselect";

const selectArtifact = (state: any) => state.artifact;

const makeSelectArtifacts = () => createSelector(selectArtifact, (state) => state.artifacts);
const makeSelectArtifactsBackup = () => createSelector(selectArtifact, (state) => state.artifactsBackup);
const makeSelectWeightMap = () => createSelector(selectArtifact, (state) => state.weightMap);
const makeSelectFilterMap = () => createSelector(selectArtifact, (state) => state.filterMap);

export { makeSelectArtifacts, makeSelectArtifactsBackup, makeSelectWeightMap, makeSelectFilterMap };
