#! /usr/bin/env node
import { execSync } from "child_process";
import chalk from "chalk";
const log = console.log;

const botCommit = () => {
  execSync("git add -A", { stdio: false });
  execSync("git commit -m 'bot commit'", { stdio: false });
};

function init() {
  try {
    log(chalk.blue("Starting process"));
    const currentBranch = execSync("git rev-parse --abbrev-ref HEAD")
      .toString()
      .replace("\n", "");
    const nodeModulesBranch = `${currentBranch}_with_node_modules`;
    if (
      !execSync("git status")
        .toString()
        .match(/nothing to commit/)
    ) {
      botCommit();
    }

    execSync(`git checkout -b ${nodeModulesBranch}`, { stdio: false });
    log(chalk.blue("committing node_modules, this may take a few seconds"));
    execSync(`git add -f node_modules`);
    botCommit();
    log(chalk.blue("pushing to the origin: hope your internet is fast"));
    execSync(`git push origin master --force`);
    execSync(`git checkout ${currentBranch}`);
    execSync(`git branch -D ${nodeModulesBranch}`);
    log(chalk.blue("done"));
  } catch (error) {
    console.error(`could not complete: ${error.toString()}`);
  }
}

init();
