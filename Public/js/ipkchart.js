const ipkData = [3.85, 2.6, 3.2, 2.0, 3.1, 3.68, 2.9, 3.9];

// Fungsi untuk menentukan warna berdasarkan IPK
function getIPKColor(ipk) {
  if (ipk >= 3.5 && ipk <= 4.0) {
    return "#28a745"; // Hijau terang
  } else if (ipk >= 3.0 && ipk < 3.5) {
    return "#00ff00"; // Hijau stabilo
  } else if (ipk >= 2.5 && ipk < 3.0) {
    return "#ff9500"; // Orange
  } else {
    return "#dc3545"; // Merah
  }
}

// Inisialisasi chart
let chartType = "line"; // Tipe chart awal
let ipkChart;

function renderChart() {
  const ctx = document.getElementById("ipkChart").getContext("2d");

  // Hancurkan chart sebelumnya jika ada
  if (ipkChart) {
    ipkChart.destroy();
  }

  // Buat chart baru
  ipkChart = new Chart(ctx, {
    type: chartType,
    data: {
      labels: [
        "Semester 1",
        "Semester 2",
        "Semester 3",
        "Semester 4",
        "Semester 5",
        "Semester 6",
        "Semester 7",
        "Semester 8",
      ],
      datasets: [
        {
          label: "IPK",
          data: ipkData,
          borderColor: chartType === "line" ? "#1f74bf" : null, // Warna garis untuk line chart
          backgroundColor:
            chartType === "line"
              ? "rgba(31, 116, 191, 0.2)" // Warna fill untuk line chart
              : ipkData.map((ipk) => getIPKColor(ipk)), // Warna untuk bar chart
          fill: chartType === "line",
          tension: chartType === "line" ? 0.4 : 0,
          // Warna titik untuk line chart
          pointBackgroundColor:
            chartType === "line"
              ? ipkData.map((ipk) => getIPKColor(ipk))
              : null,
          pointBorderColor:
            chartType === "line"
              ? ipkData.map((ipk) => getIPKColor(ipk))
              : null,
          pointBorderWidth: 2,
          pointRadius: 5, // Ukuran titik
          pointHoverRadius: 7, // Ukuran titik saat hover
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
          max: 4.0,
          title: {
            display: true,
            text: "IPK",
          },
        },
        x: {
          title: {
            display: true,
            text: "Semester",
          },
        },
      },
    },
  });
}

// Render chart awal
renderChart();

// Event listener untuk tombol Ganti Chart
document.getElementById("toggleChartBtn").addEventListener("click", (e) => {
  e.preventDefault();
  chartType = chartType === "line" ? "bar" : "line";
  document.getElementById("toggleChartBtn").textContent =
    chartType === "line" ? "Ganti ke Bar" : "Ganti ke Line";
  renderChart();
});
