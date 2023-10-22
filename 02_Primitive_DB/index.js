import inquirer from "inquirer";

import fs from 'fs/promises';

// inquirer.prompt([{name: 'username', message: 'Enter your name'}, {name: 'age', message: 'Enter your age'}]).then((answers) => {
//   console.log(answers);
// })

dbInteract();

async function dbInteract() {
  let { username } = await inquirer.prompt({name: 'username', message: 'Enter your name. Press ENTER to skip:'});
  if(!username) return await dbLoad();
  let { gender } = await inquirer.prompt({type: 'list', name: 'gender', message: 'Enter your gender:', choices: ['male', 'female']});
  let age = await getAge();
  age ? await addToDb({ username, gender, age }) : await addToDb({ username, gender });
  dbInteract();
}


async function dbLoad() {
  let { answer } = await inquirer.prompt({name: 'answer', message: 'Do you like ot search values in db? (y, n):'})
  let usersData = await loadAllFromDb();
  if(answer === 'y' || /yes/i.test(answer)) {
    console.log(usersData);
    getUserByName(usersData);
  }
}

async function getUserByName(usersData) {
  let { name } = await inquirer.prompt({name: 'name', message: 'Enter a name of user you wanna find in DB:'});
  try {
    await fs.access('./db.txt');
    let foundUsers = usersData.filter((elem) => new RegExp(`^${name}$`, 'i').test(elem.username))
    if(foundUsers.length) {
      console.log('Here the users we found:');
      foundUsers.map((el) => console.log(el));
    } else console.log('No users have been found');
  } catch {
    console.log('There is no data in the db');
  }
}

async function loadAllFromDb() {
  try {
    await fs.access('./db.txt');
    try {
      let data = await fs.readFile('./db.txt', 'utf-8');
      data = data.split(',\n');
      data.pop();
      return data.map((el) => JSON.parse(el));
    } catch(err) {
      console.log(err);
    }
  } catch {
    console.log('There is no data in the db');
    return [];
  }
}

async function addToDb(userData) {
  try {
    await fs.access('./db.txt');
  } catch {
    try {
      fs.writeFile('./db.txt', '');
    } catch(err) {
      console.log(err);
    }
  } finally { fs.appendFile('./db.txt', JSON.stringify(userData) + ',\n', 'utf8') ;}
}

async function getAge() {
  let { age } = await inquirer.prompt({name: 'age', message: 'Enter your age:'});
  if(Number(age)) return age;
  console.log('Enter a numeric value');
  return getAge();
}