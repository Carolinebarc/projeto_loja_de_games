import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt/dist";
import { PassportModule } from "@nestjs/passport";
import { UsuarioService } from "src/usuario/service/usuario.service";
import { UsuarioModule } from "src/usuario/usuario.module";
import { Bcrypt } from "./bcrypt/bcrypt";
import { jwtConstantes } from "./constants/constants";
import { AuthController } from "./controllers/auth.controllers";
import { AuthService } from "./services/auth.service";
import { JwtStrategy } from "./strategy/jwt.strategy";
import { LocalStrategy } from "./strategy/local.strategy";

@Module({
    imports: [
        
        UsuarioModule, 
        PassportModule, 
        JwtModule.register({
            secret: jwtConstantes.secret,
            signOptions: {expiresIn: '24h'}
        })
    ], 
    providers: [
        Bcrypt,
        AuthService, 
        LocalStrategy, 
        JwtStrategy,
        UsuarioService
    ],
    controllers: [AuthController],
    exports: [Bcrypt]
})
export class AuthModule {}