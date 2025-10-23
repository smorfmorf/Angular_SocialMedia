import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../../../../data-acsses/src/lib/auth/auth.service';
// Логика проста refresh токен нужен для обновления access токена по истечении его срока действия.

// 🧠Interceptor Каждый HTTP-запрос перехватывается (и проверяет токен).
export const authToken_Interceptor: HttpInterceptorFn = (req, next) => {
  if (req.url.includes('dadata.ru')) {
    return next(req);
  }

  const authService = inject(AuthService);
  const token = authService.token;
  console.log('token: ', token);

  //! 👉 Если это запрос на refresh — пропускаем без изменений
  if (req.url.includes('/refresh')) {
    return next(req);
  }

  if (!token) {
    return next(req);
  }

  // если токен есть добавляем его в заголовок
  req = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  });

  /*prettier-ignore
//* (Если получим ответ что токен не валиден,тогда мы запросим новый токен) 
  в наш middleWare попал запрос => поняли по ответу от сервера 403 что токен сдох (и хотим отправить его заново) значит => сначала делаем запрос на refreshToken это новый стрим -> и потом из этого стрима с refreshToken с новыми данными ПЕРЕЙТИ В ДРУГОЙ СТРИМ который будет являтся новым запросом(повторным запросом с новым токеном на БЕК)  switchMap(вернет новый стрим) - переключение на другой стрим
  //!Важно: когда отправим запрос на рефреш он тоже пройдет через интерсептор, интерсептор еще раз попробует добавить ему токен он снова окажется протухшим и мы попадем в петлю => значит нужно: именно запрос на рефреш, ему дверь приоткрыть в interceptor
  */

  // 👉 .pipe(...) срабатывает, когда пришёл ответ от сервера на HTTP-запрос
  return next(req).pipe(
    //Если ошибка перехватываем и делаем запрос на обновление токена, затем переключаемся(switchMap) на другой стрим с новым токеном и затем делаем повторный запрос next
    catchError((erorr) => {
      if (erorr.status === 403) {
        return authService.refreshAuthToken().pipe(
          switchMap((res) => {
            req = req.clone({
              setHeaders: { Authorization: `Bearer ${res.access_token}` },
            });

            return next(req);
          })
        );
      }
      // возвращаем дальше стрим с ошибкой
      return throwError(erorr);
    })
  );
};
/*
  Итог:
  подписчик subscribe видит либо успех с новыми данными, либо ошибку, если обновление токена и повторный запрос тоже не удались. */

/*

..........................................................................
Вариант 2  ЕБАНУТЫЙ ВАРИАНТ
Пришел запрос me с протухшим токеном получили 403 попали в функцию рефрешПроцесс
спрашиваем рефрешим ? - нет тогда попадаем в ветку заводим флаг что рефрешим щас

отправили запрос на рефреш - запрос снова попадает в интерсептор - смотрим что запрос true
идем в рефрешПроцесс в нем встречаем что это рефреш и пропускаем его $1  

Предположим в этот же момент где-то возник запрос subscribers он попадет в интерсептор isRefresh - true, рефрешПроцесс снова и попадет в ожидание где просто чтобы выполниться ждет пока isRefresh станет false. тем временем запрос $1 закончился он попадает в ветку switchMap и после сделали isRefresh-false.  и запрос subscribers отпускается.





  BehaviorSubject - симбиот можно и подписаться и без подписки получить значение
  let isRefreshing$ = new BehaviorSubject(false);

export const authToken_Interceptor2Test: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const token = authService.token;

  if (!token) {
    return next(req);
  }
  !2 если запрос на рефреш не дожидаясь ошибку сразу отправляем запрос на рефреш
  if (isRefreshing$.value) {
    return refreshAndProceed(authService, req, next);
  }
`
  return next(addToken(req, token)).pipe(
    catchError((erorr) => {
      if (erorr.status === 403) {
        return refreshAndProceed(authService, req, next);
      }

      return throwError(erorr);
    })
  );
};

function refreshAndProceed(
  authService: AuthService,
  req: HttpRequest<any>,
  next: HttpHandlerFn
) {
  Если не рефрешится - начинаем рефрешить.

  if (!isRefreshing$.value) {
    isRefreshing$.next(true);
    return authService.refreshAuthToken().pipe(
      switchMap((res) => {
        return next(addToken(req, res.access_token)).pipe(
          tap(() => {
            isRefreshing$.next(false);
          })
        )
      })
    );
  }


Откроем дверь для рефреш запроса
if (req.url.includes('/refresh')) {
  return next(addToken(req, authService.token!));
 }

Потоки “копятся” — потому что они уже подписались и ждут.
ждем пока закончится рефреш  - > мы подписаны на рефреш  (ждем пока isRefreshing закончится_false чтобы отправить запрос)
return  isRefreshing$.pipe( 
  filter((val) => !val),
  switchMap((res) => next(addToken(req, authService.token!)))
)


}

function addToken(req: HttpRequest<any>, token: string) {
  return (req = req.clone({
    setHeaders: { Authorization: `Bearer ${token}` },
  }));
}
*/
