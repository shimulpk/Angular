// home.ts

import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';

interface DashboardCard {
  title: string;
  value: number;
  icon: string;
  color: string;
}

interface Feature {
  title: string;
  description: string;
  icon: string;
  color: string;
}

interface Activity {
  title: string;
  time: string;
}

interface FactoryImage {
  image: string;
}

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './home-component.html',
  styleUrl: './home-component.css',
})
export class HomeComponent implements OnInit {

  currentTime: Date = new Date();

  // DASHBOARD DATA
  dashboardCards: DashboardCard[] = [];

  // FEATURES
  features: Feature[] = [];

  // RECENT ACTIVITIES
  recentActivities: Activity[] = [];

  // FACTORY IMAGES
  factoryImages: FactoryImage[] = [];

  ngOnInit(): void {

    // LIVE CLOCK
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);

    // LOAD DASHBOARD
    this.loadDashboardCards();

    // LOAD FEATURES
    this.loadFeatures();

    // LOAD ACTIVITIES
    this.loadActivities();

    // LOAD IMAGES
    this.loadFactoryImages();

  }

  // DASHBOARD
  loadDashboardCards(): void {

    this.dashboardCards = [

      {
        title: 'Total Buyers',
        value: 120,
        icon: 'bi-people-fill',
        color: 'primary'
      },

      {
        title: 'Total Orders',
        value: 850,
        icon: 'bi-cart-fill',
        color: 'warning'
      },

      {
        title: 'Production Qty',
        value: 95000,
        icon: 'bi-gear-fill',
        color: 'danger'
      },

      {
        title: 'Efficiency',
        value: 96,
        icon: 'bi-graph-up-arrow',
        color: 'success'
      }

    ];

  }

  // FEATURES
  loadFeatures(): void {

    this.features = [

      {
        title: 'Buyer Management',
        description:
          'Manage international buyers and payment terms.',
        icon: 'bi-people-fill',
        color: 'primary'
      },

      {
        title: 'Production Tracking',
        description:
          'Track cutting, sewing and finishing process.',
        icon: 'bi-gear-fill',
        color: 'danger'
      },

      {
        title: 'Inventory Management',
        description:
          'Monitor stock, raw materials and warehouse.',
        icon: 'bi-box-seam-fill',
        color: 'success'
      },

      {
        title: 'Quality Assurance',
        description:
          'Quality checking and inspection reports.',
        icon: 'bi-clipboard-check-fill',
        color: 'warning'
      }

    ];

  }

  // ACTIVITIES
  loadActivities(): void {

    this.recentActivities = [

      {
        title: 'New Buyer Added',
        time: '10 Minutes Ago'
      },

      {
        title: 'Production Line Completed',
        time: '30 Minutes Ago'
      },

      {
        title: 'Shipment Ready',
        time: '1 Hour Ago'
      },

      {
        title: 'Inventory Updated',
        time: '2 Hours Ago'
      }

    ];

  }

  // FACTORY IMAGES
  loadFactoryImages(): void {

    this.factoryImages = [

      {
        image:
          'https://images.unsplash.com/photo-1521791136064-7986c2920216'
      },

      {
        image:
          'https://images.unsplash.com/photo-1504384308090-c894fdcc538d'
      },

      {
        image:
          'https://images.unsplash.com/photo-1517048676732-d65bc937f952'
      },

      {
        image:
          'https://images.unsplash.com/photo-1522202176988-66273c2fd55f'
      }

    ];

  }

}