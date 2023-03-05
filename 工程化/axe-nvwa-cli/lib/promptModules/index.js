const getPrompModules = () => {
  return ['babel', 'eslint', 'typescript', 'router'].map((file) => require(`./${file}.js`))
}

module.exports = {
  getPrompModules
}