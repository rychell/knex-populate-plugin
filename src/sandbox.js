
// arrNodes[path.length - 1] = { //arrNodes[3]
//     id: 1,
//     Type: 'Apartament'
// }
// arrNodes[path.length - 1 - 1] = { //arrNodes[2]
//     id: 1,
//     Name: 'Casa',
//     Type: {
//         id: 1,
//         Type: 'Apartamento'
//     }
// }
// arrNodes[path.length - 1 - 2] = { //arrNodes[1]
//     id: 1,
//     Name: 'Rychell',
//     Address: {
//         id: 1,
//         Name: 'Casa',
//         Type: {
//             id: 1,
//             Type: 'Apartamento'
//         }
//     }

// }
// arrNodes[path.length - 1 - 2] = { //arrNodes[0]
//     OrderID: 1,
//     Customer: {
//         id: 1,
//         Name: 'Rychell',
//         Address: {
//             id: 1,
//             Name: 'Casa',
//             Type: {
//                 id: 1,
//                 Type: 'Apartamento'
//             }
//         }
//     }
// }

// arrNodes[path.length - 1] = { //arrNodes[3]
//     id: 1,
//     Type: 'Apartament'
// }
// arrNodes[path.length - 1 - 1][path[path.length-1 - 1]] = arrNodes[path.length - 1]
// arrNodes[path.length - 1 - 2][path[path.length-1 - 2]] = arrNodes[path.length - 1 - 1]
// arrNodes[path.length - 1 - 3][path[path.length-1 - 3]] = arrNodes[path.length - 1 - 2]

// arrRemontado = arrNodes[path.length - 1 - 3]

const objeto = {
    OrderID: 1,
    Customer: {
        id: 1,
        Name: 'Rychell',
        Address: {
            id: 1,
            Name: 'Casa',
            Type: {
                PaymentID: 1,
                Type: 'Apartamento'
            }
        },
        ProfileImgID: 2
    }
}
path = 'Customer.Address.Type.PaymentID'
valueToUptade = {
    id: 1,
    Nam: "https://ja é"
}
alias = "Lula ladrão"

arrNodes = []
arrNodes[0] = objeto
arrPath = path.split('.')

for (let i = 0; i < arrPath.length; i++) {
    const node = arrNodes[i][arrPath[i]];
    if(i+1 === arrPath.length){
        arrNodes[i+1] =  valueToUptade
    }
    else{
        arrNodes[i+1] = node
    }
}
for (let i = arrPath.length; i > 0; i--) {
    const path = arrPath[i-1];
    if(alias && i == arrPath.length){
        arrNodes[i-1][alias]=arrNodes[i]    
        delete arrNodes[i-1][path]
        break
    }
    arrNodes[i-1][path]=arrNodes[i]
}
return arrNodes[0]
