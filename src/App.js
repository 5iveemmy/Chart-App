import React, { useEffect, useState } from "react";
import Chart from "react-apexcharts";
import axios from "axios";

const App = () => {
  const [data, setData] = useState([]);
  const [chartData, setchartData] = useState({});

  useEffect(() => {
    const options = {
      method: "GET",
      url: "https://imdb8.p.rapidapi.com/actors/get-awards",
      params: { nconst: "nm0001667" },
      headers: {
        "x-rapidapi-host": "imdb8.p.rapidapi.com",
        "x-rapidapi-key": "730d0e5c7bmshad1255dc9b8ad39p1e833fjsnc5e1c8b1c4dc",
      },
    };

    axios
      .request(options)
      .then(function ({ data: { resource } }) {
        console.log(resource?.awards);
        setData(resource?.awards);
        const years = data?.map((x) => x.year);
        const yearsCount = {};

        for (const year of years) {
          if (yearsCount[year]) {
            yearsCount[year] += 1;
          } else {
            yearsCount[year] = 1;
          }
        }
        console.log(yearsCount);
        setchartData(yearsCount);
      })
      .catch(function (error) {
        console.error(error);
      });
  });

  return (
    <>
      {data.length > 0 ? (
        <Chart
          type="bar"
          options={{
            chart: {
              id: "mira-chart",
            },
            xaxis: {
              categories: Object.keys(chartData),
            },
          }}
          series={[
            {
              name: "Count",
              data: Object.values(chartData),
            },
          ]}
        />
      ) : (
        <div>Loading bitches</div>
      )}
    </>
  );
};

export default App;
