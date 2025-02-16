import tarotCardData from "../data/tarotCardData";
import TarotCard from "../components/TarotCard";
import MyTarotProps from "../types/Tarot.type";
import { useState } from "react";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";
import useDisplayTarotInfo from "../hooks/displayTarotInfo";
import TarotCardDetails from "../components/TarotCardDetails";
import data from "../data/tarotCardData";
import Menu from "../components/Menu";
import { v4 as uuidv4 } from "uuid";

export const Deck = () => {
  // Bringing in the hook of useDisplayTarotInfo here, show number is 0, showHIde is false and getTarotInfo is a function that allows us to show and hide the information about the selected card.
  const [showNumber, showHide, setTarotInfo] = useDisplayTarotInfo(0);
  // selected suit is a variable that will change based on the click of the buttons at the top of the page. Selected state is the "setter" that will update it.

  // VerifiedCodingGarden: Oh okay you need to set your useState type useState<string | null>(null)
  const [selectedSuit, setSelectedState] = useState<string | null>(null);

  // filter by suit is the function that sorts the tarotCardData according to what selected suit from above is. It checks the data and filtesr out what card.suit matches selected suit.
  function filterBySuit(data: MyTarotProps[]) {
    return data.filter((card) => card.suit === selectedSuit);
  }
  function grabSelectedSuit(e: React.MouseEvent<HTMLButtonElement>) {
    setSelectedState(e.currentTarget.value);
  }

  function revealTarotInformation(cardNumber: number) {
    setTarotInfo(cardNumber);
  }
  const removeFirstCard = tarotCardData.tarotDeck.slice(1);

  const navigate = useNavigate();

  //This is doing the same as above but for just majors. we can refactor to make it less lines.

  // Below function is not currently working, something for another day.
  const selectedCards = filterBySuit(removeFirstCard).map(
    (tarotCard, index) => {
      return (
        <TarotCard
          key={uuidv4()}
          imageSrc={tarotCard.imageFileName}
          onClick={() =>
            revealTarotInformation(data.tarotDeck[tarotCard.id].id)
          }
        />
      );
    }
  );

  return (
    <div>
      <div>
        <Button buttonName="Home" onClick={() => navigate("/")}></Button>
        <Button value="Major" buttonName="Major" onClick={grabSelectedSuit}>
          Major Cards
        </Button>
        <Button value="Cups" buttonName="Cups" onClick={grabSelectedSuit}>
          Cups Cards
        </Button>
        <Button
          value="Pentacles"
          buttonName="Pentacles"
          onClick={grabSelectedSuit}
        >
          Cups Cards
        </Button>
        <Button value="Swords" buttonName="Swords" onClick={grabSelectedSuit}>
          Cups Cards
        </Button>
        <Button value="Wands" buttonName="Wands" onClick={grabSelectedSuit}>
          Cups Cards
        </Button>
        <div className="grid grid-cols-7 gap-4"> {selectedCards} </div>
      </div>

      {showHide && (
        <div>
          <div className="# ">
            <TarotCardDetails data={data.tarotDeck[showNumber]} />
          </div>
          <div className="">
            <Button
              buttonName="Close"
              onClick={() => setTarotInfo(showNumber)}
            ></Button>
          </div>
        </div>
      )}
      <Menu />
    </div>
  );
};
// arthvadrr: Probably want to utilize state, then have buttons update state, and then render components conditionally based on that state
