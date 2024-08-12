import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../../services/loading.service';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-loading',
  standalone: true,
  imports: [NgIf],
  templateUrl: './loading.component.html',
  styleUrl: './loading.component.css',
})
export class LoadingComponent implements OnInit {
  isLoading!: boolean;
  constructor(loadingService: LoadingService) {
    loadingService.isLoading.subscribe(
      (isLoading) => (this.isLoading = isLoading)
    );
    // loadingService.showLoading();
  }

  ngOnInit(): void {}
}
