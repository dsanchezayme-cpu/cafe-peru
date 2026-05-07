// 1. MANEJO DEL PRELOADER
window.addEventListener("load", () => {
    setTimeout(() => {
        const pre = document.getElementById("preloader");
        pre.style.opacity = "0";
        setTimeout(() => pre.style.visibility = "hidden", 600);
    }, 1500);
});

// 2. DASHBOARD INTERACTIVO
const datosProduccion = {
    labels: ["2020", "2021", "2022", "2023", "2024"],
    datasets: [
        { label: "Cajamarca", data: [420, 450, 470, 460, 485], backgroundColor: "#E63946" },
        { label: "Junín", data: [310, 320, 350, 340, 360], backgroundColor: "#F4A261" },
        { label: "San Martín", data: [480, 500, 530, 510, 540], backgroundColor: "#2A9D8F" },
        { label: "Amazonas", data: [360, 380, 400, 390, 415], backgroundColor: "#264653" },
        { label: "Cusco", data: [390, 410, 430, 420, 440], backgroundColor: "#c59d5f" }
    ]
};

let selA = null;
let selB = null;

const ctx = document.getElementById('graficoCafe').getContext('2d');
new Chart(ctx, {
    type: 'bar',
    data: datosProduccion,
    options: {
        maintainAspectRatio: false,
        plugins: { legend: { labels: { color: '#333' } } },
        onClick: (e, elements) => {
            if (elements.length > 0) {
                const el = elements[0];
                const val = datosProduccion.datasets[el.datasetIndex].data[el.index];
                const label = `${datosProduccion.datasets[el.datasetIndex].label} (${datosProduccion.labels[el.index]})`;

                if (!selA || (selA && selB)) {
                    selA = { label, val }; selB = null;
                    document.getElementById('comp-a').innerText = label + ": " + val + "k";
                    document.getElementById('comp-b').innerText = "-";
                    document.getElementById('diff-result').innerText = "Seleccione Punto B";
                } else {
                    selB = { label, val };
                    document.getElementById('comp-b').innerText = label + ": " + val + "k";
                    const diff = selB.val - selA.val;
                    const porc = ((diff / selA.val) * 100).toFixed(1);
                    const signo = diff > 0 ? "+" : "";
                    document.getElementById('diff-result').innerText = `${signo}${diff}k (${signo}${porc}%)`;
                }
            }
        },
        scales: { y: { beginAtZero: false, min: 200 } }
    }
});

// 3. ANIMACIONES AL SCROLL
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = "1";
            entry.target.style.transform = "translateY(0)";
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.slide-up').forEach(section => observer.observe(section));

// 4. REGIONES CAROUSEL
let currentRegIndex = 0;
const regCards = document.querySelectorAll('.reg-card');
const regBtns = document.querySelectorAll('.btn-reg');
let regAutoTimer;

function updateRegDisplay() {
    regCards.forEach((card, i) => {
        card.classList.toggle('active', i === currentRegIndex);
        regBtns[i].classList.toggle('active', i === currentRegIndex);
    });
}

function jumpTo(index) {
    currentRegIndex = index;
    updateRegDisplay();
    resetRegTimer();
}

function nextReg() {
    currentRegIndex = (currentRegIndex + 1) % regCards.length;
    updateRegDisplay();
}

function resetRegTimer() {
    clearInterval(regAutoTimer);
    regAutoTimer = setInterval(nextReg, 6000);
}
resetRegTimer();

// 5. PROCESOS (CORREGIDO A 7 PASOS)
const procesosData = [
    { t: "1. Siembra", d: "El ciclo inicia en el vivero con la selección de semillas certificadas. Tras 6 meses, los plantones se trasladan al campo definitivo.", i: "img/siembracafe.jpg" },
    { t: "2. Cosecha", d: "Recolección manual selectiva de cerezos rojos maduros para asegurar que solo los granos en su punto óptimo lleguen al proceso.", i: "img/cosechacafe.jpg" },
    { t: "3. Despulpado", d: "Se retira mecánicamente la pulpa del cerezo para liberar los granos de café, proceso que debe hacerse el mismo día de la cosecha.", i: "img/despulpadocafe.jpg" },
    { t: "4. Fermentación", d: "Los granos reposan en tanques para degradar el mucílago (miel), permitiendo resaltar los atributos sensoriales y sabores del café.", i: "img/fermentacionylavado.jpg" },
    { t: "5. Secado", d: "Los granos húmedos se exponen al sol en camillas o patios para reducir la humedad gradualmente hasta alcanzar un 10-12%.", i: "img/secadocafe.jpg" },
    { t: "6. Trillado", d: "Se elimina la cáscara protectora (pergamino) para obtener el 'café verde' u oro, listo para la selección de exportación.", i: "img/trilladocafe.png" },
    { t: "7. Tostado", d: "Transformación final por calor donde se desarrollan los aceites y aromas complejos del café peruano.", i: "img/tostadodelcafe.jpg" }
];

function showProc(idx) {
    document.getElementById('proc-title').innerText = procesosData[idx].t;
    document.getElementById('proc-desc').innerText = procesosData[idx].d;
    document.getElementById('proc-img').src = procesosData[idx].i;

    const btns = document.querySelectorAll('.btn-proc');
    btns.forEach((b, i) => b.classList.toggle('active', i === idx));

    const minis = document.querySelectorAll('.mini-img');
    minis.forEach((m, i) => m.classList.toggle('active-mini', i === idx));
}
// Configuración del observador de scroll
// Función para activar el scroll infinito de animaciones
function iniciarAnimacionesScroll() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: "0px 0px -50px 0px"
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                console.log("Sección visible: ", entry.target.id); // Ver en consola
            } else {
                // Esto permite que al subir y bajar se repita
                entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const targets = document.querySelectorAll('.slide-up');
    targets.forEach(target => scrollObserver.observe(target));
}

// Ejecutamos después de que todo cargue (incluyendo el preloader)
window.addEventListener('load', () => {
    setTimeout(iniciarAnimacionesScroll, 500); 
});