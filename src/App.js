import { useEffect, useState } from "react";
import './App.css';
import ImageCard from "./components/ImageCard/ImageCard";
import Navbar from "./components/Navbar/Navbar";
import HarryPotterCard from "./components/HarryPotter/HarryPotterCard";

function App() {
  const imagesURL = "https://picsum.photos/v2/list?page=2&limit=20";
  const harryPotterURL = "https://hp-api.onrender.com/api/characters";
  const [loading, setLoading] = useState(true);
  const [images, setImages] = useState([]);
  const [harryPotterData, setHarryPotterData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [imagesRes, harryPotterRes] = await Promise.all([
          fetch(imagesURL),
          fetch(harryPotterURL)
        ]);

        const imagesData = await imagesRes.json();
        const harryPotterData = await harryPotterRes.json();

        setImages(imagesData);
        setHarryPotterData(harryPotterData);
      } catch (error) {
        console.error("データの取得に失敗しました", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <div className="App">
        {loading ? (
          <h1>Loading...ロード中です。</h1>
        ) : (
          <div className="container">
            <div className="imageContainer">
              {images.map((image, index) => (
                <ImageCard key={index} image={image} />
              ))}
            </div>
            <div className="harryPotterContainer">
              {harryPotterData.map((character, index) => (
                <HarryPotterCard key={index} character={character} />
              ))}
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
