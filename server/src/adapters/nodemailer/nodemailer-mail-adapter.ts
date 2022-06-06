import { MailAdapter, SendMailData } from "../mail-adapter";
import nodemailer from 'nodemailer';

var transport = nodemailer.createTransport({
    host: "smtp.mailtrap.io",
    port: 25,
    auth: {
      user: "4e5442f33db237",
      pass: "89e097e6383720"
    }
});

export class NodemailerMailAdapter implements MailAdapter {
    async sendMail({ subject, body }: SendMailData) {
        await transport.sendMail({
        from: 'Equipe Feedget <oi@feedget.com>',
        to: 'Vitor Lopes <vitorlopes089@gmail.com>',
        subject,
        html: body,
    });
    };
}