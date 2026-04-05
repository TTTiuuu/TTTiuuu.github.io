# TOOLS.md - Local Notes

## 邮件发送

- 脚本位置: `tools/send-email.js`
- 发件人: 3946437579@qq.com
- SMTP: smtp.qq.com:465 (SSL)
- 授权码: hnpiekqezxhkcdfe

用法: `node tools/send-email.js --to <收件人> --subject <主题> --text <内容>`

Skills define _how_ tools work. This file is for _your_ specifics — the stuff that's unique to your setup.

## What Goes Here

Things like:

- Camera names and locations
- SSH hosts and aliases
- Preferred voices for TTS
- Speaker/room names
- Device nicknames
- Anything environment-specific

## Examples

```markdown
### Cameras

- living-room → Main area, 180° wide angle
- front-door → Entrance, motion-triggered

### SSH

- home-server → 192.168.1.100, user: admin

### TTS

- Preferred voice: "Nova" (warm, slightly British)
- Default speaker: Kitchen HomePod
```

## Why Separate?

Skills are shared. Your setup is yours. Keeping them apart means you can update skills without losing your notes, and share skills without leaking your infrastructure.

---

Add whatever helps you do your job. This is your cheat sheet.
