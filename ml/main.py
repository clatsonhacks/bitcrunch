from fastapi import FastAPI
from pydantic import BaseModel
import pandas as pd
import requests
from sklearn.model_selection import train_test_split
from sklearn.ensemble import RandomForestRegressor
from dotenv import load_dotenv
import os

# Load environment variables
load_dotenv()

# Get the API key from the .env file
API_KEY = os.getenv("API_KEY")

app = FastAPI()

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
        "x-api-key": API_KEY  # Use the API key from the .env file
    }
    response = requests.get(url, headers=headers)

    if response.status_code == 200:
        data = response.json()
        df = pd.DataFrame(data['data'])
    else:
        raise Exception(f"Failed to fetch data: {response.status_code}")
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
    return model

# Add a Hello Page
@app.get("/")
async def hello_page():
    return {"message": "Hello, World!"}
    
@app.post("/predict/")
async def predict_price(request: PredictionRequest):
    df = apiFetching(request.contract_address)
    dataFrame = preProcessing(df)
    model = priceDetect(dataFrame)
    future_data = {
        "year": [request.timestamp_data.year],
        "month": [request.timestamp_data.month],
        "day": [request.timestamp_data.day],
        "hour": [request.timestamp_data.hour],
        "minute": [request.timestamp_data.minute]
    }
    df_future = pd.DataFrame(future_data)
    predicted_price = model.predict(df_future)
    return {"predicted_price": predicted_price[0]}
