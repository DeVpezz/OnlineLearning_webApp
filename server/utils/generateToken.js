import jwt from "jsonwebtoken";

export const generateToken = (res, user, message) => {
  const token = jwt.sign({ id: user._id }, process.env.SECERT_KEY, {
    expiresIn: "1h",
  })
  return res.status(200)
  .cookie("token", token, {
    httpOnly: true,
    sameSite: "strict",
    maxAge: 24 * 60 * 60 * 1000,
  }).json({
    success:true,
    message,
    user
  })
  
};
