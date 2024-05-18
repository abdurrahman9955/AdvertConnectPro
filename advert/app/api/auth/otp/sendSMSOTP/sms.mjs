
import Twilio from 'twilio';

class TwilioOTPService {
  constructor(accountSid, authToken, twilioPhoneNumber) {
    this.twilioClient = new Twilio(accountSid, authToken);
  }

  async sendOTP(phoneNumber, otp) {
    try {
      await this.twilioClient.messages.create({
        body: `Your OTP is: ${otp}. It will expire in 60 seconds.`,
        from: process.env.AUTH_PHONE_NUMBER,
        to: phoneNumber,
      });
      console.log(`SMS sent to ${phoneNumber}: ${otp}`);
    } catch (error) {
      console.error('Twilio SMS error:', error);
      throw new Error('Failed to send SMS OTP');
    }
  }
}

export default TwilioOTPService;


