import { createSelector } from "reselect";

const selectArtifact = (state: any) => state.artifact;

const makeSelectFriendList = () => createSelector(selectArtifact, (state) => state.friendList);
