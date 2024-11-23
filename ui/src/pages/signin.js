import React, { useEffect, useState } from "react";
import axios from 'axios';
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons
import Logo from "../images/Zealous.png";

const Signin = () => {
  const [email, setEmail] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: false, password: false });

  const renderPasswordVisibilityToggle = () => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowPassword((prev) => !prev)}
        edge="end"
        style={{ color: "#fc7a46" }}
      >
        {showPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );
  
  const validateForm = () => {
    const newErrors = {
      email: email.trim() === "",
      password: password.trim() === "",
    };
    setErrors(newErrors);
    return !newErrors.email && !newErrors.password;
  };

  const handleSignIn = async () => {
    if (!validateForm()) {
      return; // Prevent submission if validation fails
    }
    alert(`Email: ${email}\nPassword: ${password}`);
    const userData = {
      email,
      password,
    };
    const response = await axios.post("http://localhost:5000/users/login", userData);
    console.log(response.data)
    if (response && response.data) {
      sessionStorage.setItem("true", JSON.stringify(response.data));
      window.location.assign("/");
    }
  };

  const handleclear  = () =>{
    setEmail('')
    setPassword('')
  }

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      
      <img
        src={Logo}
        alt="Logo"
        className="logo"
        style={{ width: "200px", height: "100px" }}
      />

     
      <div
        className="half-circle"
        style={{
          position: "absolute",
          width: "100vh",
          height: "100vh",
          borderRadius: "50%",
          backgroundColor: "#0c83c8",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%) translateX(50%)",
          zIndex: 1,
          padding: "7%",
          paddingTop: "10%",
        }}
      ></div>

      {/* Media Query for Smaller Devices */}
      <style>
        {`
          .logo {
            position: absolute;
            top: 15px;
            left: 16px;
            width: 150px; /* Width for large screens */
            height: 80px;
            z-index: 2;
          }

          @media (max-width: 768px) {
            .half-circle {
              display: none; /* Remove the half-circle on small screens */
            }
            .form-container {
              max-width: 300px; /* Adjust form width for small screens */
              padding: 16px; /* Reduce padding */
              margin-top: 16px;
            }

            .logo {
              width: 100%; /* Make image take full width of screen */
              height: auto; /* Maintain aspect ratio without increasing height */
            }
          }

          /* Small Mobile Screens: Up to 360px */
@media (max-width: 360px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 250px; /* Further adjust form width */
        padding: 12px; /* Reduce padding more */
        margin-top: -10px;
    }
    dotlottie-player {
        margin-top: 40px;
        margin-bottom: -40px;
        height: 250px; /* Adjust height for smaller screens */
    }
    .logo {
        width: 60%; /* Adjust logo size */
        height: auto;
        position: absolute;
        top: -10px;
        left: 50px;
    }
    .typewriter {
        font-size: 1rem; /* Slightly smaller font size */
        margin-top: 0; /* Keep margin-top aligned */
    }
}

/* Medium Mobile Screens: 361px to 480px */
@media (min-width: 361px) and (max-width: 480px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 300px; /* Adjust form width */
        padding: 16px;
        margin-top: -20px;
    }
    dotlottie-player {
        margin-top: 50px;
        margin-bottom: -50px;
        height: 300px;
    }
    .logo {
        width: 70%;
        height: auto;
        position: absolute;
        top: -20px;
        left: 70px;
    }
    .typewriter {
        font-size: 1.1rem;
        margin-top: 0; /* Remove margin-top for closer alignment */
    }
}

/* Large Mobile Screens: 481px to 768px */
@media (min-width: 481px) and (max-width: 768px) {
    .half-circle {
        display: block; /* Show the half-circle */
    }
    .form-container {
        max-width: 400px; /* Adjust form width */
        padding: 20px;
        margin-top: 0; /* Normal margin for large screens */
    }
    dotlottie-player {
        margin-top: 60px;
        margin-bottom: -60px;
        height: 350px;
    }
    .logo {
        width: 80%; /* Larger logo */
        height: auto;
        position: relative;
        top: 0;
        left: 0; /* Center the logo */
    }
    .typewriter {
        font-size: 1.3rem; /* Larger font size */
        margin-top: 10px; /* Adjust margin for alignment */
    }
}

/* Small Tablet Screens: 481px to 600px */
@media (min-width: 481px) and (max-width: 600px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 450px;
        padding: 24px;
    }
    dotlottie-player {
        height: 350px;
        margin-top: 40px;
        margin-bottom: -40px;
    }
    .logo {
        width: 75%;
        top: -10px;
        left: 20px;
    }
    .typewriter {
        font-size: 1.4rem;
    }
}

/* Medium Tablet Screens: 601px to 768px */
@media (min-width: 601px) and (max-width: 768px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 500px;
        padding: 28px;
        margin-top: 20px;
    }
    dotlottie-player {
        height: 400px;
        margin-top: -100px;
        margin-bottom: -100px;
    }
    .logo {
        width: 80%;
        top: 0;
        left: 0;
    }
    .typewriter {
        font-size: 1.5rem;
    }
}
    @media (min-width: 770px) and (max-width: 820px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 600px;
        padding: 32px;
        margin-top: 0px;
    }
    dotlottie-player {
        height: 550px;
        margin-top: 50px !important;
        margin-bottom: 60px;
        margin-left: 0px !important;
    }
    .logo {
        width: 90%;
        height: auto;
        position: relative;
        left: 550px;
        margin-top: -25px;
    }
        dotlottie-player {
        height: 400px;
        margin-top: -100px;
        margin-bottom: -100px;
    }
         .typewriter {
        font-size: 1.5rem;
    }
}

@media (min-width: 821px) and (max-width: 900px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 600px;
        padding: 32px;
        margin-top: 20px !important;
        margin-left:30px !important;
    }
    dotlottie-player {
        height: 550px;
        margin-top: 0px !important;
        margin-bottom: 60px;
        margin-left: 0px !important;
    }
    .logo {
        width: 90%;
        height: auto;
        position: relative;
        left: 550px;
        margin-top: -25px;
    }
        dotlottie-player {
        height: 400px;
        margin-top: -100px;
        margin-bottom: -100px;
    }
         .typewriter {
        font-size: 1.5rem;
        margin-left:30px !important;
    }
}


/* Large Tablet Screens: 769px to 1024px */
@media (min-width: 769px) and (max-width: 820px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 600px;
        padding: 32px;
    }
    dotlottie-player {
        height: 450px;
        margin-top: 60px;
        margin-bottom: -60px;
    }
    .logo {
        width: 90%;
        top: 0;
        left: 0;
    }
    .typewriter {
        font-size: 1.6rem;
    }
}


/* Tablet Screens: 821px to 1024px */
@media (min-width: 821px) and (max-width: 1024px) {
     .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        min-width: 700px;
        min-height : 400px;
        padding: 32px;
        margin-top: 500px;
        margin-left : -380px;
    }
    dotlottie-player {
        height: 450px;
        margin-top: -550px;
        margin-bottom: -60px;
        margin-left : 500px;
    }
    .logo {
        width: 90%;
        top: 0;
        left: 0;
    }
    .typewriter {
        font-size: 1.6rem;
        margin-left : 500px;
    }
}
          @keyframes typing {
            from { width: 0; }
            to { width: 100%; }
          }
        `}
      </style>

      <Grid
        container
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: "100vh",
          padding: { xs: "8px", sm: "16px" },
          position: "relative",
          zIndex: 2,
        }}
      >
        {/* Left Side: Lottie Animation */}
        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            marginBottom: { xs: 2, md: 0 },
            flexDirection: "column", // Stack items vertically
          }}
        >
          <dotlottie-player
            src="https://lottie.host/4cd76122-2bec-45c5-8904-4a0ab33b2d61/X6HOdRmTUz.json"
            background="transparent"
            speed="1"
            style={{ width: "100%", maxWidth: "500px", height: "auto" }} // Set a fixed height
            loop
            autoplay
            className="gif"
          ></dotlottie-player>

          {/* Typewriter Text Below the Player */}
          <Typography
            variant="h5"
            align="center"
            sx={{ mt: 0, color: "#fc7a46", fontFamily: "Cardo" }}
            className="typewriter"
          >
            <b>LEARN, PRACTICE, IMPLEMENT,CAREER</b>
          </Typography>
        </Grid>

        {/* Right Side: Sign-in Form */}
        <Grid item xs={12} md={6}>
          <Box
            className="form-container"
            sx={{
              width: "100%",
              maxWidth: 400,
              padding: 4,
              borderRadius: 10,
              backgroundColor: "white",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              margin: "auto",
            }}
          >
            <Typography
              variant="h4"
              align="center"
              sx={{ color: "#fc7a46", fontFamily: "Cardo" }}
              gutterBottom
            >
              <b>SIGN IN</b>
            </Typography>

            <TextField
              label="Email"
              variant="outlined"
              type="email"
              fullWidth
              margin="dense"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              error={errors.email}
              helperText={errors.email ? "Email is required" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Email />
                  </InputAdornment>
                ),
              }}
            />
            <TextField
              label="Password"
              variant="outlined"
              fullWidth
              margin="dense"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              error={errors.password}
              helperText={errors.password ? "Password is required" : ""}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment: password && renderPasswordVisibilityToggle(),
              }}
            />

            <Box display="flex" alignItems="center" marginTop={1}>
              <Checkbox style={{ color: "#fc7a46" }} />
              <Typography variant="body2" marginLeft={1}>
                Keep me logged in
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: "50px", backgroundColor: "#fc7a46" }}
              onClick={handleSignIn} 
              // Handle sign-in click
            >
              SIGN IN
            </Button>
            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: "50px", backgroundColor: "#fc7a46" }}
              onClick={handleclear} 
              // Handle sign-in click
            >
              CLEAR
            </Button>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
