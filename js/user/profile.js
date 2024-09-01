$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");

  if (!userId) {
    window.location.href = "../../index.html"; // Redirect to login page if user ID is not provided
  }

  $("#settingsLink").click(function () {
    $("#dropdown-menu").toggle(); // Call the toggle function
  });
  $("#logout").click(function () {
    // Perform logout actions here (e.g., clear session, redirect to login page)
    // For now, let's assume we are redirecting to the login page
    window.location.href = "../../index.html";
  });
  $("#dashboard").click(function () {
    window.location.href = `./dashboard.html?id=${userId}`;
  });

  $("#accounts").click(function () {
    window.location.href = `./viewaccount.html?id=${userId}`;
  });

  $("#history").click(function () {
    window.location.href = `transcationhistroy.html?id=${userId}`;
  });

  $("#transfer").click(function () {
    window.location.href = `./transaction.html?id=${userId}`;
  });
  $("#profile").click(function () {
    window.location.href = `./profile.html?id=${userId}`;
  });
  var userName, userPassword;

  $("#changePasswordBtn").click(function () {
    $("#profileDetails").hide();
    $("#passwordChangeForm").show();
    $("#username").text(userName); // Set the username in the password change form
  });

  // Function to fetch user details and populate the profile
  function fetchUserProfile(userId) {
    $.get(`http://localhost:8080/api/user/${userId}`, function (data) {
      // Populate profile details
      $("#accountHolderName").text(data.account.accountHolderName);
      $("#aadharNo").text(data.account.aadharNo);
      $("#email").text(data.account.email);
      $("#dob").text(data.account.dob);
      $("#phoneno").text(data.account.phoneNo);
      $("#state").text(data.account.state);
      $("#city").text(data.account.city);
      $("#locality").text(data.account.locality);
      $("#pincode").text(data.account.pincode);
      $("#accountcreatedat").text(data.account.accountCreatedAt);
      userName = data.username; // Set the userName variable
      userPassword = data.password;
    });
  }

  // Populate profile details when the page loads
  fetchUserProfile(userId);

  // Toggle the visibility of the password change form
  $("#profile").click(function () {
    if (passwordFormVisible) {
      // If password change form is visible, hide it
      $("#passwordChangeForm").addClass("hidden");
      $("#profileDetails").removeClass("hidden");
    } else {
      fetchUserProfile(userId); // Re-populate profile details in case they were updated
    }
  });

  $("#settingsLink").click(function () {
    $("#dropdownMenu").toggle(); // Call the toggle function
  });

  $("#logout").click(function () {
    // Perform logout actions here (e.g., clear session, redirect to login page)
    // For now, let's assume we are redirecting to the login page
    window.location.href = "../../index.html";
  });

  // Handle password change form submission
  const changePasswordForm = document.getElementById("changePasswordForm");
  const passwordChangeForm = document.getElementById("passwordChangeForm");
  const successMessage = document.getElementById("successMessage");

  changePasswordForm.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form submission for now

    // Get values from the form fields
    const currentPassword = document.getElementById("currentPassword").value;
    const newPassword = document.getElementById("newPassword").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    if (currentPassword === userPassword) {
      if (confirmPassword === newPassword) {
        // Prepare the data to be sent in the request body
        const data = {
          newPassword: newPassword,
        };

        // Send a PUT request to your backend API
        $.ajax({
          type: "PUT",
          url: `http://localhost:8080/api/user/${userId}/password`, // Your backend endpoint URL
          contentType: "application/json",
          data: JSON.stringify(data),
          success: function (response) {
            // Display success message
            successMessage.style.display = "block";

            // Clear the form fields after a delay
            setTimeout(function () {
              changePasswordForm.reset();
              successMessage.style.display = "none"; // Hide the success message
            }, 3000); // Adjust delay as needed
            // $("#mismatcherr").text(" ");
            // $("#passwordChangeForm").hide();
            // $("#profileDetails").show();
            window.location.href = `./profile.html?id=${userId}`;
          },
          error: function (xhr, status, error) {
            // Handle error response
            console.error(xhr.responseText);
            // You can display an error message to the user if needed
          },
        });
      } else {
        $("#mismatcherr").text("Password didn't match.");
        $("#mismatcherr").css({
          display: "block",
        });
      }
    } else {
      $("#mismatcherr").text("Invalid current Password.");
      $("#mismatcherr").css({
        display: "block",
      });
    }
  });
});

function togglepopup() {
  document.getElementById("popup-1").classList.toggle("active");
}

