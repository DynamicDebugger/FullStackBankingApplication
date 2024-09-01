$(document).ready(function () {
  // Button click event handlers
  $("#createAccountBtn").click(function () {
    window.location.href = "./createaccount.html";
  });

  $("#viewAllAccountsBtn").click(function () {
    window.location.href = "./viewaccounts.html";
  });

  $("#aboutBtn").click(function () {
    window.location.href = "./dashboard.html";
  });

  $("#deleteAccountByIdBtn").click(function () {
    window.location.href = "./deleteaccount.html";
  });

  $("#logoutBtn").click(function () {
    window.location.href = "../../index.html";
  });

  $(document).ready(function () {
    function displayAccountDetails(account) {
      $("#accountDetailsContent").html(
        "<p>ID: " +
          account.id +
          "</p>" +
          "<p>Name: " +
          account.accountHolderName +
          "</p>" +
          "<p>Phone No: " +
          account.phoneNo +
          "</p>" +
          "<p>DOB: " +
          account.dob +
          "</p>" +
          "<p>Account Type: " +
          account.accountType +
          "</p>" +
          "<p>Aadhar No: " +
          account.aadharNo +
          "</p>" +
          "<p>Pincode: " +
          account.pincode +
          "</p>" +
          "<p>State: " +
          account.state +
          "</p>" +
          "<p>City: " +
          account.city +
          "</p>" +
          "<p>Locality: " +
          account.locality +
          "</p>" +
          "<p>Balance: ₹" +
          account.balance +
          "</p>"
      );
      $("#accountDetails").css({
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        marginTop: "20px", // Corrected syntax with quotes around "20px"
        backgroundColor: "#DFF0D8" /* Light green */,
      });
      $("#accountDetails").show();
    }

    function getAccountDetailsById(accountId) {
      $.ajax({
        url: "http://localhost:8080/api/accounts/" + accountId,
        method: "GET",
        success: function (response) {
          displayAccountDetails(response);
        },
        error: function (error) {
          console.error("Error fetching account by ID:", error);
        },
      });
    }

    function deleteAccountById(accountId) {
      $.ajax({
        url: "http://localhost:8080/api/accounts/" + accountId,
        method: "DELETE",
        success: function (response) {
          console.log("Account deleted successfully:");
          window.location.href = "./deleteaccount.html";
        },
        error: function (error) {
          console.error("Error deleting account:", error);
        },
      });
    }

    function withdrawAmount(accountId, amount) {
      $.ajax({
        url: "http://localhost:8080/api/accounts/" + accountId + "/withdraw",
        method: "PUT",
        contentType: "application/json", // Set content type to JSON
        data: JSON.stringify({ amount: amount }), // Convert data to JSON string
        success: function (response) {
          console.log("Amount withdrawn successfully:");
          $("#withdrawdDetails").show();

          var message = "<h4 class='text-center text-xl mb-1'>Account Details</h4>";
          message +=
            "<p>Account Holder Name: " +
            response.accountHolderName +
            "</p>" +
            "<p>Account ID: " +
            response.id +
            "</p>" +
            "<p>Current Balance: ₹" +
            response.balance +
            "</p>";

          $("#withdrawdDetailsContent").html(message);

          $("#withdrawdDetails").css({
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "column",
            marginTop: "20px",
            backgroundColor: "#DFF0D8" /* Light green */,
          });
        },
        error: function (error) {
          console.error("Error withdrawing amount:", error);
          // Optionally, you can display an error message to the user
        },
      });
    }

    function depositAmount(accountId, amount) {
      $.ajax({
        url: "http://localhost:8080/api/accounts/" + accountId + "/deposit",
        method: "PUT",
        contentType: "application/json", // Set content type to JSON

        data: JSON.stringify({ amount: amount }), // Convert data to JSON string
        success: function (response) {
          console.log("Amount deposited successfully:");
           $("#depositDetails").show();

           var message =
             "<h4 class='text-center text-xl mb-1'>Account Details</h4>";
           message +=
             "<p>Account Holder Name: " +
             response.accountHolderName +
             "</p>" +
             "<p>Account ID: " +
             response.id +
             "</p>" +
             "<p>Current Balance: ₹" +
             response.balance +
             "</p>";

           $("#depositDetailsContent").html(message);

           $("#depositDetails").css({
             display: "flex",
             justifyContent: "center",
             alignItems: "center",
             flexDirection: "column",
             marginTop: "20px",
             backgroundColor: "#DFF0D8" /* Light green */,
           });
        },
        error: function (error) {
          console.error("Error depositing amount:", error);
        },
      });
    }

    $("#getAccountDetailsBtn").click(function () {
      var accountId = $("#accountIdInput").val();
      if (accountId.trim() !== "") {
        getAccountDetailsById(accountId);
      }
    });

    $("#confirmDeleteBtn").click(function () {
      var accountId = $("#accountIdInput").val();
      if (accountId.trim() !== "") {
        $("#confirmationPopup").show();
      }
    });

    $("#confirmBtn").click(function () {
      var accountId = $("#accountIdInput").val();
      if (accountId.trim() !== "") {
        deleteAccountById(accountId);
        $("#confirmationPopup").hide();
        $("#accountDetails").hide();
      }
    });

    $("#cancelBtn").click(function () {
      $("#confirmationPopup").hide();
    });

    $("#withdrawBtn").click(function () {
      var accountId = $("#withdrawAccountIdInput").val();
      var amount = $("#withdrawAmountInput").val();
      if (accountId.trim() !== "" && amount.trim() !== "") {
        withdrawAmount(accountId, amount);
      }
    });
    $("#closeWithdrawBtn").click(function () {
      $("#withdrawdDetails").hide();
    });

    $("#depositBtn").click(function () {
      var accountId = $("#depositAccountIdInput").val();
      var amount = $("#depositAmountInput").val();
      if (accountId.trim() !== "" && amount.trim() !== "") {
        depositAmount(accountId, amount);
      }
    });
    $("#closeDepositBtn").click(function () {
      $("#depositDetails").hide();
    });
  });
});
