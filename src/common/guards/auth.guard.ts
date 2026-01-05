import { CanActivate, ExecutionContext, Injectable, UnauthorizedException } from "@nestjs/common";
import { Request } from "express";
import { Observable } from "rxjs";

@Injectable()
export class AuthGuard implements CanActivate {
    canActivate(context: ExecutionContext): boolean {
        const req = context.switchToHttp().getRequest() as Request;
        const token = req.headers["authorization"];

        if (!token || !token.startsWith("Bearer ")) {
            throw new UnauthorizedException("Токен авторизации не валиден");
        }

        return true;
    }
}
