const bcrypt = require("bcryptjs");

(async function x() {
  const password = "0";
  bcrypt.hash(password, 10).then((p) => {
    console.log(p);
  });
})();
