const stml = require("./stml");

try {
  const renderedHTML = stml.render("index.html", {
    title: "Hello",
    content: "This is the content of the page.",
    items: [],
  });
  console.log(renderedHTML);
} catch (error) {
  console.error(error.message);
}
