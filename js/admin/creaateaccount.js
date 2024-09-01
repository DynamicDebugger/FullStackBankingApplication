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
  // Function to create an account
  function createAccount(formData) {
    $.ajax({
      type: "POST",
      url: "http://localhost:8080/api/accounts",
      contentType: "application/json",
      data: JSON.stringify(formData),
      success: function (data) {
        // Display success message and user details in a popup
        alert(
          "Account created successfully!\nUser Details:\n" +
            "Name: " +
            formData.accountHolderName +
            "\n" +
            "Email: " +
            formData.email +
            "\n" +
            "Aadhar Number: " +
            formData.aadharNo +
            "\n" +
            "Account Type: " +
            formData.accountType +
            "\n" +
            "Date of Birth: " +
            formData.dob +
            "\n" +
            "Phone Number: " +
            formData.phoneNo +
            "\n" +
            "Pincode: " +
            formData.deposit +
            "\n"+
            "Balance:"+
            formData.pincode +
            "\n" +
            "City: " +
            formData.city +
            "\n" +
            "Locality: " +
            formData.locality +
            "\n" +
            "State: " +
            formData.state
        );

        // Reload the page when the "OK" button is clicked
        $(document).one("click", ".alert-button", function () {
          window.location.href = "./viewaccounts    .html";
        });
      },
      error: function (xhr, status, error) {
        console.error("There was an error creating the account:", error);
        alert(
          "There was an error creating the account. Please try again later."
        );
      },
    });
  }
  // Handler for form submission
  $("#user-details-form").submit(function (event) {
    event.preventDefault(); // Prevent the default form submission

    // Check if the age is less than 18 based on the date of birth
    var dob = new Date($("#dob").val());
    var today = new Date();
    var age = today.getFullYear() - dob.getFullYear();
    var monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
      age--;
    }

    // Show error message if age is less than 18
    if (age < 18) {
      $("#dobError").show();
      return; // Prevent form submission if age is less than 18
    }

    // If age is 18 or above, proceed with form submission
    var formData = {
      accountHolderName: $("#accountHolderName").val(),
      email: $("#email").val(),
      aadharNo: $("#aadharNo").val(),
      accountType: $("input[name='accountType']:checked").val(),
      dob: $("#dob").val(),
      phoneNo: $("#phoneNo").val(),
      balance:$('#deposit').val(),
      pincode: $("#pincode").val(),
      city: $("#city").val(),
      locality: $("#locality").val(),
      state: $("#state").val(),
    };

    createAccount(formData);
  });
});
