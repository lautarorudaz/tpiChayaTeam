const calendar = document.getElementById("calendar");
const monthYear = document.getElementById("monthYear");
const turnos = document.getElementById("turnos");

let currentDate = new Date(2025, 0); // Inicia en enero 2025

const diasSemana = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

document.getElementById("prevMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar();
});

document.getElementById("nextMonth").addEventListener("click", () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar();
});

function renderCalendar() {
  calendar.innerHTML = "";
  monthYear.textContent = currentDate.toLocaleString("default", {
    month: "long",
    year: "numeric"
  });

  // Cabecera de días
  diasSemana.forEach(dia => {
    const div = document.createElement("div");
    div.textContent = dia;
    calendar.appendChild(div);
  });

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDay = new Date(year, month, 1);
  const startingDay = (firstDay.getDay() + 6) % 7; // Ajustar domingo al final

  const lastDate = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < startingDay; i++) {
    const empty = document.createElement("div");
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= lastDate; day++) {
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("day");
    dayDiv.textContent = day;

    dayDiv.addEventListener("click", () => {
      document.querySelectorAll(".day").forEach(el => el.classList.remove("selected"));
      dayDiv.classList.add("selected");
      mostrarTurnos(day, month + 1, year);
    });

    calendar.appendChild(dayDiv);
  }
}

function mostrarTurnos(dia, mes, anio) {
    const fecha = `${anio}-${String(mes).padStart(2, "0")}-${String(dia).padStart(2, "0")}`;
  
    const modalidades = ["Masajes", "Tratamiento facial", "Tratamiento de belleza"];
    const turnosEjemplo = [
      {
        hora: "09:00 AM",
        profesional: "Dr. Ramírez",
        duracion: "30 minutos",
        modalidad: modalidades[Math.floor(Math.random() * modalidades.length)],
      },
      {
        hora: "10:30 AM",
        profesional: "Lic. Martínez",
        duracion: "45 minutos",
        modalidad: modalidades[Math.floor(Math.random() * modalidades.length)],
      }
    ];
  
    turnos.innerHTML = turnosEjemplo.map(t => {
      const params = new URLSearchParams({
        fecha,
        hora: t.hora,
        profesional: t.profesional,
        duracion: t.duracion,
        modalidad: t.modalidad
      });
  
      return `
        <div class="turno" onclick="window.location.href='confirmacion.html?${params.toString()}'">
          <p><strong>Fecha:</strong> ${fecha}</p>
          <p><strong>Hora:</strong> ${t.hora}</p>
          <p><strong>Profesional:</strong> ${t.profesional}</p>
          <p><strong>Duración:</strong> ${t.duracion}</p>
          <p><strong>Modalidad:</strong> ${t.modalidad}</p>
          <p class="seleccionar-texto">Seleccionar turno</p>
        </div>
      `;
    }).join('');
  }
  

renderCalendar(); // Inicializa el calendario