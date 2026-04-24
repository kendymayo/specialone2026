function openEnvelope() {
  document.getElementById("wordingenvelope").classList.add("hidden");
  document.getElementById("envelope").classList.add("hidden");
  document.getElementById("envelopeopen").classList.add("show");
  document.getElementById("envelopeopen").classList.add("dissapear");
  

  setTimeout(() => {
    document.getElementById("envelopeopen").classList.remove("show");
  }, 700); // sedikit lebih lama dari animasi
  
//   generateFlowers();
  setTimeout(() => {
    showError(); // baru munculin form
  }, 3000); // sedikit lebih lama dari animasi
}

function showError() {
  const form = document.getElementById("errorpage");
  document.body.classList.add("afterEnvelopeOpenPhase1");
  form.classList.remove("hidden");
  form.classList.add("show");
}

function showForm() {
  const form = document.getElementById("form");
  form.classList.remove("hidden");
  form.classList.add("show");
}

let progress = 0;

const interval = setInterval(() => {
  progress++;

  document.getElementById("loadingBar").style.width = progress + "%";
  document.getElementById("progressText").innerText = progress + "%";

  updateText(progress);

  if (progress >= 100) {
    clearInterval(interval);
    clearInterval(dotsInterval);
    clearInterval(photoInterval);
    showLastPhoto();
    document.getElementById("mainText").innerText = "Re-boot selesaiii, pencet starttt!!!";
    document.getElementById("dots").innerText = "";
  }

}, 300);

const caption = document.getElementById("rebootcaption");

const texts = [
  "Collecting memories",
  "Syncing heart modules",
  "Compiling happiness",
  "Loading happiness for you",
  "Almost ready"
];

const mainText = document.getElementById("mainText");

function updateText(progress) {
  const index = Math.min(Math.floor(progress / 20), texts.length - 1);
  mainText.innerText = texts[index];
}

const dotsEl = document.getElementById("dots");

let dots = 0;
const maxDots = 5;

const dotsInterval = setInterval(() => {
  dots = (dots + 1) % (maxDots + 1);
  dotsEl.innerText = ".".repeat(dots);
}, 800);

const photos = [
  "src/image/wifephoto2.jpg",
  "src/image/wifephoto3.jpg",
  "src/image/wifephoto4.jpg",
  "src/image/wifephoto5.jpg",
  "src/image/wifephoto6.jpg",
  "src/image/wifephotofinal.jpg"
];


let index = 0;

function changePhoto() {
  const img = document.getElementById("photo");

  // fade out
  img.classList.remove("show");

  setTimeout(() => {
    img.src = photos[index];

    // fade in
    img.classList.add("show");

    // 🔥 next index (loop balik ke awal)
    index = (index + 1) % photos.length;
  }, 600);
}


// 🔥 jalan tiap 5 detik
const photoInterval = setInterval(changePhoto, 5000);

function showLastPhoto() {
  const img = document.getElementById("photo");

  img.classList.remove("show"); // fade out dulu

  setTimeout(() => {
    img.src = photos[photos.length - 1]; // 🔥 ambil terakhir
    img.classList.add("show"); // fade in
  }, 300);
}

/* 🌸 generate bunga jatuh */
// function startFlowers() {
//   setInterval(() => {
//     const flower = document.createElement("div");
//     flower.classList.add("flower");

//     const flowers = ["🌸", "🌼", "💮", "🌷"];
//     flower.innerHTML = flowers[Math.floor(Math.random() * flowers.length)];

//     flower.style.left = Math.random() * 100 + "vw";
//     flower.style.animationDuration = (3 + Math.random() * 3) + "s";

//     document.body.appendChild(flower);

//     setTimeout(() => {
//       flower.remove();
//     }, 6000);

//   }, 300);
// }

function generateFlowers() {
  const container = document.getElementById("flowers-container");
  const total = 15;

  const positions = []; // simpan posisi yang sudah dipakai
  const minDistance = 15; // 🔥 jarak minimal (% layar)

  for (let i = 0; i < total; i++) {
    let top, left;
    let safe = false;

    // cari posisi yang gak numpuk
    while (!safe) {
      top = Math.random() * 90;
      left = Math.random() * 90;

      safe = true;

      for (let pos of positions) {
        const distance = Math.sqrt(
          Math.pow(top - pos.top, 2) + Math.pow(left - pos.left, 2)
        );

        if (distance < minDistance) {
          safe = false;
          break;
        }
      }
    }

    positions.push({ top, left });

    const flower = document.createElement("img");
    flower.src = "src/image/bwflower1.png";
    flower.classList.add("flower-img");

    flower.style.top = top + "vh";
    flower.style.left = left + "vw";

    const size = 60 + Math.random() * 40;
    flower.style.width = size * 2 + "px";

    flower.style.animationDelay = Math.random() * 2 + "s";

    // const rotate = Math.random() * 360;
    // flower.style.transform = `rotate(${rotate}deg)`;

    container.appendChild(flower);
  }
}

function rebootProcess() {
  window.location.href = "rebootPage.html";
}

//window.onload = generateFlowers;