import { Container, Grid } from "@mui/material";
import RecipeCard from "../../components/RecipeCard";
const HomePage = () => {
  const cardData = [
    {
      id: 1,
      image: "image1.jpg",
      title: "Card 1",
      description: "Description for Card 1",
    },
    {
      id: 2,
      image: "image2.jpg",
      title: "Card 2",
      description: "Description for Card 2",
    },
  ];

  return (
    <>
      <Container>
        <Grid container spacing={3}>
          {cardData.map((card) => (
            <Grid item xs={12} sm={6} md={4} key={card.id}>
              <RecipeCard
                image={card.image}
                title={card.title}
                btnName={card.btnName}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </>
  );
};

export default HomePage;
