module.exports = (roles = []) => {
    return (req, res, next) => {
        if (!roles.length) return next();
        if (!roles.includes(req.user.roles)) {
            return next({ status: 403, message: 'Forbidden' })
        }

        next()
    }
}