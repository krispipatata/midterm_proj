const socket = io()

const calendar = document.getElementById("calendar")
const monthYear = document.getElementById("monthYear")

let currentDate = new Date()
let selectedDate = null

// 📅 RENDER CALENDAR
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

    // EMPTY SPACES
    for (let i = 0; i < firstDay; i++) {
        calendar.innerHTML += `<div></div>`
    }

    // DAYS
    for (let day = 1; day <= daysInMonth; day++) {
        const div = document.createElement("div")
        div.classList.add("day")
        div.innerText = day

        div.addEventListener("click", () => {
            document.querySelectorAll(".day").forEach(d => d.classList.remove("selected"))
            div.classList.add("selected")

            const formattedDay = String(day).padStart(2, "0")
            const formattedMonth = String(month + 1).padStart(2, "0")

            selectedDate = `${year}-${formattedMonth}-${formattedDay}`
        })

        calendar.appendChild(div)
    }
}

// ⬅️ PREVIOUS MONTH
document.getElementById("prev").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() - 1)
    renderCalendar()
}

// ➡️ NEXT MONTH
document.getElementById("next").onclick = () => {
    currentDate.setMonth(currentDate.getMonth() + 1)
    renderCalendar()
}

renderCalendar()

// 🚀 NEXT STEP → CONFIRMATION PAGE
document.getElementById("confirmBtn").addEventListener("click", function () {

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

    // SAVE DATA FOR CONFIRMATION PAGE
    localStorage.setItem("appointmentData", JSON.stringify(finalData))

    // GO TO CONFIRMATION PAGE
    window.location.href = "confirmation.html"
})