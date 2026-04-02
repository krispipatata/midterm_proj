document.addEventListener("DOMContentLoaded", () => {

    const socket = io()

    const calendar = document.getElementById("calendar")
    const monthYear = document.getElementById("monthYear")
    const confirmBtn = document.getElementById("confirmBtn")

    const unavailableDates = ["2026-04-20","2026-04-22","2026-04-25"];

    let currentDate = new Date()
    let selectedDate = null

    function renderCalendar() {
        calendar.innerHTML = ""

        const year = currentDate.getFullYear()
        const month = currentDate.getMonth()

        const firstDay = new Date(year, month, 1).getDay()
        const daysInMonth = new Date(year, month + 1, 0).getDate()

        monthYear.innerText = currentDate.toLocaleString("default", {
            month: "long",
            year: "numeric"
        })

        for (let i = 0; i < firstDay; i++) {
            calendar.innerHTML += `<div></div>`
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

            calendar.appendChild(div);
        }
    }

    document.getElementById("prev").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() - 1)
        renderCalendar()
    }

    document.getElementById("next").onclick = () => {
        currentDate.setMonth(currentDate.getMonth() + 1)
        renderCalendar()
    }

    renderCalendar()

    // ✅ FIXED BUTTON
    confirmBtn.addEventListener("click", function () {

        const selectedTime = document.querySelector("input[name='time']:checked")

        if (!selectedDate) {
            alert("Please select a date")
            return
        }

        if (!selectedTime) {
            alert("Please select a time")
            return
        }

        const savedData = JSON.parse(localStorage.getItem("appointmentData"))

        if (!savedData) {
            alert("Missing booking data")
            window.location.href = "booking.html"
            return
        }

        const finalData = {
            ...savedData,
            date: selectedDate,
            time: selectedTime.value
        }

        localStorage.setItem("appointmentData", JSON.stringify(finalData))

        window.location.href = "confirmation.html"
    })

})