import { createSelector } from "reselect";

const selectArtifact = (state: any) => state.artifact;

const makeSelectWeightMap = () => createSelector(selectArtifact, (state) => state.weightMap);

export { makeSelectWeightMap };
