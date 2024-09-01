$(document).ready(function () {
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
    // Handle view all accounts functionality
    // Redirect or display relevant content
    window.location.href = "./about.html";
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

  // Now that the DOM is ready, we can access and manipulate DOM elements
  const container = document.getElementById("product-container");
  const scrollContainer = document.getElementById("scrollContainer");
  const scrollLeftBtn = document.getElementById("scrollLeftBtn");
  const scrollRightBtn = document.getElementById("scrollRightBtn");
  const scrollStep = 200; // Adjust scroll step as needed

  scrollLeftBtn.addEventListener("click", () => {
    const scrollLeft = container.scrollLeft;
    const childWidth =
      scrollContainer.children[0].getBoundingClientRect().width;
    const centerIndex = Math.round(scrollLeft / childWidth);
    container.scrollLeft = (centerIndex - 1) * childWidth;
  });

  scrollRightBtn.addEventListener("click", () => {
    const scrollLeft = container.scrollLeft;
    const childWidth =
      scrollContainer.children[0].getBoundingClientRect().width;
    const centerIndex = Math.round(scrollLeft / childWidth);
    container.scrollLeft = (centerIndex + 1) * childWidth;
  });
});
