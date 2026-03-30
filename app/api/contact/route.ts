import { NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const formData = body

    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: Number(process.env.SMTP_PORT) || 587,
      secure: Number(process.env.SMTP_PORT) === 465,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
    })

    const fieldLabels: Record<string, string> = {
      nameKanji: "漢字氏名",
      name: "英文氏名",
      gender: "性別",
      nationality: "国籍",
      birthDate: "生年月日",
      studentId: "学籍番号",
      address: "現住所",
      phone: "電話番号",
      email: "メールアドレス",
      certificateType: "証明書の種類",
      purpose: "申請の目的",
      submissionPlace: "提出先",
      receiveMethod: "受け取り方法",
      notes: "備考",
    }

    const genderMap: Record<string, string> = {
      male: "男性",
      female: "女性",
      other: "その他",
    }

    const receiveMethodMap: Record<string, string> = {
      mail: "郵送",
      pickup: "本人がお受け取り",
      proxy: "代理人がお受け取り",
    }

    const certificateTypeMap: Record<string, string> = {
      attendance: "出席・成績証明書",
      graduation: "卒業証明書・修了証明書",
      withdrawal: "退学証明書",
      other: "その他",
    }

    const rows = Object.entries(formData)
      .filter(([, value]) => value)
      .map(([key, value]) => {
        const label = fieldLabels[key] || key
        let displayValue = value as string
        if (key === "gender") displayValue = genderMap[displayValue] || displayValue
        if (key === "receiveMethod") displayValue = receiveMethodMap[displayValue] || displayValue
        if (key === "certificateType") displayValue = certificateTypeMap[displayValue] || displayValue
        return `<tr><td style="padding:8px 12px;border:1px solid #ddd;font-weight:bold;background:#f8f9fa;white-space:nowrap">${label}</td><td style="padding:8px 12px;border:1px solid #ddd">${displayValue}</td></tr>`
      })
      .join("")

    const html = `
      <div style="font-family:sans-serif;max-width:600px;margin:0 auto">
        <h2 style="color:#0085b2;border-bottom:2px solid #0085b2;padding-bottom:8px">KCP 証明書発行申込み</h2>
        <table style="width:100%;border-collapse:collapse;margin-top:16px">
          ${rows}
        </table>
        <p style="margin-top:16px;color:#666;font-size:12px">このメールはKCPウェブサイトのお問い合わせフォームから送信されました。</p>
      </div>
    `

    await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to: process.env.MAIL_TO,
      cc: process.env.MAIL_CC,
      replyTo: formData.email,
      subject: "【KCP】証明書発行申込み",
      html,
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Email send error:", error)
    return NextResponse.json(
      { error: "メールの送信に失敗しました。" },
      { status: 500 }
    )
  }
}
