const statusText = document.getElementById("status");

async function fetchInfo() {
  const url = document.getElementById("url").value;

  statusText.innerText = "Loading...";

  const res = await fetch("/api/info", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({ url }),
  });

  const data = await res.json();

  if (data.error) {
    statusText.innerText = data.error;
    return;
  }

  document.getElementById("preview").classList.remove("hidden");
  document.getElementById("thumbnail").src = data.thumbnail;
  document.getElementById("title").innerText = data.title;

  statusText.innerText = "";
}

function download(type) {
  const url = document.getElementById("url").value;
  const quality = document.getElementById("quality").value;

  window.open(`/api/download?url=${encodeURIComponent(url)}&quality=${quality}&type=${type}`);
}
