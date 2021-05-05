import { index, register, json } from '../controllers'

export default {
    'GET /': index,
    'ALL /register': register,
    'ALL /json': json
}
