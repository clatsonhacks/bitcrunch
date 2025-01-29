from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import pandas as pd
import json
import requests
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
from dotenv import load_dotenv
import os

# Load environment variables from .env file
load_dotenv()

# Fetch the API_KEY from environment variables
API_KEY = os.getenv("API_KEY")

app = FastAPI()

class ContractAddress(BaseModel):
    contract_address: str

@app.get("/")
def hello_page():
    return {"message": "Hello! Welcome to the NFT Data Processing API"}

@app.post("/process-data")
def process_data(contract_address: ContractAddress):
    df = apiFetching(contract_address.contract_address)
    if not df.empty:
        data_frame = preProcessing(df)
        model = trainPriceModel(data_frame)
        best_buy, best_sell = bestTimeToBuySell(data_frame)
        risk_score = calculateRisk(data_frame)
        return {
            "message": "Data processed successfully.",
            "best_day_to_buy": best_buy.to_dict(),
            "best_day_to_sell": best_sell.to_dict(),
            "risk_score": risk_score
        }
    else:
        raise HTTPException(status_code=404, detail="Empty DataFrame returned.")

def apiFetching(contract_address):
    url = f"https://api.unleashnfts.com/api/v2/nft/transactions?blockchain=ethereum&time_range=90d&contract_address={contract_address}&offset=0&limit=100"
    headers = {
        "accept": "application/json",
        "x-api-key": API_KEY  # Use the API_KEY from the .env file
    }

    response = requests.get(url, headers=headers)
    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame(data['data'])
    else:
        print("Failed to retrieve data, status code:", response.status_code)
        df = pd.DataFrame()

    return df

def preProcessing(df):
    df = df[['timestamp', 'sale_price_usd']]
    df = df[df['sale_price_usd'] > 0]
    df['timestamp'] = pd.to_datetime(df['timestamp'])
    df['year'] = df['timestamp'].dt.year
    df['month'] = df['timestamp'].dt.month
    df['day'] = df['timestamp'].dt.day
    df['hour'] = df['timestamp'].dt.hour
    df['minute'] = df['timestamp'].dt.minute
    df = df.sort_values(by='timestamp')
    df['rolling_avg_price'] = df['sale_price_usd'].rolling(window=3, min_periods=1).mean()
    return df

def trainPriceModel(df):
    X = df[['year', 'month', 'day', 'hour', 'minute', 'rolling_avg_price']]
    y = df['sale_price_usd']
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    model = RandomForestRegressor(n_estimators=100, random_state=42)
    model.fit(X_train, y_train)
    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f"Mean Squared Error: {mse}")
    return model

def bestTimeToBuySell(df):
    daily_avg = df.groupby(['year', 'month', 'day'])['sale_price_usd'].mean().reset_index()
    best_day_to_buy = daily_avg.loc[daily_avg['sale_price_usd'].idxmin()]
    best_day_to_sell = daily_avg.loc[daily_avg['sale_price_usd'].idxmax()]
    return best_day_to_buy, best_day_to_sell

def calculateRisk(df):
    df['price_change'] = df['sale_price_usd'].pct_change().fillna(0)
    df['volatility'] = df['price_change'].rolling(window=3, min_periods=1).std()
    avg_risk = df['volatility'].mean()
    return avg_risk

# Run with: uvicorn filename:app --reload
