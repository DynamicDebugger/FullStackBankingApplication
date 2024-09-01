// jQuery code to handle dropdown menu
$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  const userId = urlParams.get("id");
  console.log(userId);
  if (!userId) {
    window.location.href = "../../index.html"; // Redirect to login page if user ID is not provided
  }
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
function togglepopup() {
  document.getElementById("popup-1").classList.toggle("active");
}

