# bitcrunch
The NFT Time Traveler: An AI agent that simulates “what if” scenarios by predicting how an NFT’s value would have changed if it had been bought or sold at different times.

# Steps to Run the Next.js Project Locally

Follow the steps below to set up and run the Next.js project on your local machine:

## 1. Download and Extract the Repository  
- Download the entire repository as a ZIP folder.  
- Extract the folder and open it in **VS Code**.

## 2. Open the Terminal  
- Open **VS Code** and launch the terminal.

## 3. Navigate to the Frontend Directory  
```sh
cd frontend
```

## 4. Install Dependencies  
```sh
npm i
```

## 5. Configure Environment Variables  
- Create a `.env` file in the `frontend` folder and add the following API keys:

```env
BITSCRUNCH_API_KEY=<your-api-key>
GROQ_API_KEY=<your-api-key>
NEXT_PUBLIC_BITSCRUNCH_API_KEY=<your-api-key>
```

## 6. Start the Development Server  
```sh
npm run dev
```
- The project will be available at **[localhost:3000](http://localhost:3000)**.
