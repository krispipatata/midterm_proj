const socket = io()

const data = JSON.parse(localStorage.getItem("appointmentData"))

if (!data) {
    alert("No data found!")
    window.location.href = "booking.html"
}

// DISPLAY DATA
document.getElementById("c_appointment").innerText = data.appointment
document.getElementById("c_name").innerText = data.name
document.getElementById("c_course").innerText = `${data.course} - ${data.year}`
document.getElementById("c_purpose").innerText = data.purpose
document.getElementById("c_email").innerText = data.email
document.getElementById("c_contact").innerText = data.contact

document.getElementById("c_date").innerText = data.date
document.getElementById("c_time").innerText = data.time

// EDIT BUTTON
function editInfo() {
    window.location.href = "booking.html"
}

// CONFIRM BUTTON (SEND TO SERVER)
async function confirmBooking() {

    await fetch("/book", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    })

    alert("Appointment Confirmed!")

    localStorage.removeItem("appointmentData")

    window.location.href = "booking.html"
}