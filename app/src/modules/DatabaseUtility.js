const { app, remote } = require("electron");
const axios = require("axios");
const JSONdb = require("simple-json-db");
const mysql = require("mysql");
const path = require("path");
const bcrypt = require("bcryptjs");
const fs = require("fs");

const browserUtility = require("./BrowserWindowUtility");
const { STATUSES, ACTIONS } = require("./constants");

const config = require("../config/db.config");

const configDir = (app || remote.app).getPath("userData");

const jsonDbConfig = {
  jsonSpaces: 2,
};

let db;
let browserWindow;

const migration = () => {
  let connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB,
  });
  this.executeQuery = (query) => {
    return new Promise((resolve, reject) => {
      connection.query(query, (err) => {
        if (err) throw reject(err);
        resolve();
      });
    });
  };
  connection.connect((err) => {
    if (err) {
      console.log("connection error");
    } else {
      let untracked = db.get("untracked");
      let temp = untracked;
      untracked.map(async (item) => {
        let query = "";
        switch (item.flag) {
          case ACTIONS.ADD:
            query = `INSERT INTO scooters(name, phone, barcode, model, termen, problem, content, price, statusId) VALUES('${item.name}', '${item.phone}', '${item.barcode}', '${item.model}', '${item.termen}', '${item.problem}', '${item.content}', '${item.price}', ${item.statusId})`;
            break;
          case ACTIONS.EDIT:
            query = `UPDATE scooters set name = '${item.name}', phone = '${item.phone}', barcode = '${item.barcode}', model = '${item.model}', termen = '${item.termen}', problem = '${item.problem}', content = '${item.content}', price = '${item.price}', statusId = ${item.statusId} WHERE id = ${item.id}`;
            break;
          case ACTIONS.DELETE:
            query = `DELETE from scooters WHERE id = ${item.id}`;
            break;
          default:
            break;
        }
        if (query) {
          await this.executeQuery(query);
          temp = temp.filter((obj) => obj.id !== item.id);
          db.set("untracked", temp);
        }
      });
      connection.query("SELECT * FROM users", (err, rows) => {
        if (err) {
          console.log("An error ocurred performing the query.");
          console.log(err);
        }

        db.set("users", rows);
      });

      connection.query("SELECT * FROM scooters", (err, rows) => {
        if (err) {
          console.log("An error ocurred performing the query.");
          console.log(err);
        }

        db.set("scooters", rows);
      });
      connection.end();
      return true;
    }
  });
  return true;
};

module.exports.initial = () => {
  // axios
  //   .get("http://localhost:8081/api/scooter/3")
  //   .then((response) => {
  //     console.log(response);
  //   })
  //   .catch((error) => {
  //     console.log(error);
  //   });
  db = new JSONdb(path.join(configDir, "data.json"), jsonDbConfig);
  if (!db.has("untracked")) {
    db.set("untracked", []);
  }
  let connection = mysql.createConnection({
    host: config.HOST,
    user: config.USER,
    password: config.PASSWORD,
    database: config.DB,
  });
  // connect to mysql
  connection.connect(async (err) => {
    if (err) {
      if (!db.has("users")) {
        db.set("users", [
          {
            id: 1,
            name: "Super Admin",
            email: "superadmin@gmail.com",
            password: bcrypt.hashSync("superadmin", 8),
            roleId: 1,
          },
        ]);
      }
      if (!db.has("scooters")) {
        db.set("scooters", []);
      }
    } else {
      // db migration
      migration();
      connection.end();
    }
  });
};

module.exports.getUserByEmail = (email) => {
  const users = db.get("users");
  const user = users.find((item) => item.email === email);
  return user ? user : null;
};

module.exports.getScooterList = (statusId = 0) => {
  let scooters;
  scooters = db.get("scooters");
  if (statusId) {
    scooters = scooters.filter((item) => item.statusId === statusId);
  }
  return scooters;
};

