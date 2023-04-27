export const SIGN_IN = "SIGN_IN"
export const LOG_IN = "LOG_IN"
export const GET_USER_DATA = "GET_USER_DATA"
export const UPDATE_USER_DATA = "UPDATE_USER_DATA"
export const LOG_OUT = "LOG_OUT"


export const signUp = (user, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: user,
      password: password,
      returnSecureToken: true
    })
  }

  return async dispatch => {
    return await fetch(`${process.env.API_URL_FIREBASE_SIGNUP}${process.env.FIREBASE_API_KEY}`, options)
      .then(data => data.json())
      .then((res) => {
        if (res.error && res.error.code === 400) {
          console.log(res.error.message)
          switch (res.error.message) {
            case "EMAIL_EXISTS":
              alert('El email ya se encuentra registrado.')
              break;
            case "TOO_MANY_ATTEMPTS_TRY_LATER":
              alert('Hemos bloqueado todas las peticiones de este dispositivo. Intente mas tarde.')
              break;
            case "MISSING_PASSWORD":
              alert('La contrasña es obligatoria.')
              break;
            default:
              alert('Ha habido un error al registrarse. Intentelo mas tarde.')
              break;
          }
        }
        dispatch({
          type: SIGN_IN,
          token: res.idToken,
          userId: res.localId,
        })
      })
      .catch((error) => { error })
  }
}

export const login = (user, password) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      email: user,
      password: password,
      returnSecureToken: true
    })
  }
  return async dispatch => {
    return await fetch(`${process.env.API_URL_FIREBASE_LOGIN}${process.env.FIREBASE_API_KEY}`, options)
      .then(data => data.json())
      .then(res => {
        if (res.error && res.error.code === 400) {
          switch (res.error.message) {
            case "EMAIL_NOT_FOUND":
              alert('No existe el usuario.')
              break;
            case "INVALID_PASSWORD":
              alert('Clave o usuario incorrecto.')
              break;
            case "INVALID_EMAIL":
              alert('Clave o usuario incorrecto.')
              break;
            case "USER_DISABLED":
              alert('El usuario se encuentra deshabilitado por el administrador.')
              break;
            default:
              alert('Ha habido un error al ingresar. Intentelo mas tarde.')
              break;
          }
        }
        dispatch({
          type: LOG_IN,
          token: res.idToken,
          userId: res.localId
        })
      })
      .catch((error) => console.log('Error caught while loging up', error))
  }
}

export const getUserData = (idToken) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idToken,
    })
  }

  return async dispatch => {
    try {
      const response = await fetch(`${process.env.API_URL_FIREBASE_GET_USER_DATA}${process.env.FIREBASE_API_KEY}`, options);

      const data = await response.json();

      dispatch({
        type: GET_USER_DATA,
        user: data?.users[0]
      })
    } catch (error) {
      console.log('Error caught while fetching user data from db', error)
    }
  }
}

export const updateUserData = (idToken, displayName, photoUrl, email, returnSecureToken = true) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      idToken,
      displayName,
      photoUrl,
      email,
      returnSecureToken
    })
  }


  return async dispatch => {
    return await fetch(`${process.env.API_URL_FIREBASE_UPDATE_USER_DATA}${process.env.FIREBASE_API_KEY}`, options)
      .then(() => dispatch({ type: UPDATE_USER_DATA, message: "Perfil actualizado con éxito." }))
      .catch(error => ({ message: error.message }))
  }
}

export const logOut = () => ({
  type: LOG_OUT,
})
