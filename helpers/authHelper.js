import bcrypt from 'bcrypt';


// Hashing The Password OF USER

export const hashPassword = async(password) => {
        try {
            const saltRounds = 10;
            const hashedPassword = await bcrypt.hash(password,saltRounds);
        return hashedPassword;        
        }catch (error) {
            console.log(error)
        }
}




// Comparing The PAssword of User to Decrypt Password

export const comparePassword = async(password,hashedPassword) => {

    return bcrypt.compare(password, hashedPassword);



}

