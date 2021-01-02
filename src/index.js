const {
  getValuesToAnOption,
  getValueOfObject,
  setValueToObject
} = require('./helpers')

const _ = require('lodash')
const KnexPopulatePlugin = function (knexInstance) {
  this.knex = knexInstance
  this.dataToPopulate = []
  this.populatedData = []
  this.verbose = false
}

KnexPopulatePlugin.prototype.loadData = function (dataToPopulate) {
  this.dataToPopulate = dataToPopulate
  return this
}
KnexPopulatePlugin.prototype.verbose = function (verbose) {
  this.verbose = verbose
  return this
}
KnexPopulatePlugin.prototype.populate = function (options) {
  this.options = options
  return this
}
KnexPopulatePlugin.prototype.exec = async function () {
  let dataToPopulate = this.dataToPopulate
  const verbose = this.verbose
  // const options = this.options
  const knex = this.knex
  const dataset = {}
  const populatedData = this.populatedData

  // TODO: Here validate all stuff necessary and put propper error messages

  // First step - Mount queries to search data on db based on options array
  const max_depth = Math.max(...this.options.map(option => option.key.split('.').length))
  for (let k = 0; k < max_depth; k++) {
    const options = this.options.filter(option => option.key.split('.').length - 1 === k)
    for (let i = 0; i < options.length; i++) {
      const option = options[i];
      const filters = option.filters || {}
      const path = option.key
      const uniqueKey = `${option.alias || ''}${option.key}`
      const arrOptionValues = getValuesToAnOption(dataToPopulate, path)
      const uniqueOptionValues = [...new Set(arrOptionValues)]
      if (uniqueOptionValues
         && uniqueOptionValues.some(option => option)
         && uniqueOptionValues.length) {
        const query = knex(option.searchOnTable).select(option.searchColumns || '*').whereIn(option.matchingColumn || 'id', uniqueOptionValues).where(filters)
        dataset[uniqueKey] = await query
        if (verbose) console.log(await query.toSQL().toNative());
        if (option.onFind) {
          dataset[uniqueKey] = option.onFind(dataset[uniqueKey])
        }
      }
      else{
        dataset[uniqueKey] = undefined
      }
    }

    for (let i = 0; i < dataToPopulate.length; i++) {
      for (let j = 0; j < options.length; j++) {
        let resultadoParaPopular = []
        const option = options[j];
        const path = option.key
        const {
          alias,
          multiple,
          keepOriginalKey
        } = option
        const uniqueKey = `${option.alias || ''}${option.key}`

        const currentValueOnKey = getValueOfObject(dataToPopulate[i], path)
        const searchMethod = multiple ? 'filter' : 'find'
        
        if(dataset[uniqueKey]) {
          if (Array.isArray(currentValueOnKey)) {
            for (let index = 0; index < currentValueOnKey.length; index++) {
              const valueOnKey = currentValueOnKey[index];
              let arrPath = path.split('.')
              pathLength = arrPath.length
              arrPath[pathLength] = arrPath[pathLength - 1]
              arrPath[pathLength - 1] = index
              resultadoParaPopular = dataset[uniqueKey][searchMethod](data => data[option.matchingColumn || 'id'] === valueOnKey)
              populatedData[i] = setValueToObject(dataToPopulate[i], arrPath.join('.'), resultadoParaPopular, alias, keepOriginalKey)
              dataToPopulate[i] = _.cloneDeep(populatedData[i])
            }
          } else {
            resultadoParaPopular = dataset[uniqueKey][searchMethod](data => data[option.matchingColumn || 'id'] === currentValueOnKey)
            populatedData[i] = setValueToObject(dataToPopulate[i], path, resultadoParaPopular, alias, keepOriginalKey)
          }
          dataToPopulate[i] = _.cloneDeep(populatedData[i])
        }
      }
    }
    dataToPopulate = _.cloneDeep(populatedData)
  }
  this.dataToPopulate = []
  this.populatedData = []
  return populatedData
}

module.exports = KnexPopulatePlugin