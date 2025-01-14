import bcrypt from "bcrypt"

const hashpass = (password)=>{
    return bcrypt.hash(password, 10);
}

export default hashpass;