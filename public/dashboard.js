const socket = io()
const table = document.querySelector("#apptTable tbody")

function addRow(appt) {
    const row = document.createElement("tr")
    row.id = appt.id

    row.innerHTML = `
        <td>${appt.name}</td>
        <td>${appt.course || "N/A"}</td>
        <td>${appt.date} ${appt.time || ""}</td>
        <td>${appt.status}</td>
        <td>
            <button onclick="updateStatus(${appt.id}, 'Approved')">Approve</button>
            <button onclick="updateStatus(${appt.id}, 'Rejected')">Reject</button>
        </td>
    `

    table.appendChild(row)
}

// RECEIVE NEW APPOINTMENT (REALTIME)
socket.on("new_appointment", (appt) => {
    addRow(appt)
})

// UPDATE STATUS LIVE
socket.on("appointment_updated", ({ id, status }) => {
    const row = document.getElementById(id)
    if (row) {
        row.children[3].innerText = status
    }
})

// SEND UPDATE
async function updateStatus(id, status) {
    await fetch("/update", {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ id, status })
    })
}