const KnexPopulatePlugin = function (knexInstance) {
  this.knex = knexInstance
  this.dataToPopulate = []
}

KnexPopulatePlugin.prototype.loadData = function (dataToPopulate) {
  this.dataToPopulate = typeof (dataToPopulate) != 'array' ? [dataToPopulate] || [] : dataToPopulate
  return this
}
KnexPopulatePlugin.prototype.populate = function (options) {
  this.options = typeof (options) != 'array' ? [options] || [] : options
  return this
}

KnexPopulatePlugin.prototype.exec = function () {
  const dataToPopulate = this.dataToPopulate
  const options = this.options
  const knex = this.knex
  const dataset = {}
  // TODO: Here validate all stuff necessary and put propper error messages
  if (typeof (dataToPopulate) !== 'array') throw new Error(`dataToPopulate isn't a valid`)
  if (typeof (options) !== 'array') throw new Error(`options isn't a valid`)
  if (typeof (knex) !== 'function') throw new Error(`knex isn't a valid`)

  // First step - Mount queries to search data on db based on options array
  for (let i = 0; i < options.length; i++) {
    const option = options[i];
    const arrOptionValues = getValuesToAnOption(option, dataToPopulate)
    const uniqueOptionValues = [...new Set(arrOptionValues)]
    dataset[option.key] = await knex(option.searchOnTable).select(option.searchColumns || '*').whereIn(option.matchingColumn || 'id', uniqueOptionValues)
  }

}




