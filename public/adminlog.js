const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const checkbox = document.getElementById("showPassword");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value;

    if (username === "admin" && password === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "admin.html";
    }
});

// ✅ Show/Hide password
checkbox.addEventListener("change", function () {
    passwordInput.type = this.checked ? "text" : "password";
});