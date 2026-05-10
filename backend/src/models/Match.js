module.exports = (sequelize, DataTypes) => {
    const Match = sequelize.define('Match', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        status: {
            type: DataTypes.ENUM('active', 'ended'),
            defaultValue: 'active'
        },
        startedAt: {
            type: DataTypes.DATE,
            defaultValue: DataTypes.NOW
        },
        endedAt: {
            type: DataTypes.DATE
        }
    }, {
        paranoid: true,
        timestamps: true,
        indexes: [
            { fields: ['userAId'] },
            { fields: ['userBId'] },
            { fields: ['status'] }
        ]
    })

    Match.associate = models => {
        Match.belongsTo(models.User, { as: 'userA', foreignKey: 'userAId' })
        Match.belongsTo(models.User, { as: 'userB', foreignKey: 'userBId' })
        Match.hasOne(models.Conversation, { as: 'conversation', foreignKey: 'matchId' })
    }

    return Match
}