import { SESClient, SendEmailCommand } from "@aws-sdk/client-ses";

const ses = new SESClient({ region: "eu-west-1" });

const params = {
  Source: "noreply@cyf.academy",
  Destination: {
    ToAddresses: ["volkov.nataliia@gmail.com"],
  },
  Message: {
    Subject: { Data: "Test Email" },
    Body: {
      Html: { Data: "<p>This is a test email from a CYF project.</p>" },
    },
  },
};

export async function sendEmail() {
  try {
    const command = new SendEmailCommand(params);
    const data_email = await ses.send(command);
    console.log("Sent:", data_email.MessageId);
  } catch (err) {
    console.error("Error:", err);
  }
}

sendEmail();
