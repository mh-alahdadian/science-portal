import { Link as RouterLink } from 'react-router-dom';
import { Button } from "@mui/material";
import logoImage from "../../assets/images/logo.png";

function Logo ({ sx, maxHeight }) {
  return (
    <Button component={ RouterLink } to="/" sx={{ style, ...sx }}>
      <img src={logoImage} alt="Stinas Logo" style={{ maxHeight: maxHeight || '50px' }} />
    </Button>
  );
}

export default Logo;
const style = {
  "&:hover": {
    backgroundColor: "transparent",
  },
}