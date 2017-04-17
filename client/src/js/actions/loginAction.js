export default (loginCredentials) => {
  return (dispatch) => {
    dispatch({
      type: 'LOGIN_START'
    });

    fetch('/users/login', {
      method: 'POST',
      body: loginCredentials
    }).then((response)=>{
      console.log(response, 'response')
      if(response.status === 200){
        dispatch({
          type: 'LOGIN_SUCCESS'
        })
      }else{
        dispatch({
          type: 'LOGIN_FAILED',
        })
      }

    }).catch((err)=>{
      console.log(err, 'err')
      dispatch({
        type: 'LOGIN_FAILED'
      })
    })

  }
}