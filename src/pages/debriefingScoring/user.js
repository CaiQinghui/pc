import immer from 'immer'
let allData = []

for (let i = 0; i < 200; i++) {
  allData.push({
    "id": i,
    "firstName": "Kristin",
    "lastName": "Marks",
    "position": "Financial Controller",
    "start": `2017-02-17${i}`,
    "time": "10:53",
    "salary": 79886,
    "country": "Burkina Faso",
    "office": "Luanda",
    "office5": "Paris",
    "height": 143.89
  })
}

function pickNumber(max = 65555, min = 0, fixed = 2) {
  if (typeof max === 'string') max = parseInt(max, 10)
  if (typeof min === 'string') min = parseInt(min, 10)

  const num = Math.random() * (max - min) + min
  return parseFloat(num.toFixed(fixed), 0)
}

function pickInteger(...args) {
  return Math.round(pickNumber(...args))
}

export function fetchSync(count = 100, start = 0, sorter = {}, username) {
  const { name, order } = sorter
  let sort
  switch (name) {
    case 'id':
    case 'salary':
      if (order === 'asc') sort = (a, b) => a[name] - b[name]
      else sort = (a, b) => b[name] - a[name]
      break
    default:
      if (name) {
        if (order === 'asc') sort = (a, b) => a[name].localeCompare(b[name])
        else sort = (a, b) => b[name].localeCompare(a[name])
      }
      break
  }

  let data = sort ? immer(allData, draft => draft.sort(sort)) : allData

  if (username) {
    username = username.toLocaleLowerCase()
    data = data.filter(d => `${d.firstName} ${d.lastName}`.toLocaleLowerCase().indexOf(username) >= 0)
  }

  return data.slice(start, start + count)
}

export const fetch = {
  // eslint-disable-next-line
  get(src, { current = 1, pageSize = 100, sorter, username }) {
    const start = (current - 1) * pageSize
    return new Promise(resolve => {
      setTimeout(() => {
        resolve({
          status: 1,
          data: fetchSync(pageSize, start, sorter, username),
          current,
          pageSize,
          total: allData.length,
        })
      }, pickInteger(500, 300))
    })
  },

  post(src, { op, ids }) {
    return new Promise(resolve => {
      switch (op) {
        case 'delete':
          allData = allData.filter(d => ids.indexOf(d.id) < 0)
          break
        case 'on':
        case 'off':
          allData.forEach((d, i) => {
            if (ids.indexOf(d.id) >= 0) {
              allData[i] = { ...d, status: op === 'on' }
            }
          })
          break
        default:
      }
      setTimeout(() => {
        resolve(true)
      }, pickInteger(200))
    })
  },
}