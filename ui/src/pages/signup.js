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
  InputAdornment,
  IconButton,
  Alert,
} from "@mui/material";
import {
  Visibility,
  VisibilityOff,
  Person,
  Email,
  Phone,
  Lock,
} from "@mui/icons-material";
import Logo from "../images/Zealous.png";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    mobile: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);

  const responseGoogle = (response) => {
    console.log(response);
  };

  useEffect(() => {
    const script = document.createElement("script");
    script.src =
      "https://unpkg.com/@dotlottie/player-component@latest/dist/dotlottie-player.mjs";
    script.type = "module";
    document.body.appendChild(script);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    let newErrors = {};

    if (!formData.username) newErrors.username = "Username is required";
    if (!formData.email || !/\S+@\S+\.\S+/.test(formData.email))
      newErrors.email = "Valid email is required";
    if (!formData.mobile || !/^\d{10}$/.test(formData.mobile))
      newErrors.mobile = "Valid 10-digit mobile number is required";
    if (!formData.password) newErrors.password = "Password is required";
    if (formData.password !== formData.confirmPassword)
      newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      alert(Signup`Successful! \n${JSON.stringify(formData, null, 2)}`);
      setFormSubmitted(true);
    }
  };

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

  // Password Visibility Toggle for Confirm Password Field
  const renderConfirmPasswordVisibilityToggle = () => (
    <InputAdornment position="end">
      <IconButton
        onClick={() => setShowConfirmPassword((prev) => !prev)}
        edge="end"
        style={{ color: "#fc7a46" }}
      >
        {showConfirmPassword ? <Visibility /> : <VisibilityOff />}
      </IconButton>
    </InputAdornment>
  );

  return (
    <div
      style={{ position: "relative", minHeight: "100vh", overflow: "hidden" }}
    >
      <style>
        {`  
           /* Small Mobile Screens: Up to 360px */
@media (max-width: 360px) {
    .half-circle {
        display: none;
    }
         .lottie-container{
        margin-top :-1400px !important;
        }
    .form-container {
        max-width: 250px; /* Narrower form for small screens */
        padding: 12px; /* Reduced padding */
        margin-top: 230px; /* Adjusted top margin */
    }
    .logo {
        width: 90%; /* Slightly smaller logo */
        height: auto;
        position: absolute;
        left: 60px;
        margin-top: -30px; /* Adjusted margin */
    }
}

/* Medium Mobile Screens: 361px to 480px */
@media (min-width: 361px) and (max-width: 480px) {
    .half-circle {
        display: none;
    }
    .form-container {
        max-width: 300px; /* Adjust form width */
        padding: 16px; /* Reduce padding */
        margin-top: 260px;
    }
        .lottie-container{
        margin-top :-1450px !important;
        }
    .logo {
        width: 100%; /* Full-width logo */
        height: auto;
        position: absolute;
        left: 80px;
        margin-top: -35px;
    }
}

/* Large Mobile Screens: 481px to 600px */
@media (min-width: 481px) and (max-width: 768px) {
    .half-circle {
        display: none;
    }
    .form-container {
        max-width: 350px; /* Wider form */
        padding: 18px;
        margin-top: 300px !important; /* Adjusted top margin */
    }
    .logo {
        width: 100%; /* Logo occupies full width */
        height: auto;
        position: absolute;
        left: 100px;
        margin-top: -40px;
    }
        .lottie-container{
        margin-top :-1550px !important;
        width: 300px;
        margin-left:-200px;
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
        margin-top: 210px; /* Adjusted for smaller tablets */
    }
    dotlottie-player {
        height: 350px;
        margin-top: 40px;
        margin-bottom: -40px;
    }
    .logo {
        width: 75%; /* Reduced size for smaller screens */
        height: auto;
        position: absolute;
        left: 300px; /* Adjusted alignment */
        margin-top: -35px;
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
        margin-top: -180px;
    }
    dotlottie-player {
        height: 400px;
        margin-top: -100px;
        margin-bottom: -100px;
    }
    .logo {
        width: 80%; /* Larger for medium tablets */
        height: auto;
        position: absolute;
        left: 500px;
        top: 0;
        margin-top: -35px;
    }
    .typewriter {
        font-size: 1.5rem;
    }
}

/* Large Tablet Screens: 769px to 820px */
@media (min-width: 769px) and (max-width: 820px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 600px;
        padding: 32px;
        margin-top: 350px;
    }
    dotlottie-player {
        height: 550px;
        margin-top: -1100px !important;
        margin-bottom: -60px;
        margin-left: -100px;
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
}

@media (min-width: 770px) and (max-width: 899px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        max-width: 600px;
        padding: 32px;
        margin-top: 350px;
    }
    dotlottie-player {
        height: 550px;
        margin-top: -1050px !important;
        margin-bottom: -60px;
        margin-left: -100px !important;
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
}

/* Tablet Screens: 821px to 1024px */
@media (min-width: 821px) and (max-width: 1024px) {
    .half-circle {
        display: none; /* Remove the half-circle */
    }
    .form-container {
        min-width: 700px;
        min-height: 400px;
        padding: 32px;
        margin-top: 500px;
        margin-left: 40px;
    }
    dotlottie-player {
        height: 450px;
        margin-top: -550px;
        margin-bottom: -60px;
        margin-left: -600px;
        width:500px !important;
    }
    .logo {
        width: 90%;
        height: auto;
        position: relative;
        top: 0;
        left: 600px;
    }
}

              `}
      </style>
      <img
        src={Logo}
        alt="Logo"
        style={{
          position: "absolute",
          top: "16px",
          right: "16px",
          width: "200px",
          height: "100px",
          zIndex: 2,
        }}
        className="logo"
      />

      <div
        style={{
          position: "absolute",
          width: "100vh",
          height: "100vh",
          borderRadius: "50%",
          backgroundColor: "#0c83c8",
          top: "50%",
          right: "40%",
          transform: "translateY(-50%)",
          zIndex: 1,
          padding: "20%",
          paddingTop: "9%",
        }}
        className="half-circle"
      ></div>

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
              sx={{ color: "#fc7a46" }}
              gutterBottom
            >
              <b>SIGN UP</b>
            </Typography>

            {formSubmitted && (
              <Alert severity="success" sx={{ mb: 2 }}>
                Signup successful!
              </Alert>
            )}

            <TextField
              label="Username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              error={!!errors.username}
              helperText={errors.username}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Person />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              error={!!errors.email}
              helperText={errors.email}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Email />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Mobile Number"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
              error={!!errors.mobile}
              helperText={errors.mobile}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Phone />
                  </InputAdornment>
                ),
              }}
            />

            <TextField
              label="Password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              error={!!errors.password}
              helperText={errors.password}
              type={showPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment:
                  formData.password && renderPasswordVisibilityToggle(),
              }}
            />

            <TextField
              label="Confirm Password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              error={!!errors.confirmPassword}
              helperText={errors.confirmPassword}
              type={showConfirmPassword ? "text" : "password"}
              variant="outlined"
              fullWidth
              margin="dense"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start" style={{ color: "#fc7a46" }}>
                    <Lock />
                  </InputAdornment>
                ),
                endAdornment:
                  formData.confirmPassword &&
                  renderConfirmPasswordVisibilityToggle(),
              }}
            />

            <Button
              variant="contained"
              fullWidth
              sx={{ mt: 2, borderRadius: "50px", backgroundColor: "#fc7a46" }}
              onClick={handleSubmit}
            >
              SIGN UP
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
              />
            </GoogleOAuthProvider>

            <Typography align="center" sx={{ mt: 2 }}>
              Already have an account?{" "}
              <Link href="/" style={{ color: "#fc7a46" }}>
                Sign in
              </Link>
            </Typography>
          </Box>
        </Grid>

        <Grid
          item
          xs={12}
          md={6}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <div className="lottie-container">
            <dotlottie-player
              src="https://lottie.host/7d7bd372-b18a-4e59-8f83-b14085361089/0pJ3tTLgxM.json"
              background="transparent"
              speed="1"
              style={{
                width: "100%",
                maxWidth: "500px",
                transform: "translateX(90px)",
              }}
              loop
              autoplay
            />
          </div>
          <style jsx>{`
            @media (max-width: 480px) {
              .lottie-container {
                width: 60%;
                margin-top: -385%;
                margin-left: -50%;
              }
            }
          `}</style>
        </Grid>
      </Grid>
    </div>
  );
};

export default Signup;
