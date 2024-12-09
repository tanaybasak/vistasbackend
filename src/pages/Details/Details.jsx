import { Box, Grid2 } from "@mui/material";
import imgDetails from "../../assets/details.svg";
import Form from "../../components/Forms/Form";
import CONST from "../../constants";

function Details() {
  return (
    <Box className="plr-5">
      <Grid2 container spacing={2}>
        <Grid2 size={{ xs: 6, md: 5 }}>
          <img src={imgDetails} alt="call" width={'700px'} height={'700px'} />
        </Grid2>
        <Grid2 size={{ xs: 6, md: 7 }} className="font-bold p-2">
            <Form category_one={CONST.texture} category_two={CONST.corners}/>
        </Grid2>
      </Grid2>
    </Box>
  );
}

export default Details;
