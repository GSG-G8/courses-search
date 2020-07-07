const { OAuth2Client } = require('google-auth-library');
const { sign } = require('jsonwebtoken');
const { addUserData } = require('../../database/queries');

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

module.exports = async (req, res, next) => {
  try {
    const { tokenId } = req.body;
    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    const { rows } = await addUserData(payload);

    const { id, name, email, picture } = rows[0];
    const token = sign({ id, name, email, picture }, process.env.SECRET_KEY);
    res.cookie('token', token).json({ name, email });
  } catch (err) {
    next(err);
  }
};
