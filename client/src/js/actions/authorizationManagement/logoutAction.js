export default () => {
  return (dispatch) => {
    dispatch({
      type: 'CLEAR_ALL',
      documents: []
    });
  };
};