import {
  Box,
  Typography,
  Grid,
  TextField,
  Button,
  Paper,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import loginSchema from "../../schemas/Login/LoginSchema";
import { useDispatch } from "react-redux";
import { adminLogin } from "../../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const getToken = localStorage.getItem("token");
    if (getToken) {
      navigate("/dashboard");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handlePasswordChange = () => {
    setShowPassword(!showPassword);
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "all",
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = (data) => {
    dispatch(adminLogin(data))
      .unwrap()
      .then((response) => {
        const token = response.headers.authorization;
        localStorage.setItem("token", token);
        toast.success("Login Successful");
        reset();
        navigate("/dashboard", { replace: true });
      })
      .catch((err) => {
        toast.error(err.message);
      });
  };

  return (
    <>
      <Box
        sx={{
          backgroundColor: "#eef2f6",
          height: "87vh",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Paper elevation={2} sx={{ width: "450px", borderRadius: "8px" }}>
          <Box m={5}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={3} justifyContent={"center"}>
                <Grid item sm={12}>
                  <Typography
                    variant="h4"
                    color="purple"
                    textAlign={"center"}
                    p={2}
                  >
                    Welcome Admin
                  </Typography>
                </Grid>
                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    id="email"
                    label="Email"
                    {...register("email")}
                    error={!!errors.email}
                    helperText={errors.email?.message}
                  />
                </Grid>

                <Grid item sm={12}>
                  <TextField
                    fullWidth
                    id="password"
                    label="Password"
                    type={showPassword ? "text" : "password"}
                    {...register("password", {
                      required: "Please Enter password",
                    })}
                    error={!!errors.password}
                    helperText={errors.password?.message}
                    InputProps={{
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton onClick={handlePasswordChange}>
                            {showPassword ? (
                              <VisibilityOffIcon />
                            ) : (
                              <VisibilityIcon />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    }}
                  />
                </Grid>

                <Grid item sm={12}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="secondary"
                    fullWidth
                  >
                    Sign in
                  </Button>
                </Grid>
              </Grid>
            </form>
          </Box>
        </Paper>
      </Box>
    </>
  );
};

export default Login;
