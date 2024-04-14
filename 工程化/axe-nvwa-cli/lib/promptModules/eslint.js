module.exports = pmInstance => {
  pmInstance.injectFeature({
    name: 'ESLint',
    value: 'eslint',
    description: 'ESLint statically analyzes your code to quickly find problems. It is built into most text editors and you can run ESLint as part of your continuous integration pipeline.',
    link: 'https://eslint.org/',
    checked: true
  })
}