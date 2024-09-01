$(document).ready(function () {
  // Button click event handlers
  $("#createAccountBtn").click(function () {
    // Handle create account functionality
    // Redirect or display relevant content
    window.location.href = "./createaccount.html";
  });

  $("#aboutBtn").click(function () {
    // Handle view all accounts functionality
    // Redirect or display relevant content
    window.location.href = "./about.html";
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
});
