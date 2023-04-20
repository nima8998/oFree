import * as SQLite from 'expo-sqlite';

const db = SQLite.openDatabase('address.db');

export const init_user_profile_data = () => {
  const initPromise = new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(`
            CREATE TABLE IF NOT EXISTS user_profile_data(
                id TEXT PRIMARY KEY NOT NULL,
                name TEXT,
                email TEXT NOT NULL,
                photoUri TEXT
            );
            CREATE TABLE IF NOT EXISTS user_work_time(
              id TEXT PRIMARY KEY NOT NULL,
              work_data TEXT
            );
            `,
        [],
        () => { resolve() },
        (_, error) => { reject(error) });
    })
  })
  return initPromise;
}

export const init_user_work_time = () => {
  const initPromise = new Promise((resolve, reject) => {
    db.transaction(function (tx) {
      tx.executeSql(`
            CREATE TABLE IF NOT EXISTS user_work_time(
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              id_user TEXT NOT NULL,
              work_data TEXT
            )
            `,
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

export const createWorkTimeLocal = (id_user, value) => {
  const work_data = JSON.stringify(value);
  const createWorkTimeLocalPromise = new Promise((resolve, reject) => {
    db.transaction(function (tx) {
        tx.executeSql(
          `INSERT INTO user_work_time
          (id_user, work_data)
          values(?, ?)
        `,
        [id_user, work_data],
        (_, result) => { resolve(result) },
        (_, error) => { reject(error) })
    })
  })
  return createWorkTimeLocalPromise;
}

export const getWorkTimeLocal = (id_user) => {
  const getWorkTimeLocalPromise = new Promise((resolve, reject) => {
    db.transaction(function (tx) {
        tx.executeSql(
          `select work_data
          from user_work_time
          where id_user = '${id_user}'
        `,
        [],
        (_, result) => { 
          const jsonData = result.rows._array.map(row=>JSON.parse(row.work_data))
          resolve(jsonData) 
        },
        (_, error) => { reject(error) })
    })
  })
  return getWorkTimeLocalPromise;
}