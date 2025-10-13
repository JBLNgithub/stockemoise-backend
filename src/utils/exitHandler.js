const terminatedLog = () => {
    console.log("server terminated")
}


const exitHandler = () => {
    process.on("SIGINT", terminatedLog)
    process.on("exit", terminatedLog)
}


export default exitHandler