module.exports.addScooter = (data) => {
  this.handleScooter = (value) => {
    let scooters = db.get("scooters");
    scooters.push(value);
    db.set("scooters", scooters);
    browserWindow = browserUtility.getBrowserWindow();
    browserWindow.webContents.send("DATA_CHANGE");
  };
  this.handleUntracked = (value) => {
    let untracked = db.get("untracked");
    const temp = {
      ...value,
      flag: "add",
    };
    untracked.push(temp);
    db.set("untracked", untracked);
  };
  try {
    let connection = mysql.createConnection({
      host: config.HOST,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DB,
    });
    connection.connect((err) => {
      if (err) {
        this.handleUntracked(data);
        this.handleScooter(data);
      } else {
        const query = `INSERT INTO scooters(name, phone, barcode, model, termen, problem, content, price, statusId) VALUES('${data.name}', '${data.phone}', '${data.barcode}', '${data.model}', '${data.termen}', '${data.problem}', '${data.content}', '${data.price}', ${data.statusId})`;
        connection.query(query, (err, result, fields) => {
          if (err) {
            this.handleUntracked(data);
            this.handleScooter(data);
          } else {
            data.id = result.insertId;
            this.handleScooter(data);
            migration();
          }
        });
        connection.end();
      }
    });
  } catch (error) {
    console.log(error);
  }
};

module.exports.updateScooter = (data) => {
  this.handleScooter = (value) => {
    const scooters = db.get("scooters").map((item) => {
      let temp = Object.assign({}, item);
      if (temp.id === value.id) {
        temp = value;
      }
      return temp;
    });
    db.set("scooters", scooters);
    browserWindow = browserUtility.getBrowserWindow();
    browserWindow.webContents.send("DATA_CHANGE");
  };
  this.handleUntracked = (value) => {
    let untracked = db.get("untracked");
    const exist = untracked.some((item) => item.id === value.id);
    if (exist) {
      untracked = untracked.map((item) => {
        let temp = Object.assign({}, item);
        if (temp.id === value.id) {
          Object.keys(temp).forEach((key, index) => {
            if (value[key]) {
              temp[key] = value[key];
            }
          });
        }
        return temp;
      });
    } else {
      const temp = {
        ...value,
        flag: "edit",
      };
      untracked.push(temp);
    }
    db.set("untracked", untracked);
  };
  try {
    let connection = mysql.createConnection({
      host: config.HOST,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DB,
    });
    connection.connect((err) => {
      if (err) {
        this.handleUntracked(data);
      } else {
        const query = `UPDATE scooters set name = '${data.name}', phone = '${data.phone}', barcode = '${data.barcode}', model = '${data.model}', termen = '${data.termen}', problem = '${data.problem}', content = '${data.content}', price = '${data.price}', statusId = ${data.statusId} WHERE id = ${data.id}`;
        connection.query(query, (err) => {
          if (err) {
            this.handleUntracked(data);
          }
          migration();
        });
        connection.end();
      }
    });
    this.handleScooter(data);
  } catch (error) {
    console.log(error);
  }
};

module.exports.deleteScooter = (data) => {
  this.handleScooter = (value) => {
    const scooters = db.get("scooters").filter((item) => item.id !== value.id);
    db.set("scooters", scooters);
    browserWindow = browserUtility.getBrowserWindow();
    browserWindow.webContents.send("DATA_CHANGE");
  };
  this.handleUntracked = (value) => {
    let untracked = db.get("untracked");
    const exist = untracked.some((item) => item.id === value.id);
    if (exist) {
      untracked = untracked.filter((item) => item.id !== value.id);
    } else {
      const temp = {
        ...value,
        flag: "delete",
      };
      untracked.push(temp);
    }
    db.set("untracked", untracked);
  };
  try {
    let connection = mysql.createConnection({
      host: config.HOST,
      user: config.USER,
      password: config.PASSWORD,
      database: config.DB,
    });
    connection.connect((err) => {
      if (err) {
        this.handleUntracked(data);
      } else {
        const query = `DELETE from scooters WHERE id = ${data.id}`;
        connection.query(query, (err, result, fields) => {
          if (err) {
            this.handleUntracked(data);
          }
          migration();
        });
        connection.end();
      }
    });
    this.handleScooter(data);
  } catch (error) {
    console.log(error);
  }
};
