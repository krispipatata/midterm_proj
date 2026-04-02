// ✅ CONNECT TO BACKEND SERVER
const socket = io("http://localhost:3000");

const table = document.querySelector("#apptTable tbody");
let data = [];

// 🎯 RENDER TABLE
function render() {
    table.innerHTML = "";

    data.forEach((d, i) => {
        table.innerHTML += `
        <tr>
            <td>${d.name}</td>
            <td>${d.course || "N/A"}</td>
            <td>${d.date}</td>
            <td>
                <span class="status ${getStatusClass(d.status)}">
                    ${d.status.toLowerCase()}
                </span>
            </td>
            <td class="actions">
                <button class="view" onclick="view(${i})">👁</button>
                <button class="confirm" onclick="confirmAppt(${d.id})">✔</button>
                <button class="cancel" onclick="removeAppt(${d.id})">✖</button>
            </td>
        </tr>`;
    });
}

// 🎯 STATUS STYLE MATCH (for CSS)
function getStatusClass(status) {
    status = status.toLowerCase();

    if (status === "pending") return "booked";
    if (status === "approved") return "open";
    if (status === "rejected") return "completed";

    return "open";
}

// ✅ LOAD EXISTING APPOINTMENTS
async function loadAppointments() {
    try {
        const res = await fetch("http://localhost:3000/appointments");
        const appts = await res.json();

        data = appts;
        render();
    } catch (err) {
        console.error("Error loading appointments:", err);
    }
}

// run on page load
loadAppointments();

// 🔄 REALTIME NEW APPOINTMENT
socket.on("new_appointment", (appt) => {
    data.push(appt);
    render();
});

// 🔄 REALTIME STATUS UPDATE
socket.on("appointment_updated", ({ id, status }) => {
    const index = data.findIndex(d => d.id == id);

    if (index !== -1) {
        data[index].status = status;
        render();
    }
});

// ✔ APPROVE
async function confirmAppt(id) {
    await updateStatus(id, "Approved");
}

// ✖ REJECT
async function removeAppt(id) {
    await updateStatus(id, "Rejected");
}

// 🔁 UPDATE STATUS (SEND TO SERVER)
async function updateStatus(id, status) {
    try {
        await fetch("http://localhost:3000/update", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ id, status })
        });
    } catch (err) {
        console.error("Update failed:", err);
    }
}

// 👁 VIEW DETAILS
function view(i) {
    alert(JSON.stringify(data[i], null, 2));
}

// 🔍 SEARCH
document.getElementById("search").addEventListener("keyup", function () {
    let val = this.value.toLowerCase();

    document.querySelectorAll("tbody tr").forEach(row => {
        row.style.display = row.innerText.toLowerCase().includes(val)
            ? ""
            : "none";
    });
});