import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css']
})
export class SettingsComponent implements OnInit{
  feature1: boolean = false;
  feature2: boolean = false;
  defaultCityName: string = "Aligarh";
  @Output() settingsVisibility = new EventEmitter<string>();
  @Output() defaultCity = new EventEmitter<string>();

  constructor(private router: Router) {}
  ngOnInit() {
    console.log('Feature 1:');
  }

  applySettings() {
    console.log('Feature 1:', this.feature1);
    // You can add logic to apply the settings here
    this.goBack();
  }

  goBack() {
    this.settingsVisibility.emit("false");
    this.router.navigate(['/']);  // Navigate back to the main page
  }
  onDefaultCityNameChanged() {
    if (this.defaultCityName.trim()) {
      this.defaultCity.emit(this.defaultCityName);
    }
  }

}
