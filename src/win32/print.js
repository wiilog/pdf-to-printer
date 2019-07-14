"use strict";

const path = require("path");
const fs = require("fs");
const execAsync = require("../execAsync");

const getCommand = (pdf, options) => {
  const ptp = path.join(__dirname, "PDFtoPrinter.exe");
  let command = `${ptp} ${pdf}`;
  if (options.printer) {
    command += ` "${options.printer}"`;
  }
  return command;
};

const print = (pdf, options = {}) => {
  if (!pdf) throw "No PDF specified";
  if (typeof pdf !== "string") throw "Invalid PDF name";
  if (!fs.existsSync(pdf)) throw "No such file";

  const command = getCommand(pdf, options);
  return execAsync(command);
};

module.exports = print;