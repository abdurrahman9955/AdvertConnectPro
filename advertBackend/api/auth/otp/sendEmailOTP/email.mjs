import aws from 'aws-sdk';

aws.config.update({
  accessKeyId: process.env.MY_S3_ACCESS_KEY,
  secretAccessKey: process.env.MY_S3_SECRET_KEY,
  region: process.env.MY_S3_REGION,
});

const ses = new aws.SES();

const sendSESOtp = async (email, otp) => {
  const params = {
    Destination: {
      ToAddresses: [email],
    },
    Message: {
      Body: {
        Text: {
          Data: `Your OTP is: ${otp}. It will expire in 60 seconds.`,
        },
      },
      Subject: {
        Data: 'Your OTP',
      },
    },
    Source: process.env.AUTH_EMAIL,
  };

  try {
    await ses.sendEmail(params).promise();
    console.log(`Email sent to ${email}: ${otp}`);
  } catch (error) {
    console.error('SES email error:', error);
    throw new Error('Failed to send email OTP');
  }
};

async function sendOTP(type, value) {
  try {
    const otp = Math.floor(100000 + Math.random() * 900000);

    if (type === 'email') {
      await sendSESOtp(value, otp);
    } else {
      throw new Error(`Invalid OTP type: ${type}`);
    }
  } catch (error) {
    console.error(`Error sending OTP for ${type}:`, error);
    throw new Error(`Failed to send OTP for ${type}: ${error.message}`);
  }
}

