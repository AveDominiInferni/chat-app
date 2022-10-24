const generateUsername = () => {
  return usernames[Math.floor(Math.random() * usernames.length)];
}

const usernames = ["Saeya", "Silvyr", "Azariah", "Tanulia", "Daealla", "Jayldrog", "Orym", "Quamara", "Usunaar", "Vaegon", "Neldor", "Tanulia", "Silver", "Star", "Mysris", "Mireille", "Dray", "Erthel", "Rennyn", "Wilda", "Galdor", "Akkar", "Horar", "Nalra", "Gold Horn", "Aquarus", "Anya", "Mysris", "Morthil", "Jinvia", "Ragriel", "Tendris", "Pindious", "Zarek", "Zapptos", "Twinkle", "Taena"];
exports.generateUsername = generateUsername;


