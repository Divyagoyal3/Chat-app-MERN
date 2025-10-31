import jwt from "jsonwebtoken";


export const generateToken =(userId, res) => {
  const token = jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

 res.cookie("jwt", token, {
  maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
  httpOnly: true,
  sameSite: "none", // allow cross-site cookies
  secure: true,     // cookies only sent over HTTPS (Render is HTTPS)
});


  return token;
}