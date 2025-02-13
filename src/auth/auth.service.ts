import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { DatabaseService } from '../database/database.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService, private readonly db: DatabaseService) { }

  async login(loginDto: LoginDto) {
    const user = await this.findUserByEmail(loginDto.email);
    if (!user || !(await bcrypt.compare(loginDto.password, user.password_hash))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    delete user.password_hash;
    return {token: this.generateToken(user.id, user.email),profile: user};
  }

  async register(registerDto: RegisterDto) {
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const newUser = await this.createUser(registerDto.email, hashedPassword, registerDto.fullName);
    return this.generateToken(newUser.id, newUser.email);
  }

  private generateToken(userId: string, email: string) {
    return { access_token: this.jwtService.sign({ userId, email }) };
  }

  private async findUserByEmail(email: string) {
    const result = await this.db.query('SELECT id, email, password_hash, full_name, role FROM users WHERE email = $1 AND is_deleted = FALSE LIMIT 1', [email]);
    return result.rows.length ? result.rows[0] : null;
  }

  private async createUser(email: string, password: string, fullName: string) {
    const result = await this.db.query('INSERT INTO users (email, password_hash,role,full_name) VALUES ($1, $2, $3, $4) RETURNING id, email', [email, password, 'admin', fullName]);
    return result.rows[0];
  }
}