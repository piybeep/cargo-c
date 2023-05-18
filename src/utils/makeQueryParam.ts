export const makeQueryParam = (obj: any) => {
  let query = ''
  for (const key in obj) {
    if ((obj[key] && obj[key] !== '')||key==='page') {
      query += key + '=' + obj[key] + '&'
    }
  }
  return query
}
