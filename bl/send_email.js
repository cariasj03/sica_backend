//Requiring modules
const nodemailer = require('nodemailer');

//Varaibles
const originEmail = 'info.sica.cr@gmail.com';
const smtpOptions = {
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: originEmail,
    pass: 'qmaxesehppjxaokb',
  },
  tls: { rejectUnauthorized: false },
};

//Functions
//Function to send a password email
const sendPasswordEmail = async (emailData) => {
  try {
    console.log('Enviando correo:', emailData);
    const transporter = nodemailer.createTransport({ ...smtpOptions });
    const { email, password, name } = emailData;

    await transporter.sendMail({
      from: originEmail,
      subject: 'Datos de acceso | SICA',
      to: email,
      html: `
      <html xmlns="http://www.w3.org/1999/xhtml">
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <meta name="x-apple-disable-message-reformatting" />
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="color-scheme" content="light dark" />
    <meta name="supported-color-schemes" content="light dark" />
    <title></title>
    <style type="text/css" rel="stylesheet" media="all">
      /* Base ------------------------------ */

      @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap');
      body {
        width: 100% !important;
        height: 100%;
        margin: 0;
        -webkit-text-size-adjust: none;
      }

      td {
        word-break: break-word;
      }

      .preheader {
        display: none !important;
        visibility: hidden;
        font-size: 1px;
        line-height: 1px;
        max-height: 0;
        max-width: 0;
        opacity: 0;
        overflow: hidden;
      }

      /* Type ------------------------------ */
      * {
        font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
        color: #444;
      }

      h1 {
        text-align: center;
      }

      h2 {
        margin-top: 0;
        font-size: 22px;
        font-weight: bold;
        text-align: left;
      }

      td,
      th {
        font-size: 16px;
      }

      p,
      ul,
      ol,
      blockquote {
        margin: 0.4em 0 1.1875em;
        font-size: 16px;
        line-height: 1.625;
      }

      p.sub {
        font-size: 13px;
      }

      body {
        background-color: #f2f4f6;
      }

      .email-wrapper {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #f2f4f6;
      }

      .email-content {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }
      /* Masthead ----------------------- */

      .email-masthead {
        padding: 25px 0;
        text-align: center;
      }

      .email-masthead_logo {
        width: 94px;
      }

      .email-masthead_name {
        font-size: 16px;
        font-weight: bold;
        color: #a8aaaf;
        text-decoration: none;
        text-shadow: 0 1px 0 white;
      }
      /* Body ------------------------------ */

      .email-body {
        width: 100%;
        margin: 0;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
      }

      .email-body_inner {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        background-color: #ffffff;
      }

      .email-footer {
        width: 570px;
        margin: 0 auto;
        padding: 0;
        -premailer-width: 570px;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .email-footer p {
        color: #a8aaaf;
      }

      .body-action {
        width: 100%;
        margin: 30px auto;
        padding: 0;
        -premailer-width: 100%;
        -premailer-cellpadding: 0;
        -premailer-cellspacing: 0;
        text-align: center;
      }

      .body-sub {
        margin-top: 25px;
        padding-top: 25px;
        border-top: 1px solid #eaeaec;
      }

      .user-data {
        padding-left: 3rem;
      }

      .email-main-header-image {
        width: 100%;
        object-fit: cover;
        padding: 0;
        margin: 0;
      }

      .f-fallback {
        padding: 2rem;
      }

      .footer p {
        font-size: 0.8rem;
      }

      /*Media Queries ------------------------------ */

      @media only screen and (max-width: 45rem) {
        .email-body_inner,
        .email-footer {
          width: 90% !important;
        }
      }
    </style>
  </head>
  <body>
    <table
      class="email-wrapper"
      width="100%"
      cellpadding="0"
      cellspacing="0"
      role="presentation"
    >
      <tr>
        <td align="center">
          <table
            class="email-content"
            width="100%"
            cellpadding="0"
            cellspacing="0"
            role="presentation"
          >
            <tr>
              <td class="email-masthead">
                <img
                  src="https://res.cloudinary.com/cariasj/image/upload/v1682819141/sica_horizontal_logo_o1jiad.png"
                  alt="sica logo"
                  height="60px"
                />
              </td>
            </tr>

            <!-- Email Body -->
            <tr>
              <td
                class="email-body"
                width="570"
                cellpadding="0"
                cellspacing="0"
              >
                <table
                  class="email-body_inner"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <!-- Body content -->
                  <tr>
                    <td class="content-cell">
                      <img
                        class="email-main-header-image"
                        src="https://res.cloudinary.com/cariasj/image/upload/v1682819141/email_header_image_tovmzk.png"
                        alt="forgot password illustration"
                      />
                      <div class="f-fallback">
                        <h1>Datos de inicio de sesión</h1>
                        <h2>Hola ${name},</h2>
                        <p>
                          A continuación se detallan sus datos
                          de acceso al sistema SICA.
                        </p>

                        <p class="user-data">• Correo: ${email}</p>

                        <p class="user-data">• Contraseña: ${password}</p>

                        <p>
                          Si usted no ha solicitado este cambio, puede que
                          alguien esté intentando acceder a su cuenta. Por
                          favor, contacte con el administrador del sistema.
                        </p>
                        <p>Gracias, <br />El equipo de SICA.</p>
                      </div>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
            <tr>
              <td>
                <table
                  class="email-footer"
                  align="center"
                  width="570"
                  cellpadding="0"
                  cellspacing="0"
                  role="presentation"
                >
                  <tr>
                    <td class="footer" align="center">
                      <p>
                        Este correo electrónico se ha generado automáticamente.
                        Por favor, no responda a este mensaje.
                      </p>
                      <p>SICA App &trade;</p>
                      <p>Copyright &copy; 2023 by Beelders.</p>
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
      `,
    });
  } catch (error) {
    console.error(error);
  }
};

