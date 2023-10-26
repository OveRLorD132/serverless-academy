let fs = require('fs/promises');

getNames().then(async (namesObj) => {
  let time = performance.now();
  console.log('Unique values in all files: ' + returnUniqueValues(namesObj));
  console.log('Function runtime: ' + (performance.now() - time))
  time = performance.now();
  console.log('Exist in all files: ' + existInAllFiles(namesObj));
  console.log('Function runtime: ' + (performance.now() - time))
  time = performance.now();
  console.log('Exist in at least 10 files: ' + existInTenFiles(namesObj));
  console.log('Function runtime: ' + (performance.now() - time))
})

async function getNames() {
  let names = [];
  let allFilesNames = [];
  for(let i = 0; i < 20; i++) {
    let usersData = await fs.readFile(`./words/out${i}.txt`, 'utf-8')
    usersData = usersData.split('\n');
    allFilesNames = allFilesNames.concat(usersData);
    names.push(new Set((usersData)));
  }
  allFilesNames = Array.from((new Set(allFilesNames)));
  return {
    allFilesNames,
    names
  }
}

function returnUniqueValues(obj) {
  return obj.allFilesNames.length;
}

function existInAllFiles(obj) {
  let count = 0;
  obj.names[0].forEach((elem) => {
    for(let i = 1; i < 20; i++) {
      if(!obj.names[i].has(elem)) break;
      if(i === 19) count++;
    }
  })
  return count;
}

function existInTenFiles(obj) {
  let count = 0;
  obj.allFilesNames.forEach((elem) => {
    let arraysCount = 0;
    for(let i = 0; i < 20; i++) {
      if(obj.names[i].has(elem)) arraysCount++;
      if(arraysCount === 10) {count++; arraysCount = 0; break;}
    }
  })
  return count;
}
