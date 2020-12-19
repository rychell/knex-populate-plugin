const getValuesToAnOption = (option, data) => {
    // TODO: validate arguments
    if (typeof(option.key) !== 'string') return []
    if (!option.key || option.key === '') return []
    if (!data || !data.length) return []
    
    const accessTree = option.key.split('.')
    
    let currentLevelData = data
    
    for (let i = 0; i < accessTree.length; i++) {
        currentLevelData = currentLevelData.map(data => data[accessTree[i]])
    }
    return currentLevelData
}

module.exports = {
    getValuesToAnOption
}