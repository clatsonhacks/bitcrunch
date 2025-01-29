from fastapi import FastAPI
from pydantic import BaseModel
from datetime import datetime, timedelta
import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import requests
import os
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()
API_KEY = os.getenv("API_KEY")

app = FastAPI()

# Hello page
@app.get("/")
def read_root():
    return {"message": "Hello! FastAPI is running successfully 🎉"}

class TimestampData(BaseModel):
    year: int
    month: int
    day: int
    hour: int
    minute: int

class PredictionRequest(BaseModel):
    contract_address: str
    timestamp_data: TimestampData

def apiFetching(contract_address):
    url = f"https://api.unleashnfts.com/api/v2/nft/transactions?blockchain=ethereum&time_range=90d&contract_address={contract_address}&offset=0&limit=100"

    headers = {
        "accept": "application/json",
        "x-api-key": API_KEY  # Using API key from .env
    }

    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame(data['data'])
    else:
        print("Failed to retrieve data, status code:", response.status_code)
        return None

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

    df = df.drop(columns=['timestamp'])
    return df

def priceDetect(df):
    X = df[['year', 'month', 'day', 'hour', 'minute']]  
    y = df['sale_price_usd']

    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

    model = RandomForestRegressor(random_state=42, n_estimators=100)
    model.fit(X_train, y_train)
    print("Model training complete.")

    y_pred = model.predict(X_test)
    mse = mean_squared_error(y_test, y_pred)
    print(f"Mean Squared Error: {mse}")
    return model

@app.post("/predicted_prices/")
def get_predicted_prices(request: PredictionRequest):
    contract_address = request.contract_address
    timestamp_data = request.timestamp_data

    future_timestamp = datetime(
        timestamp_data.year,
        timestamp_data.month,
        timestamp_data.day,
        timestamp_data.hour,
        timestamp_data.minute
    )

    df = apiFetching(contract_address)

    if df is not None:
        dataFrame = preProcessing(df)
        model = priceDetect(dataFrame)

        timestamps_hours = [future_timestamp + timedelta(hours=i) for i in range(-5, 6)]
        data_hours = {
            "year": [ts.year for ts in timestamps_hours],
            "month": [ts.month for ts in timestamps_hours],
            "day": [ts.day for ts in timestamps_hours],
            "hour": [ts.hour for ts in timestamps_hours],
            "minute": [ts.minute for ts in timestamps_hours]
        }
        df_hours = pd.DataFrame(data_hours)
        predicted_prices_hours = model.predict(df_hours)

        timestamps_days = [future_timestamp + timedelta(days=i) for i in range(-5, 6)]
        data_days = {
            "year": [ts.year for ts in timestamps_days],
            "month": [ts.month for ts in timestamps_days],
            "day": [ts.day for ts in timestamps_days],
            "hour": [ts.hour for ts in timestamps_days],
            "minute": [ts.minute for ts in timestamps_days]
        }
        df_days = pd.DataFrame(data_days)
        predicted_prices_days = model.predict(df_days)

        response = {
            "predicted_prices_hours": [{str(ts): float(price)} for ts, price in zip(timestamps_hours, predicted_prices_hours)],
            "predicted_prices_days": [{str(ts): float(price)} for ts, price in zip(timestamps_days, predicted_prices_days)]
        }
        return response
    else:
        return {"message": "Failed to fetch data"}
