"use client";

import { useEffect, useState } from "react";
import { TrendingUp } from "lucide-react";
import {
  CartesianGrid,
  Line,
  LineChart,
  XAxis,
  YAxis,
  Bar,
  BarChart,
} from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import Globalapi from "@/_utils/Globalapi";

export default function LineGraph({address}) {
  const [transactionData, setTransactionData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDataFetched, setIsDataFetched] = useState(false); // Track if data was successfully fetched
  const contractAddress = address;
  console.log(contractAddress);

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        accept: "application/json",
        "x-api-key": process.env.NEXT_PUBLIC_BITSCRUNCH_API_KEY,
      },
    };
    console.log(options);
    // Fetch data only if it has not been fetched before
    if (!isDataFetched) {
      fetch(
        `https://api.unleashnfts.com/api/v2/nft/transactions?blockchain=ethereum&time_range=24h&contract_address=${contractAddress}&offset=0&limit=30`,
        options
      )
        .then((res) => res.json())
        .then((res) => {
          // Process the data for the charts
          const processedData = res.data.map((transaction) => ({
            timestamp: transaction.timestamp, // Full timestamp (used for X-Axis)
            sale_price_usd: transaction.sale_price_usd, // Sale price in USD (used for Y-Axis)
          }));

          // Only update the data if it's the first successful fetch
          if (!isDataFetched) {
            setTransactionData(processedData);
            setLoading(false);
            setIsDataFetched(true); // Mark that the data has been fetched
          }
        })
        .catch((err) => {
          console.error("Error fetching API data:", err);
          setLoading(false);
        });
    }
  }, [isDataFetched]); // Dependency on isDataFetched ensures fetch is attempted only once

  const chartConfig = {
    salePrice: {
      label: "Sale Price (USD)",
      color: "hsl(var(--chart-1))",
    },
  };

  return (
    <div className="carousel carousel-vertical rounded-box h-40 mx-8">
      <Card>
        <CardHeader>
          <CardTitle className='text-purple-600 font-bold text-xl'>Sale Price Comparison Graph</CardTitle>
          <CardDescription className='text-blue-600 font-bold text-sm'>Last 24 Hours</CardDescription>
        </CardHeader>
        <CardContent>

          {loading ? (
            <p>Loading...</p>
          ) : (
            <ChartContainer config={chartConfig} className='text-white' >
              <LineChart
                accessibilityLayer
                width={400}
                height={200}
                data={transactionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                  dataKey="timestamp"
                  tickLine={false}
                  axisLine={false}
                  tickMargin={8}
                  tick={{ fill: "white" }}

                />
                <YAxis />
                <ChartTooltip
                  cursor={{ strokeDasharray: "3 3" }}
                  content={<ChartTooltipContent />}
                />
                <Line
                  type="monotone"
                  dataKey="sale_price_usd"
                  stroke="var(--color-salePrice)"
                  strokeWidth={2}
                  dot={false}
                />
              </LineChart>
            </ChartContainer>
           
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by {transactionData.length > 0 ? "8.1%" : "N/A"} today{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing real-time transaction data for the last 24 hours.
          </div>
        </CardFooter>
      </Card>


      {/* Bar Chart */}
      <Card>
        <CardHeader>
          <CardTitle className='text-purple-600 font-bold text-xl'>Bar Chart - Sale Price Metrics</CardTitle>
          <CardDescription className='text-blue-600 font-bold text-sm'>Last 24 Hours</CardDescription>
        </CardHeader>
        <CardContent  >
          {loading ? (
            <p>Loading...</p>
          ) : (
            <ChartContainer config={chartConfig}>
              <BarChart
                accessibilityLayer
                data={transactionData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
                width={400}
              >
                <CartesianGrid vertical={false} />
                <XAxis
                  dataKey="timestamp"
                  tickLine={false}
                  tickMargin={10}
                  axisLine={false}
                  tick={{ fill: "white" }}
                />
                <ChartTooltip
                  cursor={false}
                  content={<ChartTooltipContent indicator="dashed" />}
                />
                <Bar
                  dataKey="sale_price_usd"
                  fill="var(--color-salePrice)"
                  radius={4}
                />
              </BarChart>
            </ChartContainer>
          )}
        </CardContent>
        <CardFooter className="flex-col items-start gap-2 text-sm">
          <div className="flex gap-2 font-medium leading-none">
            Trending up by {transactionData.length > 0 ? "8.1%" : "N/A"} today{" "}
            <TrendingUp className="h-4 w-4" />
          </div>
          <div className="leading-none text-muted-foreground">
            Showing real-time transaction data for the last 24 hours.
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}