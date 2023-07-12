/**
 * Use this middleware to guard http get, post, put, delete requests from unauthorized access.
 */
function checkAuth(req, res, next) {
  console.log('req.user = ', req.user);
  if (req.user) {
    return next();
  } else {
    return res.status(401).json({ msg: "Unauthorized Access", code: 401 });
  }
}

module.exports = checkAuth;
