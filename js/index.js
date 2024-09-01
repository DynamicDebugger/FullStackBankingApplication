document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    const username = document.getElementById("username").value.trim();
    const password = document.getElementById("password").value.trim();
    const errorElement = document.getElementById("error");

    if (username && password) {
      fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      })
        .then((response) => {
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          return response.json();
        })
        .then((data) => {
          errorElement.textContent = "";
          console.log("SUCCESS");
          let role = document.querySelector('input[name="role"]:checked').value;
          if (role == "admin") {
            window.location.href = "./html/admin/dashboard.html";
          } else if (role == "user") {
             fetch(`http://localhost:8080/api/auth/${username}`)
               .then((response) => {
                 if (!response.ok) {
                   throw new Error("Network response was not ok");
                 }
                 return response.json();
               })
               .then((userData) => {
                 let userId = userData; // Assuming the response contains the user ID
                 window.location.href = `./html/user/dashboard.html?id=${userId}`; // Include user ID as a query parameter
               })
               .catch((error) => {
                 console.error(
                   "Failed to fetch user ID from the backend:",
                   error
                 );
                 errorElement.textContent =
                   "Failed to login. Please try again.";
               });
          }
          console.log(data);
        })
        .catch((error) => {
          console.error("There was a problem with the fetch operation:", error);
          errorElement.textContent = "Failed to login. Please try again.";
        });
    } else {
      errorElement.textContent = "Please fill out all fields.";
    }
  });
