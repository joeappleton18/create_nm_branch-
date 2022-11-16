#! /usr/bin/env node
const { execSync } = require("child_process");

const botCommit = () => {
  execSync("git add -A", { stdio: false });
  execSync("git commit -m 'bot commit'", { stdio: false });
};

function init() {
  try {
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .replace("\n", "");
    const nodeModulesBranch = `${currentBranch}_with_node_modules`;

    

  } catch (error) {
    console.error(`could not complete: ${error.toString()}`);
  }
}

init();
