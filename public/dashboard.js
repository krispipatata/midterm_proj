const socket = io("http://localhost:3000");

const table = document.querySelector("#apptTable tbody");
const historyBody = document.getElementById("historyBody");
const notifBadge = document.getElementById("notifBadge");

let data = [];
let unseenCount = 0;

function render() {
    table.innerHTML = "";
    historyBody.innerHTML = "";

    let active = data.filter(d => d.status === "Pending");
    let history = data.filter(d => d.status !== "Pending");

    // ACTIVE
    active.forEach((d, i) => {
        table.innerHTML += `
        <tr>
            <td>${d.name}</td>
            <td>${d.course || "N/A"}</td>
            <td>${d.appointment || "N/A"}</td>
            <td>${d.date}</td>
            <td><span class="status booked">${d.status}</span></td>
            <td class="actions">
                <button class="confirm" onclick="updateStatus(${d.id}, 'Approved')">✔</button>
                <button class="cancel" onclick="updateStatus(${d.id}, 'Rejected')">✖</button>
            </td>
        </tr>`;
    });

    // HISTORY
    history.forEach(d => {
        historyBody.innerHTML += `
        <tr>
            <td>${d.name}</td>
            <td>${d.course || "N/A"}</td>
            <td>${d.appointment || "N/A"}</td> <!-- ✅ NEW -->
            <td>${d.date}</td>
            <td><span class="status ${getStatusClass(d.status)}">${d.status}</span></td>
        </tr>`;
    });
}

function getStatusClass(status) {
    if (status === "Approved") return "open";
    if (status === "Rejected") return "completed";
    return "booked";
}

// LOAD FROM SERVER
async function loadAppointments() {
    const res = await fetch("http://localhost:3000/appointments");
    data = await res.json();
    render();
}
loadAppointments();

// 🔴 NEW APPOINTMENT NOTIF
socket.on("new_appointment", (appt) => {
    data.push(appt);
    unseenCount++;
    notifBadge.innerText = unseenCount;
    notifBadge.style.display = "inline-block";
    render();
});

// UPDATE STATUS
socket.on("appointment_updated", ({ id, status }) => {
    const index = data.findIndex(d => d.id == id);
    if (index !== -1) {
        data[index].status = status;
        render();
    }
});

// SEND UPDATE
async function updateStatus(id, status) {
    await fetch("http://localhost:3000/update", {
        method: "POST",
        headers: {"Content-Type":"application/json"},
        body: JSON.stringify({ id, status })
    });
}

// SEARCH
document.getElementById("search").addEventListener("keyup", function () {
    let val = this.value.toLowerCase();

    document.querySelectorAll("tbody tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(val)
            ? ""
            : "none";
    });
});