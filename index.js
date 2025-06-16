const canvas = document.getElementById("drawing-board");

const toolbar = document.getElementById("toolbar");
const ctx = canvas.getContext("2d");

const canvasOffsetX = canvas.offsetLeft;
const canvasOffsetY = canvas.offsetTop;

canvas.width = window.innerWidth - canvasOffsetX;
canvas.height = window.innerHeight - canvasOffsetY;

let isPainting = false;
let lineWidth = 5;

let startX;
let startY;

var dynamicImageList = document.getElementById("dynamic-image-list");

function addNewDrawing(canvasUrl) {
  var listImage = document.createElement("img");

  listImage.src = canvasUrl;

  listImage.width = "500";
  listImage.height = "500";

  console.log(dynamicImageList);

  dynamicImageList.appendChild(listImage);
}

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "submit") {
    ctx.save();

    let canvasUrl = canvas.toDataURL();

    const createEl = document.createElement("a");

    createEl.href = canvasUrl;

    console.log(canvasUrl);

    console.log(canvas);

    createEl.download = "download-this-canvas";

    createEl.click();
    createEl.remove();
    addNewDrawing(canvasUrl);
  }
});

toolbar.addEventListener("click", (e) => {
  if (e.target.id === "clear") {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
  }
});

toolbar.addEventListener("change", (e) => {
  if (e.target.id === "stroke") {
    ctx.strokeStyle = e.target.value;
  }

  if (e.target.id === "lineWidth") {
    lineWidth = e.target.value;
  }
});

const draw = (e) => {
  if (!isPainting) {
    return;
  }
  ctx.lineWidth = lineWidth;
  ctx.lineCap = "round";

  ctx.lineTo(e.clientX - canvasOffsetX, e.clientY - 90);

  ctx.stroke();
};

canvas.addEventListener("mousedown", (e) => {
  isPainting = true;
  startX = e.clientX;
  startY = e.clientY;
});

canvas.addEventListener("mouseup", (e) => {
  isPainting = false;
  ctx.stroke();
  ctx.beginPath();
});

canvas.addEventListener("mousemove", draw);
