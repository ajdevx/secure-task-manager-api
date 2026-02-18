import { nanoid } from 'nanoid'
import { customAlphabet } from 'nanoid'


export const generateOtp = async()=>{
    const nanoid = customAlphabet('1234567890', 6)
    return nanoid();

}
