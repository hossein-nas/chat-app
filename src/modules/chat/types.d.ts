
export interface IMessage {
    _id?: string
    receiver: string,
    sender: string,
    message: string,
    // eslint-disable-next-line camelcase
    created_at: string,
    read: boolean
}
