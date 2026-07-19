import { Injectable, BadRequestException, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async register(registerDto: any) {
    const { name, email, phone, password } = registerDto;

    const existingEmail = await this.usersService.findByEmail(email);
    if (existingEmail) {
      throw new BadRequestException('Email already in use');
    }

    const existingPhone = await this.usersService.findByPhone(phone);
    if (existingPhone) {
      throw new BadRequestException('Phone number already registered');
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    const newUser = await this.usersService.create({
      name,
      email,
      phone,
      passwordHash,
    });

    const userObj: any = newUser.toObject();
    delete userObj.passwordHash;
    return userObj;
  }

  async login(loginDto: any) {
    const { email, identifier, password } = loginDto;
    const loginId = identifier || email;

    const user = await this.usersService.findByEmail(loginId) || await this.usersService.findByPhone(loginId);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.role === 'admin') {
      throw new UnauthorizedException('Please use the admin portal to log in');
    }

    const userObj: any = user.toObject();
    delete userObj.passwordHash;
    return userObj;
  }

  async adminLogin(loginDto: any) {
    const { email, password } = loginDto;

    const user = await this.usersService.findByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) {
      throw new UnauthorizedException('Invalid credentials');
    }

    if (user.role !== 'admin') {
      throw new UnauthorizedException('Unauthorized: Admin access required');
    }

    const userObj: any = user.toObject();
    delete userObj.passwordHash;
    return userObj;
  }
}

