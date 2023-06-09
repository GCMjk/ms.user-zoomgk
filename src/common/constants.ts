export enum RabbitMQ {
    UserQueue = 'users'
}

export enum UserMSG {
    CREATE = 'CREATE_USER',
    FIND_ALL = 'FIND_USERS',
    FIND_ONE = 'FIND_USER',
    UPDATE = 'UPDATE_USER',
    UPLOAD_AVATAR = 'UPLOAD_AVATAR',
    DELETE = 'DELETE_USER',
    CONFIRMED = 'CONFIRMED',
    VALID_USER = 'VALID_USER',
    ASSIGNED_SUB = 'ASSIGNED_SUB'
}