import React, { useEffect, useState } from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import {
  Grid,
  TextField,
  Button,
  Box,
  Typography,
  Divider,
  Stack,
  Link,
  Checkbox,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { Email, Lock, Visibility, VisibilityOff } from "@mui/icons-material"; // Import icons
import Logo from "../images/Zealous.png";
import { login } from "../connect";

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

  const responseGoogle = (response) => {
    console.log(response);
  };
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
      alert("Validation failed, retry!"); // Prevent submission if validation fails
    }

    const userData = {
      email,
      password,
    };

    try {
      const response = await login(userData);
      console.log("Response from server:", response.msg);

      sessionStorage.setItem("UserAuthToken", response.token);
      alert("Login credentials matched");
    } catch (error) {
      alert("Invalid credentials");
      console.error("Error:", error);
    }
  };

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
      {/* Top Left PNG Image */}
      <img
        src={Logo}
        alt="Logo"
        className="logo"
        style={{ width: "200px", height: "100px" }}
      />

      {/* Half-Circle Background */}
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

          @media (max-width: 480px) {
            .half-circle {
              display: none; /* Remove the half-circle on extra small screens */
            }
            .form-container {
              max-width: 300px; /* Adjust form width for small screens */
              padding: 16px; /* Reduce padding */
              margin-top: -20px;
            }

            dotlottie-player {
              margin-top: 50px; /* Remove top margin */
              margin-bottom: -50px; /* Remove bottom margin */
              height: 300px; /* Keep a fixed height */
            }

            .logo {
              width: 70%; /* Image occupies full screen width */
              height: auto; /* Keep height proportional to width */
              position: absolute;
              top: -20px;
              left: 70px; 
            }

            .typewriter {
              font-size: 1.1rem;
              margin-top: 0; /* Remove margin-top for closer alignment */
            }
          }

          .typewriter {
            overflow: hidden; /* Ensures the text is hidden until it appears */
            white-space: nowrap; /* Prevents text wrapping */
            width: 100%; /* Set to 100% for visibility after animation */
            animation: typing 4s steps(50, end) forwards; /* Cursor animation removed */
            visibility: visible; /* Keep the text visible */
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
            <b>LEARN, PRACTICE, IMPLEMENT, CAREER</b>
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
              onClick={handleSignIn} // Handle sign-in click
            >
              SIGN IN
            </Button>

            <Stack
              direction="row"
              alignItems="center"
              spacing={2}
              sx={{ my: 2 }}
            >
              <Divider sx={{ flex: 1 }} />
              <Typography variant="body2" color="textSecondary">
                OR
              </Typography>
              <Divider sx={{ flex: 1 }} />
            </Stack>

            <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
              <GoogleLogin
                onSuccess={responseGoogle}
                onFailure={responseGoogle}
                style={{
                  width: "100%",
                  marginTop: "8px",
                  borderRadius: "50px",
                }}
              />
            </GoogleOAuthProvider>

            <Typography align="center" sx={{ mt: 2 }}>
              Don't have an account?{" "}
              <Link href="/signup" style={{ color: "#fc7a46" }}>
                Sign up
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signin;
