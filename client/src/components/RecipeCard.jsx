/* eslint-disable react/prop-types */
import { Box, Typography, Button } from "@mui/material";
const RecipeCard = ({ image, title }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: 1,
        }}
      >
        <Box>
          <img src={image} alt="" />
        </Box>
        <Box>
          <Typography variant="body2" color="initial">
            {title}
          </Typography>
        </Box>
        <Box>
          <Button variant="outlined" color="primary">
            More Details
          </Button>
        </Box>
      </Box>
    </>
  );
};

export default RecipeCard;
