import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css";

const List = () => {
  const [apiData, setApiData] = useState([]);
  const [searchName, setSearchName] = useState("");

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    axios
      .get("https://api.npoint.io/20c1afef1661881ddc9c")
      .then((actualData) => {
        const players = actualData.data.playerList;
        players.sort((para, meter) => para.Value - meter.Value);
        return players;
      })
      .then((playersData) => {
        setApiData(playersData);
      });
  }

  return (
    <div className="main">
      <div className="input-container">
        <h1>Search Here...</h1>
        <input
          type="text"
          placeholder="Enter Players Name"
          onChange={(event) => {
            setSearchName(event.target.value);
          }}
        />
      </div>

      <div className="mainContainer">
        {apiData
          .filter((value) => {
            if (searchName === "") {
              return value;
            } else if (
              value.PFName.toLowerCase().includes(searchName.toLowerCase())
            ) {
              return value;
            } else if (
              value.TName.toLowerCase().includes(searchName.toLowerCase())
            ) {
              return value;
            }
          }).map((playersData) => {
          
            return (
              <>
                <div className="card " style={{width : '19rem'}}>
                  <img
                    src={`./player-images/${playersData.Id}.jpg`}
                    alt={`${playersData.PFName} `}
                  />
                  <div className="card-body">
                    <h5>{playersData.PFName}</h5>
                    <h5>{playersData.SkillDesc}</h5>
                    <h5>
                      <b>$</b> &nbsp;{playersData.Value}
                    </h5>
                  </div>
                </div>
              </>
            );
          })}
      </div>
    </div>
  );
};
export default List;
