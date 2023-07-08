import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of, ReplaySubject } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { User } from '../types/user';

/**
 * AuthService
 */
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  // TODO 環境設定で変えられるようにする
  private baseUrl = 'http://localhost:8000';

  /**
   * ユーザー情報を保持するReplaySubject
   */
  private userSubject: ReplaySubject<User> = new ReplaySubject<User>();

  /**
   * ログイン状態を保持するBehaviorSubject
   */
  private statusSubject: BehaviorSubject<boolean> =
    new BehaviorSubject<boolean>(false);

  /**
   * ユーザー情報のObservable
   */
  public user$ = this.userSubject.asObservable();

  /**
   * ログイン状態のObservable
   */
  public status$ = this.statusSubject.asObservable();

  /**
   * ログイン用URL
   */
  get loginUrl(): string {
    return `${this.baseUrl}/login`;
  }

  /**
   * ログアウト用URL
   */
  get logoutUrl(): string {
    return `${this.baseUrl}/logout`;
  }

  /**
   * コンストラクタ
   *
   * @param http
   */
  constructor(private http: HttpClient) {}

  /**
   * ユーザ情報およびログイン状態を保持
   *
   * @param user ユーザ情報
   */
  setUser(user: User) {
    this.userSubject.next(user);
    this.statusSubject.next(user.id !== 0);
  }

  /**
   * ユーザ情報を読み込む
   *
   * @returns ユーザー情報のObservable
   */
  load(): void {
    this.http
      .get<User>(`${this.baseUrl}/api/user`, { withCredentials: true })
      .pipe(
        map((response) => response as User),
        catchError(() => of({ id: 0, name: '' }))
      )
      .subscribe((user) => {
        this.setUser(user);
      });
  }

  /**
   * ログイン画面へ遷移
   */
  login(): void {
    location.href = this.loginUrl;
  }

  /**
   * 認可処理
   *
   * @param code 認可コード
   * @returns 認可成否を返すObservable
   */
  authenticate(code: string): Observable<boolean> {
    return this.http
      .get<any>(`${this.baseUrl}/api/auth`, {
        params: { code },
        withCredentials: true,
      })
      .pipe(
        map((response) => response.status === 'ok'),
        catchError(() => of(false))
      );
  }

  /**
   * ログアウト処理
   */
  logout(): void {
    this.setUser({ id: 0, name: '' });
    location.href = this.logoutUrl;
  }
}
