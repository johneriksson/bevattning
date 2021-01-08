import nodemailer from "nodemailer";

export async function sendEmail(options: {
	to: string,
	subject: string,
	cc?: string,
	bcc?: string,
	html?: string,
}) {

	const { to, subject, cc, bcc, html } = options;

	const transporter = nodemailer.createTransport({
		host: "smtp.gmail.com",
		port: 465,
		secure: true,
		auth: {
			user: "radion.app@johneriksson.me",
			pass: "usskqnusskqn1",
		},
	});

	await transporter.sendMail({
		from: "\"Radion App\" <radion.app@johneriksson.me>",
		to,
		cc,
		bcc,
		subject,
		html,
	});

	console.log("Message sent!");
	console.log("to:", to);
	console.log("subject:", subject);
}