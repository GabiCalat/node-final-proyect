import { User } from "../models/User.Model.js";
import bcrypt from 'bcrypt';
import jwt from "jsonwebtoken";
import { httpStatusCode } from "../../utils/seeds/httpStatusCode.js"


const getAllUsers = async (req, res, next) => {

  try {
    const users = await User.find();
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
    });
    const savedUser = await newUser.save();

    // Respuesta
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
      { expiresIn: "1h" }
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
      return res.status(200).json(userbyid);
          return res.json({
            //  status : 200,
            //  message : httpStatusCode[200],
             data : { user: userbyid },
          });
          res.send(userbyid);
      } catch (error) {
          return next(error)
      }
};

const editUser = async ( req, res, next) => {

  try {
      const userPhoto = req.file_url;
      //const result=req.params;
      const { user_id} = req.params;
      //console.log(user_id);
      
      const userPut = new User(
          
        //
          


          req.body
          // name: req.body.name,
          // surname: req.body.surname,
          // email: req.body.email,
          // password: req.body.password,
          // education: req.body.education,
          // age: req.body.age,
          // description: req.body.description,
          // habilities: req.body.habilities,
          

          // email: req.body.email,
          // image: userPhoto
      );
      console.log(userPut);
       //userPut._id = user_id;
      await User.findByIdAndUpdate(user_id, userPut)
     
      // const createdUser = await userPut.save();
      return res.status(201).json(userPut);
  } catch (error) {
      
      next(error);
  }
};








export { registerUser, getAllUsers, loginUser, logoutUser, getUserById, editUser };