import React, { useState, useEffect } from "react";
import Chart from "react-apexcharts";
import { getMonthlySale } from "../../services/reportService";

const MonthlySaleChart = ({ height, width, branch_id }) => {
  const [saleSeries, setSaleSeries] = useState([
    {
      name: "September",
      data: Array.from({ length: 30 }, () => 0),
    },
  ]);

  const [loading, setLoading] = useState(false);

  const saleChartOptions = {
    chart: {
      type: "area",
      stacked: true,
      animations: {
        enabled: true,
        easing: "linear",
        speed: 1800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    colors: ["#CED4DC", "#00E396", "#008FFB"],
    dataLabels: {
      enabled: true,
    },
    stroke: {
      curve: "smooth",
    },
    fill: {
      type: "gradient",
      gradient: {
        opacityFrom: 0.6,
        opacityTo: 0.8,
      },
    },
    legend: {
      position: "top",
      horizontalAlign: "left",
    },
    xaxis: {
      categories: new Array(30).fill(0).map((_, i) => i + 1),
    },
  };

  async function fetchMonthlySale(yearMonth) {
    try {
      const { data } = await getMonthlySale(yearMonth, branch_id);
      let dayArray = Array.from({ length: 30 }, () => 0);
      data.forEach((item) => {
        dayArray[item.day.slice(8, 10) - 1] = item.total_sales;
      });
      return dayArray;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    const fetchData = async () => {
      const july = await fetchMonthlySale("2023-07");
      setSaleSeries([...saleSeries, { name: "July", month: 7, data: july }]);
      const august = await fetchMonthlySale("2023-08");
      setSaleSeries([
        ...saleSeries,
        { name: "August", month: 8, data: august },
      ]);
      const september = await fetchMonthlySale("2023-09");
      setSaleSeries([
        { name: "July", month: 7, data: july },
        { name: "August", month: 8, data: august },
        { name: "September", month: 9, data: september },
      ]);
      setLoading(false);
    };
    fetchData();
  }, [branch_id]);

  const loadChart = () => (
    <Chart
      options={saleChartOptions}
      series={saleSeries}
      height={height}
      width={width}
    />
  );

  return loading ? <div>Loading...</div> : loadChart();
};

export default MonthlySaleChart;
