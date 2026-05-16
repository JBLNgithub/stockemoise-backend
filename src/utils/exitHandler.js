const terminatedLog = (code) => {
    console.log("server terminated : ", code)
    process.exit()
}


const exitHandler = () => {
    process.on("SIGINT", terminatedLog)
    process.on("exit", terminatedLog)
}


export default exitHandler