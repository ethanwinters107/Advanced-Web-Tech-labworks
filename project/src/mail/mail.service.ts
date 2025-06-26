// src/mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import * as nodemailer from 'nodemailer';

@Injectable()
export class MailService {
  private transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'winters20178@gmail.com',
      pass: 'vhfz bmis agxy wxas',
    },
  });

  async sendVerificationEmail(email: string, token: string): Promise<void> {
    const verificationLink = `http://localhost:3000/user/verify/${token}`;
    const mailOptions = {
      from: 'EduQuest <winters20178@gmail.com>',
      to: email,
      subject: 'Email Verification',
      html: `
        <div style="font-family: Arial, sans-serif; line-height: 1.6; max-width: 600px; margin: auto; border: 1px solid #ddd; padding: 20px; border-radius: 8px;">
          <h2 style="color: #333;">Welcome to EduQuest!</h2>
          <p>Thank you for registering. Please verify your email address to activate your account.</p>
          <div style="text-align: center; margin: 30px 0;">
            <a href="${verificationLink}" 
              style="
                display: inline-block;
                background-color: #4CAF50;
                color: white;
                padding: 12px 25px;
                text-decoration: none;
                border-radius: 5px;
                font-weight: bold;
                font-size: 16px;">
              Verify Email
            </a>
          </div>
          <p>If you did not create an account, you can safely ignore this email.</p>
          <p style="font-size: 12px; color: #888;">© 2025 EduQuest. All rights reserved.</p>
        </div>
      `
    };

    await this.transporter.sendMail(mailOptions);
  }
}
