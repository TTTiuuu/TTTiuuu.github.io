const nodemailer = require('nodemailer');

// QQ邮箱SMTP配置
const transporter = nodemailer.createTransport({
  host: 'smtp.qq.com',
  port: 465,
  secure: true, // 使用 SSL
  auth: {
    user: '3946437579@qq.com',
    pass: 'hnpiekqezxhkcdfe' // QQ邮箱授权码
  }
});

// 解析命令行参数
const args = process.argv.slice(2);
let to = '';
let subject = '';
let text = '';
let html = '';
let attachments = [];

for (let i = 0; i < args.length; i++) {
  if (args[i] === '--to' && args[i + 1]) {
    to = args[i + 1];
    i++;
  } else if (args[i] === '--subject' && args[i + 1]) {
    subject = args[i + 1];
    i++;
  } else if (args[i] === '--text' && args[i + 1]) {
    text = args[i + 1];
    i++;
  } else if (args[i] === '--html' && args[i + 1]) {
    html = args[i + 1];
    i++;
  } else if (args[i] === '--attach' && args[i + 1]) {
    attachments.push(args[i + 1]);
    i++;
  }
}

if (!to || !subject || (!text && !html)) {
  console.error('用法: node send-email.js --to <收件人> --subject <主题> --text <内容> [--html <html内容>] [--attach <文件路径>]');
  process.exit(1);
}

// 发送邮件
async function send() {
  try {
    const mailOptions = {
      from: '"爪爪" <3946437579@qq.com>',
      to: to,
      subject: subject,
      text: text
    };
    if (html) mailOptions.html = html;
    if (attachments.length > 0) {
      mailOptions.attachments = attachments.map(f => ({ path: f }));
    }
    const info = await transporter.sendMail(mailOptions);
    console.log('邮件已发送:', info.messageId);
  } catch (err) {
    console.error('发送失败:', err.message);
    process.exit(1);
  }
}

send();
