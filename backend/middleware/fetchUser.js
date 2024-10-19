const jwt = require('jsonwebtoken');
const JWT_SECRET = "123qwuijwrfdsqu283rhiqw4hro82@#0023924_dev_resume";

const fetchUser = (req, res, next) => {
  // Get the token from the header
  const token = req.header('authToken');
  
  // Check if token is missing
  if (!token) {
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }

  try {
    // Verify the token and extract user data
    const data = jwt.verify(token, JWT_SECRET);
    req.user = data.user;
    next(); // Proceed to the next middleware or route
  } catch (error) {
    // Send error response if token verification fails
    return res.status(401).json({ error: "Please authenticate using a valid token" });
  }
};

module.exports = fetchUser;
