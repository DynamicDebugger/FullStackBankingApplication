var userId;
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  userId = urlParams.get("id");
  console.log(userId);

  if (!userId) {
    window.location.href = "../../index.html"; // Redirect to login page if user ID is not provided
  }
  $("#money-transfer").click(function () {
    window.location.href = `./moneytransfer.html?id=${userId}`;
  });
  $("#settingsLink").click(function () {
    $("#dropdownMenu").toggle(); // Call the toggle function
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
});

// Function to display user details in a popup
function displayUserDetails() {
  // Fetch user details from the backend API
  var accountId = userId; // Assuming you have the account ID
  $.ajax({
    url: "http://localhost:8080/api/accounts/" + accountId,
    method: "GET",
    success: function (user) {
      // Populate the popup with user details
      $("#accountId").text(user.id);
      $("#accountHolderName").text(user.accountHolderName);
      $("#accountType").text(user.accountType);
      const balance = "₹" + user.balance;
      $("#balance").text(balance);

      // Show the popup
      $("#balancePopup").removeClass("hidden");
    },
    error: function (error) {
      console.error("Error fetching user details:", error);
    },
  });
}

// Function to hide the balance popup
function hideBalancePopup() {
  $("#balancePopup").addClass("hidden"); // Hide the popup
}
