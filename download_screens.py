import urllib.request
import os

scratch_dir = r"C:\Users\HP VICTUS\.gemini\antigravity-ide\brain\daf39a1f-1c1e-412d-b4ca-b90e43cd91d3\scratch"
os.makedirs(scratch_dir, exist_ok=True)

files = {
    "login.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzdhY2VmYWJkYTUxNDQ4ZWE5MThiYmVjNmRhMGY0M2U5EgsSBxCv9JXu4wkYAZIBIwoKcHJvamVjdF9pZBIVQhM0NzUzNTgzMjg0NTk3MDY0MTEy&filename=&opi=96797242",
    "dashboard.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE2YTI0MjAwMmI0ZTRhOTNiNDdjOTMyNTRkNDQ2YmJjEgsSBxCv9JXu4wkYAZIBIwoKcHJvamVjdF9pZBIVQhM0NzUzNTgzMjg0NTk3MDY0MTEy&filename=&opi=96797242",
    "rag.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sX2VmZjRjOTY2ZjQ3ZTQ5ZmFiZGE4YTg4NmM4OWE0NzEzEgsSBxCv9JXu4wkYAZIBIwoKcHJvamVjdF9pZBIVQhM0NzUzNTgzMjg0NTk3MDY0MTEy&filename=&opi=96797242",
    "news.html": "https://contribution.usercontent.google.com/download?c=CgthaWRhX2NvZGVmeBJ7Eh1hcHBfY29tcGFuaW9uX2dlbmVyYXRlZF9maWxlcxpaCiVodG1sXzE1ZGU3MjcyZjdkYTRhZDRhZWM3MTRjNjkzMjgxNTkzEgsSBxCv9JXu4wkYAZIBIwoKcHJvamVjdF9pZBIVQhM0NzUzNTgzMjg0NTk3MDY0MTEy&filename=&opi=96797242"
}

for filename, url in files.items():
    try:
        path = os.path.join(scratch_dir, filename)
        urllib.request.urlretrieve(url, path)
        print(f"Downloaded {filename}")
    except Exception as e:
        print(f"Error downloading {filename}: {e}")
