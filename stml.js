// stml.js
const fs = require("fs");

class TemplatingEngine {
  constructor(template) {
    this.template = template;
  }
  static fromFile(filePath, data = {}) {
    try {
      const template = fs.readFileSync(filePath, "utf8");
      return new TemplatingEngine(template, data);
    } catch (error) {
      throw new Error(`Error reading file: ${error.message}`);
    }
  }

  render(data) {
    const keys = Object.keys(data);
    const values = Object.values(data);

    const funcBody = `
        return \`${this.evaluateTemplate()}\`;
      `;

    const templateFunction = new Function(...keys, funcBody);

    try {
      return templateFunction(...values);
    } catch (error) {
      throw new Error(`Error rendering template: ${error.message}`);
    }
  }

  evaluateTemplate() {
    const regex = /<%=(.*?)%>|<%(.*?)%>/g;
    let result = "";
    let lastIndex = 0;

    let match;
    while ((match = regex.exec(this.template)) !== null) {
      result += this.template.substring(lastIndex, match.index);
      if (match[1]) {
        result += `\${${match[1].trim()}}`;
      } else if (match[2]) {
      }

      lastIndex = regex.lastIndex;
    }
    result += this.template.substring(lastIndex);

    return result;
  }
}

function render(filePath, data) {
  try {
    const template = TemplatingEngine.fromFile(filePath);
    return template.render(data);
  } catch (error) {
    throw new Error(`Error rendering template: ${error.message}`);
  }
}

module.exports = { render };
