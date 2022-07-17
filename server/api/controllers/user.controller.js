import { User } from "../models/user.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"


const getAllUsers = async (req, res, next) => {

  try {
    const users = await User.find().populate('contacts', 'name');
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { users: users },
    });
  } catch (error) {
    return next(error)
  }
};

//--------------REGISTER USER
const registerUser = async (req, res, next) => {

  try {
    const { body } = req;

    // Comprobar usuario
    const previousUser = await User.findOne({ email: body.email });

    if (previousUser) {
      const error = new Error('The user is already registered!');
      return next(error);
    }

    // Encriptar password
    const pwdHash = await bcrypt.hash(body.password, 10);

    // Crear usuario en DB
    const newUser = new User({
      name: body.name,
      surname: body.surname,
      email: body.email,
      password: pwdHash,
      applied_jobs: []
    });

    const savedUser = await newUser.save();

    return res.status(201).json({
      status: 201,
      message: httpStatusCode[201],
      data: {
        id: savedUser._id
      }
    });

  } catch (error) {
    return next(error);
  }
};

//--------------LOGIN USER 
const loginUser = async (req, res, next) => {

  try {
    const { body } = req;

    // Comprobar email
    const user = await User.findOne({ email: body.email });

    // Comprobar password
    const isValidPassword = await bcrypt.compare(body.password, user?.password ?? '');
    // Control de LOGIN
    if (!user || !isValidPassword) {
      const error = {
        status: 401,
        message: 'The email & password combination is incorrect!'
      };
      return next(error);
    }

    // TOKEN JWT
    const token = jwt.sign(
      {
        id: user._id,
        email: user.email,
        rol: 'ADMIN'
      },
      req.app.get("secretKey"),
      { expiresIn: "3h" }
    );

    // Response
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: {
        user: user._id,
        email: user.email,
        token: token
      },

    });

  } catch (error) {
    return next(error);
  }
};

//logOut
const logoutUser = async (req, res, next) => {

  try {
    req.authority = null;
    return res.json({
      status: 200,
      message: 'logged out',
      token: null
    })
  } catch (error) {
    next(error)
  }

};

const getUserById = async (req, res, next) => {

  try {

    const { id } = req.params;
    console.log(id);

    const userbyid = await Employers.findById(id);
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { user: userbyid },
    });
  } catch (error) {
    return next(error)
  }
};

const editUser = async (req, res, next) => {

  try {
    // const userPhoto = req.file_url;
    const { user_id } = req.params;

    const userPut = new User(req.body);

    userPut._id = user_id;

    await User.findByIdAndUpdate(user_id, userPut)

    return res.status(201).json(userPut);
  } catch (error) {

    next(error);
  }
};

//---------------------------------APPLY TO A JOB

const addNewContact = ('/', async (req, res, next) => {

  const { id: userId} = req.authority;
  const { contactId } = req.body;

  try {

/*      const selectedUser = await User.findById(userId)

   const findContact = selectedUser.contacts.filter(contact => {
      return contact.toString() === contactId.toString()
    })

    if (!findContact) {
      return res.status(200).json('el usuario que tratas de agregar ya está en tu lista');
    } */

    const updatedUser = await User.updateOne(
      { _id: userId },
      { $push: { contacts: contactId } },
      { new: true }
    );

    return res.status(200).json("contact added correctly");

  } catch (error) {
    next(error)
  }
});

export { registerUser, getAllUsers, loginUser, logoutUser, getUserById, editUser, addNewContact };