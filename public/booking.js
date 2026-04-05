document.getElementById("bookingForm").addEventListener("submit", (e) => {
    e.preventDefault()

    const data = {
        appointment: document.getElementById("appointment").value,
        name:
            document.getElementById("firstName").value + " " +
            document.getElementById("middleName").value + " " +
            document.getElementById("lastName").value,
        course: document.getElementById("course").value,
        year: document.getElementById("year").value,
        section: document.getElementById("section").value,
        purpose: document.getElementById("purpose").value,
        email: document.getElementById("email").value,
        contact: document.getElementById("contact").value
    }

    localStorage.setItem("appointmentData", JSON.stringify(data))

    window.location.href = "schedule.html"
})