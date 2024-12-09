import { Outlet } from "react-router-dom";
import CardBrand from "../../components/Card";
import visitingImg from '../../assets/image.svg';
import letterhead from '../../assets/image1.svg';
import notebook from '../../assets/image2.svg';
import notepad from '../../assets/image3.svg';
import envelop from '../../assets/image4.svg';
import './Branding.css';

const cardData = [
  { id: 1, title: "VISITING CARD", description: "This is Brand 1", image: visitingImg },
  { id: 2, title: "LETTERHEAD", description: "This is Brand 2", image: letterhead },
  { id: 3, title: "NOTEBOOK", description: "This is Brand 3", image: notebook },
  { id: 4, title: "NOTEPAD", description: "This is Brand 4", image: notepad },
  { id: 5, title: "PRESENTATION FOLDERS", description: "This is Brand 4", image: visitingImg },
  { id: 5, title: "ID CARD", description: "This is Brand 4", image: letterhead },
  { id: 5, title: "FLIP DESK CALENDAR", description: "This is Brand 4", image: visitingImg },
  { id: 7, title: "ENVELOP", description: "This is Brand 4", image: envelop },

];

function Branding() {
  return (
    <>
      <div className="branding_container">
        {cardData.map((card) => (
          <div className="grid-item" key={card.id}>
            <CardBrand title={card.title} description={card.description} img={card.image} />
          </div>
        ))}
      </div>
      <Outlet />
    </>
  );
}

export default Branding;
