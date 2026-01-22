
export const verificationEmailTemplate = (code: string, verificationUrl: string): string => {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
    </head>
    <body style="margin: 0; padding: 0; font-family: Arial, sans-serif; background-color: #f4f4f4;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background-color: #f4f4f4; padding: 20px;">
        <tr>
          <td align="center">
            <table width="600" cellpadding="0" cellspacing="0" style="background-color: #ffffff; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
              
              <tr>
                <td style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 40px 20px; text-align: center;">
                  <h1 style="color: #ffffff; margin: 0; font-size: 28px;">¡Bienvenido!</h1>
                </td>
              </tr>
              
              <tr>
                <td style="padding: 40px 30px;">
                  <h2 style="color: #333333; margin: 0 0 20px 0; font-size: 24px;">Verifica tu cuenta</h2>
                  <p style="color: #666666; font-size: 16px; line-height: 24px; margin: 0 0 20px 0;">
                    Gracias por registrarte. Para completar tu registro, verifica tu dirección de email.
                  </p>
                  
                  <div style="background-color: #f8f9fa; border-left: 4px solid #667eea; padding: 15px; margin: 20px 0;">
                    <p style="margin: 0; color: #666666; font-size: 14px;">Tu código de verificación es:</p>
                    <p style="margin: 10px 0 0 0; color: #333333; font-size: 32px; font-weight: bold; letter-spacing: 4px;">${code}</p>
                  </div>
                  
                  <table width="100%" cellpadding="0" cellspacing="0" style="margin: 30px 0;">
                    <tr>
                      <td align="center">
                        <a href="${verificationUrl}" style="display: inline-block; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: #ffffff; text-decoration: none; padding: 16px 40px; border-radius: 6px; font-size: 16px; font-weight: bold;">
                          Verificar Email
                        </a>
                      </td>
                    </tr>
                  </table>
                  
                  <p style="color: #999999; font-size: 14px; margin: 20px 0 0 0;">
                    Si no creaste esta cuenta, ignora este email.
                  </p>
                </td>
              </tr>
              
              <tr>
                <td style="background-color: #f8f9fa; padding: 20px 30px; text-align: center;">
                  <p style="color: #999999; font-size: 12px; margin: 0;">
                    © ${new Date().getFullYear()} Tu App. Todos los derechos reservados.
                  </p>
                </td>
              </tr>
              
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;
};
