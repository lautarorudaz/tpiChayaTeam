
const calendar = document.getElementById('calendar');
const slotsDiv = document.getElementById('slots');
const slotList = document.getElementById('slot-list');
const selectedDateText = document.getElementById('selected-date');
const monthYearText = document.getElementById('monthYear');
const prevBtn = document.getElementById('prev');
const nextBtn = document.getElementById('next');

const months = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio",
                "Julio", "Agosto", "Septiembre", "Octubre", "Noviembre", "Diciembre"];

let currentDate = new Date();
let currentMonth = currentDate.getMonth();
let currentYear = currentDate.getFullYear();

function renderCalendar(month, year) {
  calendar.innerHTML = `
    <div class="weekday">Dom</div>
    <div class="weekday">Lun</div>
    <div class="weekday">Mar</div>
    <div class="weekday">Mié</div>
    <div class="weekday">Jue</div>
    <div class="weekday">Vie</div>
    <div class="weekday">Sáb</div>
  `;

  monthYearText.textContent = `${months[month]} ${year}`;

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  for (let i = 0; i < firstDay; i++) {
    const empty = document.createElement('div');
    calendar.appendChild(empty);
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const dayEl = document.createElement('div');
    dayEl.className = 'day';
    dayEl.textContent = day;

    dayEl.addEventListener('click', () => {
      document.querySelectorAll('.day').forEach(d => d.classList.remove('selected'));
      dayEl.classList.add('selected');

      const selectedDate = new Date(year, month, day);
      selectedDateText.textContent = selectedDate.toLocaleDateString();

      const slots = [
        "09:00 - 10:00",
        "10:30 - 11:30",
        "12:00 - 13:00",
        "15:00 - 16:00",
        "17:30 - 18:30"
      ];

      slotList.innerHTML = '';
      slots.forEach(slot => {
        const slotEl = document.createElement('div');
        slotEl.className = 'slot';
        slotEl.textContent = slot;
        slotList.appendChild(slotEl);
      });

      slotsDiv.style.display = 'block';
    });

    calendar.appendChild(dayEl);
  }
}

prevBtn.addEventListener('click', () => {
  currentMonth--;
  if (currentMonth < 0) {
    currentMonth = 11;
    currentYear--;
  }
  renderCalendar(currentMonth, currentYear);
});

nextBtn.addEventListener('click', () => {
  currentMonth++;
  if (currentMonth > 11) {
    currentMonth = 0;
    currentYear++;
  }
  renderCalendar(currentMonth, currentYear);
});

renderCalendar(currentMonth, currentYear);

document.addEventListener('click', function(event) {
    const calendar = document.getElementById('calendar');
    const slots = document.getElementById('slots');
  
    if (
      !calendar.contains(event.target) &&
      !slots.contains(event.target)
    ) {
      slots.style.display = 'none';
    }
  });