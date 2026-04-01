const express = require("express")
const http = require("http")
const { Server } = require("socket.io")

const app = express()
const server = http.createServer(app)
const io = new Server(server)

// MIDDLEWARE
app.use(express.json())
app.use(express.static("public"))

// TEMP STORAGE
let appointments = []

// BOOK APPOINTMENT
app.post("/book", (req, res) => {
    const newAppointment = {
        id: Date.now(),
        ...req.body,
        status: "Pending"
    }

    appointments.push(newAppointment)

    // SEND TO ADMIN REAL-TIME
    io.emit("new_appointment", newAppointment)

    res.json({ message: "Booked!" })
})

// UPDATE STATUS (ADMIN)
app.post("/update", (req, res) => {
    const { id, status } = req.body

    appointments = appointments.map(a =>
        a.id === id ? { ...a, status } : a
    )

    io.emit("appointment_updated", { id, status })

    res.json({ message: "Updated!" })
})

// START SERVER
server.listen(3000, () => {
    console.log("Server running at http://localhost:3000")
})