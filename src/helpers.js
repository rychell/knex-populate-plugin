const _ = require('lodash')
const getValuesToAnOption = (obj, path) => {
    if (typeof (path) !== 'string') return []
    if (!path || path === '') return []
    if (!obj || !obj.length) return []

    const arrPath = path.split('.')

    let currentLevelData = obj
    for (let i = 0; i < arrPath.length; i++) {
        currentLevelData = currentLevelData.flatMap(data => {
            if (Array.isArray(data)){
                return data.map(d=>_.get(d, arrPath[i]))
            }
            else{
                return _.get(data, arrPath[i])
            }
        })
    }
    return currentLevelData
}

const getValueOfObject = (obj, path) => {

    const arrPath = path.split('.')
    for (let i = 0; i < arrPath.length; i++) {
        if (Array.isArray(obj)){
            obj = obj.map(data => _.get(data, arrPath[i]))
        }
        else{
            obj = _.get(obj, arrPath[i]);
        }
    }
    return obj
}

const setValueToObject = (obj, path, data, alias, keepOriginalKey = false) => {
    // TODO: validate arguments
    arrNodes = []
    arrNodes[0] = _.cloneDeep(obj)
    arrPath = path.split('.')
    
    for (let i = 0; i < arrPath.length; i++) {
        const node = arrNodes[i][arrPath[i]];
        if (i + 1 === arrPath.length) {
            arrNodes[i + 1] = data
        } else {
            arrNodes[i + 1] = node
        }
    }
    for (let i = arrPath.length; i > 0; i--) {
        const path = arrPath[i - 1];
        if (alias && i == arrPath.length) {
            arrNodes[i - 1][alias] = arrNodes[i]
            if(!keepOriginalKey){delete arrNodes[i - 1][path]
            }    
            break
        }
        arrNodes[i - 1][path] = arrNodes[i]
    }
    return arrNodes[0]

}

module.exports = {
    getValuesToAnOption,
    getValueOfObject,
    setValueToObject
}