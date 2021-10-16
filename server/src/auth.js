const jwt = require('jsonwebtoken');
const User = require('./resource/user/user.model');

const secrets = process.env.JWT_SECRETS || 'jwt123';

function getToken(bearer) {
  if (!bearer || !bearer.startsWith('Bearer ')) return null;
  const token = bearer.split('Bearer ')[1].trim();
  return token;
}

function newToken(user) {
  return jwt.sign({ id: user.id }, secrets);
}

function verifyToken(token) {
  return new Promise((resolve, reject) => {
    jwt.verify(token, secrets, (err, decoded) => {
      if (err) return reject(err);
      return resolve(decoded);
    });
  });
}

async function register(req, res) {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).send('缺少用户名或密码');
  }

  let user;
  try {
    user = await User.findOne({ username });
    console.log(user);
    if (user) {
      return res.status(400).send('用户名已存在');
    }

    user = await User.create({ username, password });
    const token = newToken(user);
    user.token = token;
    await user.save();
    return res.status(201).json({
      id: user.id,
      token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).send();
  }
}

async function login(req, res) {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).send('用户名不存在');
    }
    const result = user.checkPassword(password);
    if (!result) {
      return res.status(400).send('密码错误');
    }

    if (!user.token) {
      user.token = newToken(user);
    }
    await user.save();
    return res.status(200).json({
      id: user.id,
      token: user.token,
      username: user.username,
    });
  } catch (error) {
    res.status(500).send();
  }
}

async function logout(req, res) {
  const token = getToken(req.headers.authorization);
  if (!token) {
    return res.status(401).send();
  }

  let payload;
  let user;

  try {
    payload = await verifyToken(token);
    user = await User.findOne({
      _id: payload.id,
      token,
    }).select('-password');

    if (!user) {
      return res.status(401).send();
    }

    user.token = null;
    await user.save();
    res.status(200).json({
      message: 'ok',
    });
  } catch (error) {
    return res.status(500).json({
      message: error.message,
    });
  }
}

async function protect(req, res, next) {
  const token = getToken(req.headers.authorization);
  if (!token) {
    return res.status(401).send();
  }
  let payload;
  let user;

  try {
    payload = await verifyToken(token);
    user = await User.findOne({
      _id: payload.id,
      token,
    }).select('-password');
  } catch (error) {
    return res.status(500).send();
  }

  if (!user || !payload) {
    return res.status(401).send();
  }

  req.user = user;
  next();
}

module.exports = {
  register,
  login,
  logout,
  protect,
};
