$(document).ready(function () {
  const urlParams = new URLSearchParams(window.location.search);
  var userId = urlParams.get("id");
  console.log(userId);

  if (!userId) {
    window.location.href = "../../index.html"; // Redirect to login page if user ID is not provided
  }

  $("#cancelBtn").click(function () {
    window.location.href = `./transaction.html?id=${userId}`;
  });
  var toEmail;
  $("#transferBtn").click(function () {
    event.preventDefault(); // Prevent the default form submission
    showOtpModal();
    // Make an AJAX GET request to fetch user details
    $.ajax({
      url: "http://localhost:8080/api/accounts/" + userId,
      type: "GET",
      success: function (user) {
        toEmail = user.email;
        // Make an AJAX POST request to send OTP email
        $.ajax({
          url: "http://localhost:8080/api/send-email",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({ email: toEmail }),
          success: function (response) {
            console.log("OTP email sent successfully");
          },
          error: function (xhr, status, error) {
            console.error("Failed to send OTP email:", error);
          },
        });
      },
      error: function (error) {
        console.error("Error fetching user details:", error);
      },
    });
  });

  $("#verifyOtpBtn").click(function () {
    var otp = getEnteredOtp();
    // Get the values of fromAccountId, toAccountId, amount, and description from input fields
    var fromAccountId = $("#fromAccountId").val();
    var toAccountId = $("#toAccountId").val();
    var amount = $("#amount").val();
    var description = $("#description").val();
    $.ajax({
      url: "http://localhost:8080/api/verify-otp",
      type: "POST",
      contentType: "application/json",
      data: JSON.stringify({ email: toEmail, otp: otp }),
      success: function (response) {
        console.log("OTP is verified successfully");
        $.ajax({
          url: "http://localhost:8080/api/accounts/transfer",
          type: "PUT",
          contentType: "application/json",
          data: JSON.stringify({
            fromAccountId: fromAccountId,
            toAccountId: toAccountId,
            amount: amount,
            description: description,
          }),
          success: function (response) {
            console.log("Transaction is successfully");
            window.location.href = `./transaction.html?id=${userId}`;
          },
          error: function (xhr, status, error) {
            console.error("Invalid otp", error);
          },
        });
      },
      error: function (xhr, status, error) {
        console.error("Invalid otp", error);
      },
    });
  });

  $("#resendOtpBtn").click(function () {
    startTimer(90); // Reset timer
    $.ajax({
      url: "http://localhost:8080/api/accounts/" + userId,
      type: "GET",
      success: function (user) {
        const toEmail = user.email;
        // Make an AJAX POST request to send OTP email
        $.ajax({
          url: "http://localhost:8080/api/send-email",
          type: "POST",
          contentType: "application/json",
          data: JSON.stringify({ toEmail: toEmail }),
          success: function (response) {
            console.log("OTP email sent successfully");
          },
          error: function (xhr, status, error) {
            console.error("Failed to send OTP email:", error);
          },
        });
      },
      error: function (error) {
        console.error("Error fetching user details:", error);
      },
    });
  });
});

function showOtpModal() {
  document.getElementById("otpModal").classList.remove("hidden");
  startTimer(90); // 90 seconds timer
}

function hideOtpModal() {
  document.getElementById("otpModal").classList.add("hidden");
}

function startTimer(duration) {
  var timer = duration,
    minutes,
    seconds;
  var interval = setInterval(function () {
    minutes = parseInt(timer / 60, 10);
    seconds = parseInt(timer % 60, 10);

    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;

    document.getElementById("timer").textContent = minutes + ":" + seconds;

    if (--timer < 0) {
      clearInterval(interval);
      hideOtpModal();
    }
  }, 1000);
}

function getEnteredOtp() {
  var otp = "";
  $(".otp-box").each(function () {
    otp += $(this).val();
  });
  return otp;
}

