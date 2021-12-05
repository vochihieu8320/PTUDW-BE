
   function mail_options(user_mail: string, content: string, subject: string)
    {
        const mailOptions = {
            from: process.env.email_name,
            to: user_mail,
            subject: subject,
            text: content
          };
        return mailOptions;
    }

    function send_mail(transporter: any, mailOptions: any)
    {
        transporter.sendMail(mailOptions, function(error: any, info: any) {
            if (error) {
              console.log("error", error)
            } else {
             
            }
          });
    }



export default {mail_options, send_mail}