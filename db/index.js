import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('address.db');

export const init = () => {
  const initPromise = new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(`
            CREATE TABLE IF NOT EXISTS user_profile_data(
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT,
                email TEXT NOT NULL,
                photoUri TEXT
            )`,
        [],
        () => { resolve() },
        (_, error) => { reject(error) });
    })
  })
  return initPromise;
}

export const createUserDataLocal = (id, email) => {
  const createUserDataLocalPromise = new Promise((resolve, reject) => {
  db.transaction(function (tx) {
    tx.executeSql(`INSERT INTO user_profile_data
      (id, email)
      values(?, ?)
    `,
    [id, email],
    (_, result)=>{resolve(result)},
    (_, error)=>{reject(error)});
  })
})
  return createUserDataLocalPromise;
}

export const updateUserDataLocal = (id, name, email, photoUri) =>{
  const updateUserDataLocalPromise = new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(`
        UPDATE user_profile_data
        SET name = '${name}',
            email = '${email}',
            photoUri = ${photoUri}
        WHERE id = '${id}'
      `, 
      [],
      (_, result) => { resolve(result) },
      (_, error) => { reject(error) });
    })
  })
  return updateUserDataLocalPromise;
}

export const getUserLocalData = (id, dbfield) =>{
  const getUserLocalDataPromise = new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(
        `SELECT ${dbfield} FROM user_profile_data where id = '${id}'`,
        [],
        (_, result) => { resolve(result.rows._array[0]) },
        (_, error) => { reject(error) })
    })
  })
  return getUserLocalDataPromise;
}