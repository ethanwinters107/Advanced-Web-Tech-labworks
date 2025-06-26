// src/user/user.service.ts

import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User, UserRole } from './entities/user.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { v4 as uuidv4 } from 'uuid';
import { MailService } from '../mail/mail.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepo: Repository<User>,
    private mailService: MailService,
  ) {}

  async create(dto: CreateUserDto): Promise<User> {
    const hashed = await bcrypt.hash(dto.password, 10);
    const user = this.userRepo.create({
      email: dto.email,
      password: hashed,
      verificationToken: uuidv4(),
      isVerified: false,
      role: dto.role,
    });

    const savedUser = await this.userRepo.save(user);

    if (typeof savedUser.verificationToken === 'string') {
      await this.mailService.sendVerificationEmail(
        savedUser.email,
        savedUser.verificationToken,
      );
    }

    return savedUser;
  }

  async updateMe(userId: number, dto: UpdateUserDto): Promise<User> {
    const user = await this.userRepo.findOneBy({ id: userId });
    if (!user) throw new Error('User not found');

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    Object.assign(user, dto);
    return this.userRepo.save(user);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.userRepo.findOne({ where: { email } });
  }

  async verifyEmail(token: string): Promise<User | null> {
    const user = await this.userRepo.findOne({
      where: { verificationToken: token },
    });

    if (user) {
      user.isVerified = true;
      user.verificationToken = undefined; // ✅ fixed null issue
      await this.userRepo.save(user);
      return user;
    }

    return null;
  }

  async getTotalUsers(): Promise<number> {
    return this.userRepo.count();
  }
}
