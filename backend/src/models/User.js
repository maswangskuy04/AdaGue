module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: DataTypes.UUIDV4,
            primaryKey: true
        },
        fullname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            unique: true,
            allowNull: false,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        roles: {
            type: DataTypes.ENUM('admin', 'user'),
            defaultValue: 'user'
        },
        avatar: {
            type: DataTypes.STRING,
            allowNull: true
        },
        presence: {
            type: DataTypes.ENUM('online', 'offline'),
            defaultValue: 'offline'
        },
        isActive: {
            type: DataTypes.ENUM('active', 'suspend'),
            defaultValue: 'active'
        },
        chatStatus: {
            type: DataTypes.ENUM('idle', 'searching', 'matched', 'chatting'),
            defaultValue: 'idle'
        },
        lastSeenAt: {
            type: DataTypes.DATE
        },
        isVerified: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        },
        emailOtp: {
            type: DataTypes.STRING(6)
        },
        emailOtpExpiredAt: {
            type: DataTypes.DATE
        }
    }, {
        paranoid: true,
        timestamps: true
    })

    User.associate = models => {
        User.hasMany(models.Match, { foreignKey: 'userAId' })
        User.hasMany(models.Match, { foreignKey: 'userBId' })
    }

    return User
}