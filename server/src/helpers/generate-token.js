import jwt from 'jsonwebtoken';;

const generateToken = ({ email, role }) => {
    if(email && role) {
      const token = jwt.sign({ email, role }, process.env.TOKEN_SECRET);
      return token;
    }
    return null;
  }

export default generateToken;