import usersData from './input/data.json' assert { type: 'json' };

import User from './User.js';

import fs from 'fs/promises';

let sortedData = changeJson(usersData);

fs.writeFile('./output/data.json', JSON.stringify(sortedData), 'utf-8').then(() => {
  console.log('done');
})

function changeJson(data) {
  let idsArr = [];
  let sortedData = [];
  for(let obj of data) { 
    if(idsArr.indexOf(obj.user._id) !== -1) {
      let userObj = sortedData.find((elem) => elem.userId === obj.user._id);
      userObj.addVacation(obj);
    }
    else if(!sortedData.some((elem) => elem._id === obj._id)) {
      sortedData.push(new User(obj));
      idsArr.push(obj.user._id);
    } 
  }
  return sortedData;
}
