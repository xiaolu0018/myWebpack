let p = new Promise((res) => {
    setTimeout(() => {
        res(233)
    }, 0)
})

let another = p.then(() => {
    let a = 'then 1'
    setTimeout(() => {
        console.log(a)
    }, 0)
}).then(() => {
    console.log('then 2')
})

setTimeout(() => {
    console.log('time')
}, 0)
