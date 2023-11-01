/* eslint-disable react/prop-types */
import { Box, Typography, Button, Paper } from "@mui/material";

const RecipeCard = ({ image, recipeName, handleClick }) => {
  return (
    <Paper
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 368,
        borderRadius: 6,
        boxShadow: 1,
      }}
    >
      <Box
        sx={{
          width: "100%",
          height: "250px", // Set a fixed height for the image container
          overflow: "hidden", // Hide any overflowing content
        }}
      >
        <img
          src={image}
          alt="Recipe"
          style={{
            width: "100%",
            objectFit: "cover",
            height: "100%",
            borderRadius: "18px",
          }}
        />
      </Box>
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 1,
          padding: 2,
        }}
      >
        <Typography variant="body2" color="initial">
          {recipeName}
        </Typography>
        <Button variant="outlined" color="primary" onClick={handleClick}>
          More Details
        </Button>
      </Box>
    </Paper>
  );
};

export default RecipeCard;
