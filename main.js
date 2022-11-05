import "./style.css";

const app = document.querySelector("#app");
// const rectangles = document.querySelectorAll(".rect");
const rectangles = Array.from(document.querySelectorAll(".rect"));

console.log(rectangles);

let mouseX = 0;
let mouseY = 0;

function updateRectangle(rectangle) {
  const position = rectangle.getBoundingClientRect();
  const hue = parseInt(rectangle.getAttribute("data-hue"));

  function addGradient() {
    const colInner = `hsl(${hue}, 100%, 80%)`;
    const colOuter = `hsl(${hue}, 40%, 30%)`;

    const diffX = mouseX - position.x;
    const diffY = mouseY - position.y;

    const bg = `radial-gradient(circle at ${diffX}px ${diffY}px, ${colInner}, ${colOuter})`;
    rectangle.style.backgroundImage = bg;
  }

  function addShadow() {
    const centerX = position.x + position.width * 0.5;
    const centerY = position.y + position.height * 0.5;

    const diffX = mouseX - centerX;
    const diffY = mouseY - centerY;

    const len = Math.sqrt(diffX * diffX + diffY * diffY);

    const val = {
      x: diffX * -0.06,
      y: diffY * -0.06,
      blur: len * 0.1,
    };

    const col = `hsla(${hue}, 100%, 15%, 0.6)`;
    const col1 = `hsla(${hue}, 100%, 60%, 0.2)`;

    rectangle.style.boxShadow = `${val.x}px ${val.y}px ${val.blur}px ${col}, 0px 0px 40px ${col1}`;
  }

  addGradient();
  addShadow();
}

window.addEventListener("mousemove", (ev) => {
  mouseX = ev.clientX;
  mouseY = ev.clientY;

  rectangles.forEach((rectangle) => {
    updateRectangle(rectangle);
  });

  app.style.backgroundImage = `radial-gradient(ellipse at ${mouseX}px ${mouseY}px, #fff, #bbb)`;
});
