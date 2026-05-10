module.exports = (sequelize, DataTypes) => {
    const Message = sequelize.define('Message', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        content: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        isRead: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        senderId: {
            type: DataTypes.UUID,
            allowNull: false
        },
        conversationId: {
            type: DataTypes.UUID,
            allowNull: false
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    Message.associate = models => {
        Message.belongsTo(models.Conversation, { foreignKey: 'conversationId', as: 'conversation', onDelete: 'CASCADE' })
        Message.belongsTo(models.User, { foreignKey: 'senderId', as: 'sender', onDelete: 'CASCADE' })
    }

    return Message
}