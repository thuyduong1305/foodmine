import { HttpInterceptorFn } from '@angular/common/http';
import { LoadingService } from '../../services/loading.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { Observable, tap } from 'rxjs';

let pendingRequest = 0;

export const loadingInterceptor: HttpInterceptorFn = (req, next) => {
  // Tạo một instance của LoadingService, có thể là Singleton
  const loadingService = new LoadingService();

  // Hiển thị loading khi bắt đầu request
  loadingService.showLoading();
  pendingRequest++;

  // Xử lý request và response
  return next(req).pipe(
    tap({
      next: (event: HttpEvent<any>) => {
        if (event.type === HttpEventType.Response) {
          handleHideLoading();
        }
      },
      error: (_) => {
        handleHideLoading();
      },
    })
  );

  // Hàm xử lý ẩn loading
  function handleHideLoading() {
    pendingRequest--;
    if (pendingRequest === 0) {
      loadingService.hideLoading();
    }
  }
};
