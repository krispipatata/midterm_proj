// schedule (custom calendar)
const calendarEl = document.getElementById('calendar');
if(calendarEl){
    const monthYear = document.getElementById('monthYear');
    const prev = document.getElementById('prev');
    const next = document.getElementById('next');
    const confirmBtn = document.getElementById('confirmBtn');

    let currentDate = new Date();
    let selectedDate = null;

    const unavailableDates = ["2026-03-20","2026-03-22","2026-03-25"];

    function renderCalendar(){
        calendarEl.innerHTML = "";
        const year = currentDate.getFullYear();
        const month = currentDate.getMonth();

        monthYear.textContent = currentDate.toLocaleString('default',{month:'long',year:'numeric'});

        const firstDay = new Date(year,month,1).getDay();
        const daysInMonth = new Date(year,month+1,0).getDate();

        for(let i=0;i<firstDay;i++){
            calendarEl.innerHTML += `<div></div>`;
        }

        for(let d=1; d<=daysInMonth; d++){
            const dateStr = `${year}-${String(month+1).padStart(2,'0')}-${String(d).padStart(2,'0')}`;
            const isUnavailable = unavailableDates.includes(dateStr);

            const div = document.createElement('div');
            div.classList.add('day');
            div.textContent = d;

            if(isUnavailable){
                div.classList.add('unavailable');
            } else {
                div.addEventListener('click', ()=>{
                    document.querySelectorAll('.day').forEach(el=>el.classList.remove('selected'));
                    div.classList.add('selected');
                    selectedDate = dateStr;
                });
            }

            calendarEl.appendChild(div);
        }
    }

    prev.onclick = ()=>{
        currentDate.setMonth(currentDate.getMonth()-1);
        renderCalendar();
    };

    next.onclick = ()=>{
        currentDate.setMonth(currentDate.getMonth()+1);
        renderCalendar();
    };

    confirmBtn.onclick = ()=>{
        const time = document.querySelector('input[name="time"]:checked');
        if(!selectedDate || !time){
            alert('Please select date and time');
            return;
        }

        const sched = { date:selectedDate, time:time.value };
        localStorage.setItem('schedule', JSON.stringify(sched));
        window.location.href = 'confirm.html';
    };

    renderCalendar();
}