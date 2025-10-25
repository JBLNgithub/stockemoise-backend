import LEVELS from '../utils/LEVELS.js'


export const mustBeOperator = (req, res, next) => {
    const level = req.session.level

    if(level <= LEVELS.operator) {
        next()
    }
    else {
        res.sendStatus(403)     // status code 403 for no rights
    }
}

export const mustBeAdmin = (req, res, next) => {}