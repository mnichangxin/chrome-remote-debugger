import { index, register, json, serverInfo } from '../controllers'

export default {
    'GET /': index,
    'ALL /register': register,
    'ALL /json': json,
    'ALL /serverInfo': serverInfo
}
