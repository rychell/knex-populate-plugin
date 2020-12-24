const {
  getValuesToAnOption,
  getValueOfObject,
  setValueToObject
} = require('./helpers')
const KnexPopulatePlugin = function (knexInstance) {
  this.knex = knexInstance
  this.dataToPopulate = []
  this.populatedData = []
}

KnexPopulatePlugin.prototype.loadData = function (dataToPopulate) {
  this.dataToPopulate = typeof (dataToPopulate) != 'object' ? [dataToPopulate] || [] : dataToPopulate
  return this
}
KnexPopulatePlugin.prototype.populate = function (options) {
  this.options = options
  return this
}

KnexPopulatePlugin.prototype.exec = async function () {
  const dataToPopulate = this.dataToPopulate
  const options = this.options
  const knex = this.knex
  const dataset = {}
  const populatedData = this.populatedData
  // TODO: Here validate all stuff necessary and put propper error messages

  // First step - Mount queries to search data on db based on options array
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const arrOptionValues = getValuesToAnOption(dataToPopulate, option.key)
    const uniqueOptionValues = [...new Set(arrOptionValues)]
    if (uniqueOptionValues.length)
      dataset[option.key] = await knex(option.searchOnTable).select(option.searchColumns || '*').whereIn(option.matchingColumn || 'id', uniqueOptionValues)
  }
  for (let i = 0; i < dataToPopulate.length; i++) {
    for (let j = 0; j < options.length; j++) {
      const option = options[j];
      const path = option.key
      const alias = option.alias
      const currentValueOnKey = getValueOfObject(dataToPopulate[i], option.key)
      // The next line only works for paths with 1 level depth only. 
      // Still need to create a function to generalize this behavior
      const resultadoParaPopular = dataset[path].find(data => data[option.matchingColumn || 'id'] === currentValueOnKey)
      populatedData[i] = setValueToObject(dataToPopulate[i], path, resultadoParaPopular, alias)
    }
  }
  return populatedData
}

module.exports = KnexPopulatePlugin