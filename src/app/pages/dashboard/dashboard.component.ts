import { Component, OnInit } from '@angular/core';
import { Chart, CategoryScale, LinearScale, LineController, LineElement, Title, Tooltip, Legend } from 'chart.js';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  chart: any;

  ngOnInit(): void {
    // Register the necessary Chart.js components
    Chart.register(
      CategoryScale,
      LinearScale,
      LineController, // Register the LineController for line charts
      LineElement,    // Register the LineElement to render lines
      Title,
      Tooltip,
      Legend
    );

    // Initialize the chart with the line chart type
    this.chart = new Chart('canvas', {
      type: 'line', // Using line chart
      data: {
        labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
        datasets: [
          {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55, 40],
            borderColor: 'rgba(0, 123, 255, 1)',
            backgroundColor: 'rgba(0, 123, 255, 0.2)',
            fill: true,
          },
        ],
      },
      options: {
        responsive: true,
        scales: {
          x: {
            type: 'category', // Category scale for x-axis (months)
            title: {
              display: true,
              text: 'Months',
            },
          },
          y: {
            type: 'linear', // Linear scale for y-axis (sales)
            title: {
              display: true,
              text: 'Sales',
            },
          },
        },
      },
    });
  }
}
