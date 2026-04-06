const socket = io()

const data = JSON.parse(localStorage.getItem("appointmentData"))

if (!data) {
    alert("No data found!")
    window.location.href = "booking,html"
}

document.getElementById("c_appointment").innerText = data.appointment
document.getElementById("c_name").innerText = data.name
document.getElementById("c_course").innerText = `${data.course} - ${data.year}`
document.getElementById("c_purpose").innerText = data.purpose
document.getElementById("c_email").innerText = data.email
document.getElementById("c_contact").innerText = data.contact

document.getElementById("c_date").innerText = data.date
document.getElementById("c_time").innerText = data.time

function editInfo() {
    window.location.href = "booking.html"
}

async function confirmBooking() {

    console.log("Button clicked ✅");

    const data = JSON.parse(localStorage.getItem("appointmentData"));

    if (!data) {
        alert("No appointment data found!");
        return;
    }

    const finalData = {
    name: data.name,
    course: data.course,
    appointment: data.appointment, // ✅ ADD THIS
    date: data.date + " " + data.time,
    status: "Pending"
};

    console.log("Sending data:", finalData);

    try {
        const res = await fetch("http://localhost:3000/book", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(finalData)
        });

        const result = await res.json();
        console.log("Server response:", result);

        alert("Appointment Confirmed!");

        localStorage.removeItem("appointmentData");

        window.location.href = "booking.html";

    } catch (err) {
        console.error("Error:", err);
    }
}