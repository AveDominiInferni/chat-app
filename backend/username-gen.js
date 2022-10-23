const generateUsername = () => {
  return usernames[Math.floor(Math.random() * usernames.length)];
}

const usernames = ["Hugh Mungus", "Joe Biden", "Dritan", "Andrew Tate", "Joe Rogan", "Alex Jones", "Sam Hyde"];
exports.generateUsername = generateUsername;


