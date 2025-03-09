import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '../Users/user.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from 'src/DTOs/create-user.dto';
import { LoginDto } from 'src/DTOs/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(userData: LoginDto): Promise<any> {
    const { username, password } = userData;
    const user = await this.userService.findByUsername(username);
    if (user && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(userData: LoginDto) {
    const user = await this.validateUser(userData);
    if (!user) {
      throw new UnauthorizedException('Credenciales incorrectas');
    }

    const payload = { username: user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userData: CreateUserDto) {
    const user = await this.userService.createUser(userData);
    const payload = { username: user.username, sub: user.id };
    return {
      message: 'Usuario registrado con éxito',
      user,
      access_token: this.jwtService.sign(payload),
    };
  }
}
