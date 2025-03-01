const registrationForm = document.getElementById("registration-form");
registrationForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const fullname = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const password = document.getElementById("password").value.trim();


  // Send data to server
  try {
    const response = await fetch('/registration', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        fullname: fullname,
        email: email,
        contact: contact,
        password: password
      }),
    });

    const result = await response.json();
    
    if (response.ok) {
     alert("Registration Successful")
    //   setTimeout(() => {
    //     window.location.href = '/login';
    //   }, 6000); // Redirect after 10 seconds
    } else {
      alert("Registration Failed")
    }

  } catch (error) {
    displayFloatingCard('An error occurred. Please try again later.', 'error');
  }
  
});