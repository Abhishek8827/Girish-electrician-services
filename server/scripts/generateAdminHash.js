const bcrypt = require("bcryptjs");
const readline = require("readline");

const prompt = readline.createInterface({ input: process.stdin, output: process.stdout, terminal: true });
prompt.stdoutMuted = true;
prompt._writeToOutput = (text) => prompt.output.write(prompt.stdoutMuted ? "*" : text);

prompt.question("Choose an admin password: ", async (password) => {
  prompt.stdoutMuted = false;
  prompt.output.write("\n");

  if (password.length < 12) {
    console.error("Use an admin password with at least 12 characters.");
    prompt.close();
    process.exitCode = 1;
    return;
  }

  const hash = await bcrypt.hash(password, 12);
  console.log("Copy this value into ADMIN_PASSWORD_HASH in server/.env:");
  console.log(hash);
  prompt.close();
});
