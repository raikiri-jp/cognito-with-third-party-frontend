import { Component, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from './core/services/auth.service';
import { HttpClient } from '@angular/common/http';
import { Subscription } from 'rxjs';

/**
 * AppComponent
 */
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'cognito-practice-angular';

  loading = true;

  /** ログイン状態 */
  private authStatus: boolean = false;

  /** 購読管理用配列 */
  private subscriptions: Subscription[] = [];

  /**
   * ログイン済み否か
   */
  get loggedIn() {
    return this.authStatus;
  }

  /**
   * コンストラクタ
   *
   * @param http HttpClient
   * @param authService AuthService
   */
  constructor(private http: HttpClient, private authService: AuthService) {}

  /**
   * コンポーネントの初期処理
   */
  ngOnInit() {
    this.http.get('sanctum/csrf-cookie').subscribe(() => {
      this.authService.load();
      this.subscriptions.push(
        this.authService.status$.subscribe((status) => {
          this.authStatus = status;
          this.loading = false;
        })
      );
    });
  }

  /**
   * ログイン
   */
  login(): void {
    this.authService.login();
  }

  /**
   * ログアウト
   */
  logout(): void {
    this.authService.logout();
  }

  /**
   * コンポーネント破棄前の処理
   */
  ngOnDestroy(): void {
    // 購読停止
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
