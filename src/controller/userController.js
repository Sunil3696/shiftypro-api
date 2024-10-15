const User = require("../models/userModel");


/**
 * Desc: Register function
 *Parameter:
 *   req : email and passoword and username (Uniuqe)
 *   res : Check existence of user in db and register if user is new and credtials are ok
 */
const registerUser = async (req, res) => {
    const { email, password , username} = req.body;

    if(!email || !password || !username){
        res.status(400).json({ message: 'All fields are required' });
        return 
    }


    const existingUser = await User.findOne({ email });
    if (existingUser) {
         res.status(400).json({ message: 'Email already in use' });
         return
    }

    const user = new User({ email, password , username});
    try {
        await user.save();
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occured');
    }
}

/**
 * Desc: Login function
 *Parameter:
 *   req : email and passoword from user
 *   res : if credential matches user id and success messagw will be returned and if not error message
 */
const loginUser = async (req, res) => {
    const { email, password } = req.body;
    try {
    if(!email || !password) {
        res.status(401).json({ message: 'All fields are required' });
        return
    }

    const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const isPasswordValid = await user.isValidPassword(password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }
        req.session.userId = user._id; 
        res.status(200).json({ message: 'Login successful', userId: user._id });
    } catch (error) {
        console.error(error);
        res.status(500).send('Error occured');
    }
};

/**
 * Desc: Logout function
 *Parameter:
 *   res : Destroy the session and logout message sent
 */
const logoutUser = (req, res) => {
    req.session.destroy(err => {
        if (err) {
            return res.status(500).json({ message: 'Error logging out user' });
        }
        res.status(200).json({ message: 'Logout successful' });
    });
};





module.exports = {registerUser, loginUser,logoutUser}