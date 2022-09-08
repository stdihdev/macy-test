function drawChart() {
  $.getJSON("./test_feed.json", function (res) {
    const data = {};
    res.content.forEach((item) => {
      const { bodyHtml } = item.content;
      if (bodyHtml) {
        const words = bodyHtml.split(/[^A-Za-z]/);
        words
          .map((word) => word.toLowerCase())
          .forEach((word) => {
            if (word) data[word] = (data[word] || 0) + 1;
          });
      }
    });

    const ctx = document.getElementById("myChart").getContext("2d");
    const randomColors = Object.keys(data).map(
      (item) =>
        `rgba(${Math.random() * 255}, ${Math.random() * 255}, ${
          Math.random() * 255
        })`
    );
    const myChart = new Chart(ctx, {
      type: "bar",
      data: {
        labels: Object.keys(data),
        datasets: [
          {
            label: "# of Counts",
            data: Object.values(data),
            backgroundColor: randomColors,
            borderColor: randomColors,
            borderWidth: 1,
          },
        ],
      },
      options: {
        plugins: {
          legend: {
            display: false,
          },
        },
        scales: {
          y: {
            beginAtZero: true,
          },
          x: {
            display: false,
          },
        },
      },
    });
  });
}
