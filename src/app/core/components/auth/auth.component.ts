import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Subscription } from 'rxjs';

/**
 * AuthComponent
 */
@Component({ template: '' })
export class AuthComponent implements OnInit, OnDestroy {
  /** 購読管理用配列. */
  private subscriptions: Subscription[] = [];

  /**
   * コンストラクタ
   *
   * @param activatedRoute ActivatedRoute
   * @param authService AuthService
   */
  constructor(
    private activatedRoute: ActivatedRoute,
    private authService: AuthService
  ) {}

  /**
   * コンポーネントにおける初期処理
   */
  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      if (params['code']) {
        this.authenticate(params['code']);
      } else {
        location.href = '/';
      }
    });
  }

  /**
   * 認可処理
   *
   * @param code コード
   */
  private authenticate(code: string): void {
    this.authService.authenticate(code).subscribe((authenticated) => {
      if (authenticated) {
        // トップページに遷移
        location.href = '/';
      } else {
        // ログイン画面に遷移
        this.authService.login();
      }
    });
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
