let axios = require('axios');

let links = ['https://jsonbase.com/sls-team/json-793',
'https://jsonbase.com/sls-team/json-955',
'https://jsonbase.com/sls-team/json-231',
'https://jsonbase.com/sls-team/json-931',
'https://jsonbase.com/sls-team/json-93',
'https://jsonbase.com/sls-team/json-342',
'https://jsonbase.com/sls-team/json-770',
'https://jsonbase.com/sls-team/json-491',
'https://jsonbase.com/sls-team/json-281',
'https://jsonbase.com/sls-team/json-718',
'https://jsonbase.com/sls-team/json-310',
'https://jsonbase.com/sls-team/json-806',
'https://jsonbase.com/sls-team/json-469',
'https://jsonbase.com/sls-team/json-258',
'https://jsonbase.com/sls-team/json-516',
'https://jsonbase.com/sls-team/json-79',
'https://jsonbase.com/sls-team/json-706',
'https://jsonbase.com/sls-team/json-521',
'https://jsonbase.com/sls-team/json-350',
'https://jsonbase.com/sls-team/json-64',]

let sortingTestArray = [
  {
    data: [
      {
        MainId: 1111,
        firstName: "Sherlock",
        lastName: "Homes",
        categories: [
          {
            CategoryID: 1,
            CategoryName: "Example",
          },
        ],
      },
      {
        MainId: 122,
        firstName: "James",
        lastName: "Watson",
        categories: [
          {
            CategoryID: 2,
            CategoryName: "Example2",
            isDone: false,
          },
        ],
      },
    ],
    messages: [],
    success: true,
  },
  {
    hihi: true,
    obj1: {
      obj2: {
        hihi: "kjhskjdhfkjdh",
        obj3: {
          obj: 897897,
        },
        obj5: {
          cons: true,
          obj8: {
            isDone: false,
          },
        },
      },
    },
  },
  {
    id: "1",
    type: "icecream",
    name: "Vanilla Cone",
    image: {
      url: "img/01.png",
      width: 200,
      height: 200,
    },
    thumbnail: {
      url: "images/thumbnails/01.png",
      width: 32,
      height: 32,
      isDone: true,
    },
  },
  {
    coffee: {
      region: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Don Joeh" },
      ],
      country: { id: 2, company: "ACME" },
    },
    brewing: {
      region: [
        { id: 1, name: "John Doe" },
        { id: 2, name: "Don Joeh" },
      ],
      country: { id: 2, company: "ACME", isDone: false },
    },
  },
];

JSONSort(links);

async function JSONSort(jsonLinks) {
  for(let link of jsonLinks) {
    try {
      let obj = await getJSON(link, 1);
      console.log(`[Success] ${link}: isDone - ${objectSearch(obj.data)}`);
    } catch(err) {
      console.log(`[Fail] ${link}: The endpoint is unavailable`);
    }
  }
  console.log('\n');
  console.log('Function testing using local JSON\'s:\n');
  sortingTestArray.forEach((object, index) => {
    console.log(`${index + 1}: isDone - ${objectSearch(object)}`);
  }) 
}

async function getJSON(link, requestNum) {
  try {
    let response = await axios.get(link);
    return response;
  } catch {
    if(requestNum >= 3) return undefined; 
    return await getJSON(link, requestNum + 1);
  }
}

function objectSearch(obj) {
  for(let key in obj) {
    if(key === 'isDone') return obj.isDone;
    if(typeof obj[key] === 'object') {
      let result = objectSearch(obj[key]);
      if(typeof result === 'boolean') return result;
    }
  }
  return undefined;
}