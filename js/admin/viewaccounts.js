$(document).ready(function () {
  // Function to toggle blur effect on background
  function toggleBlur() {
    $("body").addClass("blurred-background");
  }

  // Button click event handlers
  $("#createAccountBtn").click(function () {
    // Handle create account functionality
    // Redirect or display relevant content
    window.location.href = "./createaccount.html";
  });

  $("#viewAllAccountsBtn").click(function () {
    // Handle view all accounts functionality
    // Redirect or display relevant content
    window.location.href = "./viewaccounts.html";
  });

  $("#aboutBtn").click(function () {
    // Handle view account by ID functionality
    // Redirect or display relevant content
    window.location.href = "./dashboard.html";
  });

  $("#deleteAccountByIdBtn").click(function () {
    // Handle delete account by ID functionality
    // Redirect or display relevant content
    window.location.href = "./deleteaccount.html";
  });

  $("#logoutBtn").click(function () {
    // Handle logout functionality
    // Redirect to logout endpoint or perform logout actions
    window.location.href = "../../index.html";
  });

  function getAllAccounts() {
    $.ajax({
      url: "http://localhost:8080/api/accounts",
      method: "GET",
      success: function (response) {
        // Clear previous data
        $("#accountList").empty();
        // Populate table with account data
        response.forEach(function (account) {
          var row = $("<tr>");
          row.append(
            '<td class="border border-gray-500 px-4 py-2">' +
              account.id +
              "</td>"
          );
          row.append(
            '<td class="border border-gray-500 px-4 py-2">' +
              account.accountHolderName +
              "</td>"
          );
          row.append(
            '<td class="border border-gray-500 px-4 py-2">' +
              account.phoneNo +
              "</td>"
          );
          row.append(
            '<td class="border border-gray-500 px-4 py-2">' +
              account.accountType +
              "</td>"
          );
          row.append(
            '<td class="border border-gray-500 px-4 py-2">₹' +
              account.balance +
              "</td>"
          );
          // Add options button to view user details
          var viewDetailsBtn = $(
            '<button class="viewDetailsBtn transition ease-in-out delay-150 bg-pink-600 hover:translate-y-1 hover:scale-110 hover:bg-pink-900 duration-300 text-white rounded-lg py-2font-semibold py-2 px-4 rounded-md">View Details</button>'
          );
          viewDetailsBtn.click(function () {
            // Display user details popup
            displayUserDetails(account);
          });
          row.append(
            $('<td class="border border-gray-500 px-4 py-2">').append(
              viewDetailsBtn
            )
          );
          $("#accountList").append(row);
        });
      },
      error: function (error) {
        console.error("Error fetching accounts:", error);
      },
    });
  }

  // Function to display user details in a popup
  function displayUserDetails(user) {
    $("#userDetailsContent").html(
      "<p>ID: " +
        user.id +
        "</p>" +
        "<p>Name: " +
        user.accountHolderName +
        "</p>" +
        "<p>Phone No: " +
        user.phoneNo +
        "</p>" +
        "<p>DOB: " +
        user.dob +
        "</p>" +
        "<p>Account Type: " +
        user.accountType +
        "</p>" +
        "<p>Aadhar No: " +
        user.aadharNo +
        "</p>" +
        "<p>Pincode: " +
        user.pincode +
        "</p>" +
        "<p>State: " +
        user.state +
        "</p>" +
        "<p>City: " +
        user.city +
        "</p>" +
        "<p>Locality: " +
        user.locality +
        "</p>" +
        "<p>Balance: ₹" +
        user.balance +
        "</p>"
    );
    $("#userDetailsPopup").addClass("show"); // Add 'show' class to display the popup
    $("body").append('<div class="popup-overlay"></div>'); // Append overlay to blur background
  }

  // Function to fetch and display user details by ID
  function getUserDetailsById(accountId) {
    $.ajax({
      url: "http://localhost:8080/api/accounts/" + accountId,
      method: "GET",
      success: function (response) {
        displayUserDetails(response);
      },
      error: function (error) {
        console.error("Error fetching account by ID:", error);
      },
    });
  }

  // Function to handle searching for account by ID
  $("#searchBtn").click(function () {
    var accountId = $("#searchInput").val();
    if (accountId.trim() !== "") {
      getUserDetailsById(accountId);
    }
  });

  // Function to close the user details popup
  $("#closePopupBtn").click(function () {
    $("#userDetailsPopup").removeClass("show"); // Remove 'show' class to hide the popup
    $(".popup-overlay").remove(); // Remove overlay
    $("body").removeClass("blurred-background"); // Remove blur effect
  });

  // Event listener for "View Details" buttons
  $(document).on("click", ".viewDetailsBtn", function () {
    var accountId = $(this).closest("tr").find("td:first").text();
    getUserDetailsById(accountId);
  });

  // Fetch all accounts when the page loads
  getAllAccounts();
});
