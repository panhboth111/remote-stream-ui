export default {
  getUserInfo: (state, { user, history }) => {
    state.user = { ...user, history };
  }
};
