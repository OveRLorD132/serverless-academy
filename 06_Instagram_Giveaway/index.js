let fs = require('fs/promises');

let time = performance.now();

getNames().then(async (namesObj) => {
  console.log('Unique values in all files: ' + returnUniqueValues(namesObj));
  console.log('Exist in all files: ' + existInAllFiles(namesObj));
  console.log('Exist in at least 10 files: ' + existInTenFiles(namesObj));
  console.log('Functions runtime: ' + (performance.now() - time))
})

async function getNames() {
  let names = [];
  for(let i = 0; i < 20; i++) {
    names[i] = fs.readFile(`./words/out${i}.txt`, 'utf-8');
  }
  names = await Promise.all(names);
  names = names.map((elem) => new Set(elem.split('\n')));
  let allFilesNames = [];
  names.forEach((arr) => {
    allFilesNames = allFilesNames.concat(Array.from(arr));
  })
  allFilesNames = new Set(allFilesNames);
  return {
    allFilesNames,
    names
  }
}

function returnUniqueValues(obj) {
  return obj.allFilesNames.size;
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
