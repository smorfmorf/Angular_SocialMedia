import { authToken_Interceptor } from './lib/auth/auth.middleWare';
import { AuthService } from './lib/auth/auth.service';
import { canActivateAuth } from './lib/auth/access.guard';
// тут говори что из библиотеки отдаем наружу.

export { AuthService, authToken_Interceptor, canActivateAuth };
