import { AuthService } from './auth.service';
import { UserService } from '../user/user.service';
import { Prisma } from '@prisma/client';
declare const JwtAuthGuard_base: import("@nestjs/passport").Type<import("@nestjs/passport").IAuthGuard>;
export declare class JwtAuthGuard extends JwtAuthGuard_base {
}
export declare class AuthController {
    private authService;
    private userService;
    constructor(authService: AuthService, userService: UserService);
    login(body: {
        loginId: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
    register(body: Prisma.UserCreateInput): Promise<{
        access_token: string;
        user: any;
    }>;
    getProfile(req: any): {
        user: any;
    };
    updateProfile(req: any, body: Prisma.UserUpdateInput): Promise<{
        user: {
            name: string;
            id: string;
            email: string;
            phone: string | null;
            userId: string;
            role: string;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
export {};
