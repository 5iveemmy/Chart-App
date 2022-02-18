import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const App = () => {
  const [category, setCategory] = useState([]);
  const [data, setData] = useState([]);

  useEffect(() => {
    const year = [];
    const count = [];

    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/actors/get-awards",
      params: { nconst: "nm0001667" },
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "c64538c0e3msh7c9379f641df305p18061djsncb2135f14de5",
      },
    };

    axios
      .request(options)
      .then(function (response) {
        console.log(response.data);
        response.data.awards[0].map((item) => {
          year.push(item.year);
        });
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  return (
    <Chart
      options={{
        chart: {
          id: "mira-chart",
        },
        xaxis: {
          // categories: category
        },
      }}
      series={[{}]}
    />
  );
};

export default App;
