module.exports = (sequelize, DataTypes) => {
    const Conversation = sequelize.define('Conversation', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    Conversation.associate = models => {
        Conversation.belongsTo(models.Match, { as: 'match', foreignKey: 'matchId' })
        Conversation.hasMany(models.Message, { foreignKey: 'conversationId', as: 'messages' })
    }

    return Conversation
}