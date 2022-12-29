const importFi = {
  importFiles : () => {
    const r = require.context('./assets/team-icons', true)
    return r
  }
}
export {importFi};