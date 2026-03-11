import nodemailer from 'nodemailer'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()

    // Validate required fields from actual form
    const { name, email, certificateType } = body

    if (!name || !email || !certificateType) {
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

    // Build email content from form data
    let emailContent = `
お問い合わせがありました。

【送信者情報】
名前: ${body.name || 'N/A'}
名前（漢字）: ${body.nameKanji || 'N/A'}
性別: ${body.gender || 'N/A'}
国籍: ${body.nationality || 'N/A'}
生年月日: ${body.birthDate || 'N/A'}
学生ID: ${body.studentId || 'N/A'}
住所: ${body.address || 'N/A'}
電話番号: ${body.phone || 'N/A'}
メールアドレス: ${email}

【証明書申請情報】
発行を受けたい証明書の種類: ${certificateType}
申請目的: ${body.purpose || 'N/A'}
受け取り場所: ${body.submissionPlace || 'N/A'}
受け取り方法: ${body.receiveMethod || 'N/A'}

【備考】
${body.notes || 'N/A'}
`

    // Send email
    await transporter.sendMail({
      from: smtpUser,
      to: mailTo,
      replyTo: email,
      subject: `【KCP】証明書申請: ${name}`,
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
