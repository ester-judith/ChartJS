import React, { useState, useEffect } from "react";
import {
    Chart as ChartJS,
    CategoryScale, 
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip, 
    Legend,
} from 'chart.js';
import { Line } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

const LineChart = () => {
    const [chart, setChart] = useState({});
    const baseUrl = "https://api.coinranking.com/v2/coins/?limit=10";
    const proxyUrl = "https://cors-anywhere.herokuapp.com/";
    const apiKey = "coinranking4ecbe4fdcd5141daadc0efd2d3fbd035d028aba0cd16eda2";

    useEffect(() => {
        const fetchCoins = async () => {
            await fetch(`${proxyUrl}${baseUrl}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-access-token': `${apiKey}`,
                    'Access-Control-Allow-Origin': "*"
                }
            })
            .then((response) => {
                if (response.ok) {
                    response.json().then((json) => {
                        console.log(json.data);
                        setChart(json.data);
                    });
                }
            }).catch((error) => {
                console.log(error);
            });
        };
        fetchCoins();
    }, [baseUrl, proxyUrl, apiKey]);
    
    console.log("chart", chart);

    const data = {
        labels: chart?.coins?.map(x => x.name),
        datasets: [{
            label: `${chart?.coins?.length} Coins Available`,
            data: chart?.coins?.map(x => x.price),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1
        }]
    };
    
    const options = {
        maintainAspectRatio: false,
        scales: {},
        plugins: {
            legend: {
                labels: {
                    fontSize: 25,
                },
            },
        },
    };
    
    return (
        <div>
            <Line
                data={data}
                height={400}
                options={options}
            />
        </div>
    );
}

export default LineChart;
