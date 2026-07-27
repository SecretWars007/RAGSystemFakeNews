from fastapi import FastAPI


app = FastAPI(
    title="FakeNewsRAGSystem API",
    version="1.0.0"
)


@app.get("/")
def health():

    return {
        "application": "FakeNewsRAGSystem",
        "status": "running"
    }