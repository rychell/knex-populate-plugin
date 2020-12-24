const getValuesToAnOption = (obj, path) => {
    if (typeof (path) !== 'string') return []
    if (!path || path === '') return []
    if (!obj || !obj.length) return []

    const arrPath = path.split('.')

    let currentLevelData = obj

    for (let i = 0; i < arrPath.length; i++) {
        currentLevelData = currentLevelData.map(data => data[arrPath[i]])
    }
    return currentLevelData
}

const getValueOfObject = (obj, path) => {
    const arrPath = path.split('.')
    for (let i = 0; i < arrPath.length; i++) {
        obj = obj[arrPath[i]];
    }
    return obj
}

const setValueToObject = (obj, path, data, alias) => {
    // TODO: validate arguments
    arrNodes = []
    arrNodes[0] = obj
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
            delete arrNodes[i - 1][path]
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