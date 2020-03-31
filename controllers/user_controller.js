const User = require("../models/User");


async function getUserProfileStuff(user, currentUser = false) {
  const { EmailAddress, FirstName, LastName, Suburb, Age  } = user;
  
  return {
    _id: User._id,
    EmailAddress,
    FirstName,
    LastName,
    Suburb,
    Age
  }
};

async function getCurrentUser(req, res) {

  // get currently logged-in user's data
  const userDisplayData = await getUserProfileStuff(req.body, true);
  if (userDisplayData) {
    res.json({ ...userDisplayData, success: req.success });
  }
  else {
    res.send();
  }
};


module.exports = { getCurrentUser };