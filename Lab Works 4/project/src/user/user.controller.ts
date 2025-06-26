// src/user/user.controller.ts

import {
  Controller,
  Post,
  Body,
  Get,
  Request,
  UseGuards,
  Param,
  Patch,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  async getProfile(@Request() req) {
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Patch('me')
  async updateProfile(@Request() req, @Body() body: UpdateUserDto) {
    return this.usersService.updateMe(req.user.id, body);
  }

  @Get('verify/:token')
  async verifyEmail(@Param('token') token: string) {
    const user = await this.usersService.verifyEmail(token);
    if (user) {
      return { message: 'Email verified successfully!', user };
    } else {
      return { message: 'Invalid or expired verification token.' };
    }
  }

  @UseGuards(JwtAuthGuard)
  @Get('total')
  async getTotalUsers() {
    return this.usersService.getTotalUsers();
  }
}
