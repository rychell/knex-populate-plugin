const {getValuesToAnOption} = require('../src/helpers')

const data = [{
    ID: 1,
    CustomerID: 1,
    DeliveryMethod: {
        Carrier: {
            GroupID: 700
        },
        ScheduleID: 10,
        Value: 10
    }
}, {
    ID: 1,
    CustomerID: 2,
    DeliveryMethod: {
        Carrier: {
            GroupID: 800
        },
        ScheduleID: 20,
        Value: 10
    }
}, {
    ID: 1,
    CustomerID: 3,
    DeliveryMethod: {
        Carrier: {
            GroupID: 900
        },
        ScheduleID: 30,
        Value: 10
    }
}]

test('getValuesToAnOption - read first level', () => {
    const option = {
        key: 'CustomerID',
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
    expect(getValuesToAnOption(option, data)).toStrictEqual([1,2,3])
})
test('getValuesToAnOption - read second level', () => {
    const option = {
        key: 'DeliveryMethod.ScheduleID',
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
    expect(getValuesToAnOption(option, data)).toStrictEqual([10, 20, 30])
})
test('getValuesToAnOption - read third level', () => {
    const option = {
        key: 'DeliveryMethod.Carrier.GroupID',
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
    expect(getValuesToAnOption(option, data)).toStrictEqual([700,800,900])
})
test('getValuesToAnOption - empty option parameter', () => {
    const option = {}
     expect(getValuesToAnOption(option, data)).toStrictEqual([])
})
test('getValuesToAnOption - missing key in option parameter', () => {
    const option = {
        key: '',
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
     expect(getValuesToAnOption(option, data)).toStrictEqual([])
})
test('getValuesToAnOption - array key in option parameter', () => {
    const option = {
        key: ['DeliveryMethod.Carrier.GroupID', 'CustomerID'],
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
     expect(getValuesToAnOption(option, data)).toStrictEqual([])
})
test('getValuesToAnOption - null data parameter', () => {
    const option = {
        key: ['DeliveryMethod.Carrier.GroupID', 'CustomerID'],
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
     expect(getValuesToAnOption(option, null)).toStrictEqual([])
})
test('getValuesToAnOption - undefined data parameter', () => {
    const option = {
       key: 'DeliveryMethod.Carrier.GroupID',
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
     expect(getValuesToAnOption(option, undefined)).toStrictEqual([])
})
test('getValuesToAnOption - empty data parameter', () => {
    const option = {
       key: 'DeliveryMethod.Carrier.GroupID',
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
     expect(getValuesToAnOption(option, [])).toStrictEqual([])
})
test('getValuesToAnOption - invalid data parameter', () => {
    const option = {
       key: 'DeliveryMethod.Carrier.GroupID',
        searchOnTable: 'Customers',
        searchColumns: ['Name', 'Phone', 'GroupColor'],
        matchingColumn: 'id',
        alias: 'Customer'
    }
     expect(getValuesToAnOption(option, {id:4})).toStrictEqual([])
})

