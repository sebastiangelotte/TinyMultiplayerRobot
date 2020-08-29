import React, { useEffect, useState } from "react";
import "./App.css";
import axios from "axios";
import FileDownload from "js-file-download";

function App() {
  const [playerID, setPlayerID] = useState("");
  const [gameID, setGameID] = useState("");
  const authKey = "A792RB6JB9SO";
  const methods = {
    auth: `/api/Diplomacy/AuthenticateUser?authKey=${authKey}`,
    getGamesAndPlayers: `/api/Diplomacy/GetGamesAndPlayers?playerIDText=${playerID}&authKey=${authKey}`,
    getLatestSave: `/api/Diplomacy/GetLatestSaveFileBytes?authKey=${authKey}&gameId=${gameID}`,
  };
  useEffect(() => {
    axios(methods.auth).then((res) => {
      setPlayerID(res.data);
      axios(methods.getGamesAndPlayers).then((res) => {
        setGameID(res.data.Games[0].GameId);
        console.log(methods.getLatestSave);
        axios(
          `/api/Diplomacy/GetLatestSaveFileBytes?authKey=${authKey}&gameId=${res.data.Games[0].GameId}`
        ).then((res) => {
          FileDownload(res.data, "save.Civ5Save");
        });
      });
    });
  }, []);
  return <div className="App">asd</div>;
}

export default App;
