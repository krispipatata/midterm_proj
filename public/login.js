const loginForm = document.getElementById("loginForm");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const toggleText = document.getElementById("toggleText");

loginForm.addEventListener("submit", function(e) {
    e.preventDefault();

    const username = document.getElementById("username").value.trim();
    const password = passwordInput.value;

    if (username === "admin" && password === "admin") {
        window.location.href = "admin.html";
    } else {
        window.location.href = "booking.html";
    }
});

togglePassword.addEventListener("click", function() {
    const isPassword = passwordInput.type === "password";
    passwordInput.type = isPassword ? "text" : "password";
    toggleText.textContent = isPassword ? "Unsee" : "See";
    togglePassword.setAttribute("aria-label", isPassword ? "Hide password" : "Show password");
});