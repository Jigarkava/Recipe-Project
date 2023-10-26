import { Box, Button } from "@mui/material";
import { Link } from "react-router-dom";
import Logo from '../assets/Logo.png'
import { useDispatch } from "react-redux";
import { setLogout } from "../store/slices/authSlice";
import { useNavigate } from "react-router-dom";
const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // eslint-disable-next-line no-unused-vars
  const handleLogOut = () => {
    dispatch(setLogout());
    navigate("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        padding: "5px 45px",
        height: "67px",
        backgroundColor: "white",
        alignItems: "center",
        boxShadow: 3,
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        position: "fixed",
        mb: 80,
      }}
    >
      <Box>
        <Link to="/dashboard">
          <img src={Logo} alt="Logo" height={30} width={134} />
        </Link>
      </Box>

      <Box>
        <Button onClick={()=> navigate('/login')} variant="contained" color="primary">
          SignIn
        </Button>

        {/* <Button onClick={handleLogOut} variant="contained" color="primary">
          Signout
        </Button> */}
      </Box>
    </Box>
  );
};

export default Header;
