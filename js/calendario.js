const turnosPorFecha = {
  "2025-05-05": [
    { hora: "10:00", profesional: "Laura Pérez", codigo: "LP1005" },
    { hora: "14:00", profesional: "Martín Díaz", codigo: "MD1405" }
  ],
  "2025-05-12": [
    { hora: "09:00", profesional: "Ana Torres", codigo: "AT0905" },
    { hora: "15:30", profesional: "Juan Gil", codigo: "JG1530" }
  ]
};

let currentDate = new Date();
const monthYear = document.getElementById('monthYear');
const calendarBody = document.getElementById('calendar-body');

function renderCalendar(date) {
  const year = date.getFullYear();
  const month = date.getMonth();

  monthYear.textContent = `${date.toLocaleString('es', { month: 'long' })} ${year}`;
  calendarBody.innerHTML = '';

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  let row = document.createElement('tr');
  for (let i = 0; i < firstDay; i++) {
    row.appendChild(document.createElement('td'));
  }

  for (let day = 1; day <= daysInMonth; day++) {
    if (row.children.length === 7) {
      calendarBody.appendChild(row);
      row = document.createElement('tr');
    }

    const td = document.createElement('td');
    td.textContent = day;

    td.addEventListener('click', () => {
      document.querySelectorAll('.calendar-table td').forEach(cell => cell.classList.remove('active'));
      td.classList.add('active');
      mostrarTurnos(day, month + 1, year);
    });

    row.appendChild(td);
  }

  while (row.children.length < 7) {
    row.appendChild(document.createElement('td'));
  }

  calendarBody.appendChild(row);
}

function mostrarTurnos(dia, mes, anio) {
  const fecha = `${anio}-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}`;
  const turnos = turnosPorFecha[fecha] || [];

  const contenedor = document.getElementById('turnos-container');
  const lista = document.getElementById('lista-turnos');
  const fechaTexto = document.getElementById('fecha-seleccionada');

  fechaTexto.textContent = `${dia}/${mes}/${anio}`;
  lista.innerHTML = '';

  if (turnos.length === 0) {
    lista.innerHTML = '<li>No hay turnos disponibles.</li>';
  } else {
    turnos.forEach(t => {
      const li = document.createElement('li');
      li.textContent = `Hora: ${t.hora}, Profesional: ${t.profesional}, Código: ${t.codigo}`;
      lista.appendChild(li);
    });
  }

  contenedor.style.display = 'block';
}

document.getElementById('prev').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() - 1);
  renderCalendar(currentDate);
});

document.getElementById('next').addEventListener('click', () => {
  currentDate.setMonth(currentDate.getMonth() + 1);
  renderCalendar(currentDate);
});

renderCalendar(currentDate);