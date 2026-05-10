const MatchService = require("../services/matchService")

module.exports = {
    getAllMatches: async (req, res, next) => {
        try {
            const result = await MatchService.getAllMatches(req.query)

            res.status(200).json({
                success: true,
                data: result
            })
        } catch (err) {
            next(err)
        }
    }
}