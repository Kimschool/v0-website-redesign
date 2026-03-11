import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields
    const { name, email, subject, message, certificateType, graduationDate } = body

    if (!name || !email || !subject || !message) {
      return NextResponse.json(
        { success: false, error: '必須項目が入力されていません' },
        { status: 400 }
      )
    }

    // Get environment variables
    const smtpHost = process.env.SMTP_HOST
    const smtpPort = parseInt(process.env.SMTP_PORT || '465')
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const mailTo = process.env.MAIL_TO

    // Validate environment variables
    if (!smtpHost || !smtpUser || !smtpPass || !mailTo) {
      console.error('Missing SMTP configuration')
      return NextResponse.json(
        { success: false, error: 'メール送信設定にエラーがあります' },
        { status: 500 }
      )
    }

    // Create transporter with secure SMTP
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465, // Use secure connection for port 465
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    // Build email content
    let emailContent = `
お問い合わせがありました。

【送信者情報】
名前: ${name}
メールアドレス: ${email}

【お問い合わせ内容】
件名: ${subject}

メッセージ:
${message}
`

    // Add optional fields if present
    if (certificateType) {
      emailContent += `\n発行を受けたい証明書の種類: ${certificateType}`
    }
    if (graduationDate) {
      emailContent += `\n卒業予定日: ${graduationDate}`
    }

    // Send email
    await transporter.sendMail({
      from: smtpUser,
      to: mailTo,
      replyTo: email,
      subject: `【KCP】お問い合わせ: ${subject}`,
      text: emailContent,
      html: emailContent.replace(/\n/g, '<br>'),
    })

    return NextResponse.json({
      success: true,
      message: 'メッセージが正常に送信されました',
    })
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    console.error('Contact form error:', errorMessage)
    console.error('Full error details:', error)
    
    return NextResponse.json(
      { 
        success: false, 
        error: `メール送信に失敗しました: ${errorMessage}`
      },
      { status: 500 }
    )
  }
}
