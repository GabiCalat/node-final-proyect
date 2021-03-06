import { User } from "../models/user.model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"


const getAllUsers = async (req, res, next) => {

  try {
    const users = await User.find().populate('contacts', 'name');
    return res.status(200).json(users);
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

//----------------######LOGOUT
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

//----------------------GET USER BY ID
const getUserById = async (req, res, next) => {


  const { id } = req.params;
  try {

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

//-------------------------EDIT USER
const editUser = async (req, res, next) => {

  const userPhoto = req.file_url;// me traigo la url de la foto
  const bodyData = req.body;
  //revisamos si nos llega una imagen por el body
  if (userPhoto) { bodyData.image = userPhoto }
  const { id: userId } = req.authority;

  try {
    // creamos el objeto con los campos que vamos a modificar
    const userModify = new User(bodyData);
    //Para evitar que se modifique el id de mongo:
    userModify._id = userId;
    //buscamos por el id y le pasamos los campos a modificar
    await User.findByIdAndUpdate(userId, userModify);

    //retornamos respuesta de  los datos del objeto creado 
    return res.json({
      status: 200,
      message: httpStatusCode[200],
      data: { user: userModify },
    });
  } catch (error) {
    return next(error);
  }
};

//----------------------------ADD A NEW CONTACT

const addNewContact = ('/', async (req, res, next) => {

  const { id: userId } = req.authority;
  const { contactId } = req.body;

  try {

    const user = await User.findById(userId).select({ contacts: 1, _id: 0 })

    if (user.contacts.indexOf(contactId) === 0) {
      const error = new Error('the user you are trying to add is already in your contacts list');
      return next(error);
    }

    await User.updateOne(
      { _id: userId },
      { $push: { contacts: contactId } },
      { new: true }
    );

    return res.status(200).json(`the contact ${contactId} was added correctly`);

  } catch (error) {
    next(error)
  }
});

export { registerUser, getAllUsers, loginUser, logoutUser, getUserById, editUser, addNewContact };