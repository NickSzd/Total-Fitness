function editProfileForm() {
  const form = document.getElementById("profileForm");
  form.addEventListener("submit", function (event) {
    //event.preventDefault(); // Prevent form submission

    // Get the input values
    const newEmail = document.getElementById("email").value;
    const newHeight = document.getElementById("height").value;

    // Validate the input values (optional)
    if (!newEmail || !newHeight) {
      alert("Please fill in all fields");
      return;
    }

    // Perform any additional validation if needed

    // Update the user's email and height
    updateUserProfile(newEmail, newHeight);

    // Clear the form inputs
    form.reset();

    // Display a success message
    alert("Profile updated successfully");
  });

  // Function to update the user's email and height
  function updateUserProfile(email, height) {
    // Perform the necessary steps to update the user's profile
    // This can include making an API request or updating a database
    // For demonstration purposes, we'll just log the values
    console.log("New Email:", email);
    console.log("New Height:", height);
  }

  return (
    <div className="editProfileForm">
      <h1>User Profile Form</h1>
      <form id="profileForm">
        <label for="email">Email:</label>
        <input type="email" id="email" required></input>
        <br></br>
        <label for="heightFT"></label>
        <input type="number" id="heightFT" required></input>
        <br></br>
        <label for="heightIn"></label>
        <input type="number" id="heightIn" required></input>
        <br></br>
        <button type="submit">submit</button>
      </form>

      <script defer></script>
    </div>
  );
}

export default editProfileForm;
