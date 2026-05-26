const datetimeFormat = (datetime) => {
    
    // remove the z letter from postgresql format
    if(typeof(datetime) === 'object') {
        const formatedDatetime = (JSON.stringify(datetime)).slice(1, -2)
        return formatedDatetime
    }

    return datetime
}


export default datetimeFormat