//Function to send a password email
const passChangeSuccessEmail = async (emailData) => {
  try {
    console.log('Enviando correo:', emailData);
    const transporter = nodemailer.createTransport({ ...smtpOptions });
    const { email, name } = emailData;

    await transporter.sendMail({
      from: originEmail,
      subject: 'Contraseña actualizada | SICA',
      to: email,
      html: `
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="x-apple-disable-message-reformatting" />
        <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
        <meta name="color-scheme" content="light" />
        <meta name="supported-color-schemes" content="light" />
        <title></title>
        <style type="text/css" rel="stylesheet" media="all">
          /* Base ------------------------------ */
    
          @import url('https://fonts.googleapis.com/css?family=Nunito+Sans:400,700&display=swap');
          body {
            width: 100% !important;
            height: 100%;
            margin: 0;
            -webkit-text-size-adjust: none;
          }
    
          td {
            word-break: break-word;
          }
    
          .preheader {
            display: none !important;
            visibility: hidden;
            font-size: 1px;
            line-height: 1px;
            max-height: 0;
            max-width: 0;
            opacity: 0;
            overflow: hidden;
          }
    
          /* Type ------------------------------ */
          * {
            font-family: 'Nunito Sans', Helvetica, Arial, sans-serif;
            color: #444;
          }
    
          h1 {
            text-align: center;
          }
    
          h2 {
            margin-top: 0;
            font-size: 22px;
            font-weight: bold;
            text-align: left;
          }
    
          td,
          th {
            font-size: 16px;
          }
    
          p,
          ul,
          ol,
          blockquote {
            margin: 0.4em 0 1.1875em;
            font-size: 16px;
            line-height: 1.625;
          }
    
          p.sub {
            font-size: 13px;
          }
    
          body {
            background-color: #f2f4f6;
          }
    
          .email-wrapper {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #f2f4f6;
          }
    
          .email-content {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
          /* Masthead ----------------------- */
    
          .email-masthead {
            padding: 25px 0;
            text-align: center;
          }
    
          .email-masthead_logo {
            width: 94px;
          }
    
          .email-masthead_name {
            font-size: 16px;
            font-weight: bold;
            color: #a8aaaf;
            text-decoration: none;
            text-shadow: 0 1px 0 white;
          }
          /* Body ------------------------------ */
    
          .email-body {
            width: 100%;
            margin: 0;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
          }
    
          .email-body_inner {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            background-color: #ffffff;
          }
    
          .email-footer {
            width: 570px;
            margin: 0 auto;
            padding: 0;
            -premailer-width: 570px;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
    
          .email-footer p {
            color: #a8aaaf;
          }
    
          .body-action {
            width: 100%;
            margin: 30px auto;
            padding: 0;
            -premailer-width: 100%;
            -premailer-cellpadding: 0;
            -premailer-cellspacing: 0;
            text-align: center;
          }
    
          .body-sub {
            margin-top: 25px;
            padding-top: 25px;
            border-top: 1px solid #eaeaec;
          }
    
          .user-data {
            padding-left: 3rem;
          }
    
          .email-main-header-image {
            width: 100%;
            object-fit: cover;
            padding: 0;
            margin: 0;
          }
    
          .f-fallback {
            padding: 2rem;
          }
    
          .footer p {
            font-size: 0.8rem;
          }
    
          /*Media Queries ------------------------------ */
    
          @media only screen and (max-width: 45rem) {
            .email-body_inner,
            .email-footer {
              width: 90% !important;
            }
          }
        </style>
      </head>
      <body>
        <table
          class="email-wrapper"
          width="100%"
          cellpadding="0"
          cellspacing="0"
          role="presentation"
        >
          <tr>
            <td align="center">
              <table
                class="email-content"
                width="100%"
                cellpadding="0"
                cellspacing="0"
                role="presentation"
              >
                <tr>
                  <td class="email-masthead">
                    <img
                      src="https://res.cloudinary.com/cariasj/image/upload/v1682819141/sica_horizontal_logo_o1jiad.png"
                      alt="sica logo"
                      height="60px"
                    />
                  </td>
                </tr>
    
                <!-- Email Body -->
                <tr>
                  <td
                    class="email-body"
                    width="570"
                    cellpadding="0"
                    cellspacing="0"
                  >
                    <table
                      class="email-body_inner"
                      align="center"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <!-- Body content -->
                      <tr>
                        <td class="content-cell">
                          <img
                            class="email-main-header-image"
                            src="https://res.cloudinary.com/cariasj/image/upload/v1682826390/2_ozxjuy.png"
                            alt="changed password illustration"
                          />
                          <div class="f-fallback">
                            <h1>Contraseña actualizada</h1>
                            <h2>Hola ${name},</h2>
                            <p>
                              Le informamos que su contraseña ha sido actualizada
                              exitosamente.
                            </p>
    
                            <p>
                              Si usted no ha realizado este cambio, puede que
                              alguien esté intentando acceder a su cuenta. Por
                              favor, contacte con el administrador del sistema.
                            </p>
                            <p>Gracias, <br />El equipo de SICA.</p>
                          </div>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
                <tr>
                  <td>
                    <table
                      class="email-footer"
                      align="center"
                      width="570"
                      cellpadding="0"
                      cellspacing="0"
                      role="presentation"
                    >
                      <tr>
                        <td class="footer" align="center">
                          <p>
                            Este correo electrónico se ha generado automáticamente.
                            Por favor, no responda a este mensaje.
                          </p>
                          <p>SICA App &trade;</p>
                          <p>Copyright &copy; 2023 by Beelders.</p>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>
        </table>
      </body>
    </html>    
        `,
    });
  } catch (error) {
    console.error(error);
  }
};

//Exports
module.exports = { sendPasswordEmail, passChangeSuccessEmail };
