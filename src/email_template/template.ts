function forgot_pwd(form: any){
    const data = `
        Hello "${form.name}"!
        Please click the following link to reset your password
        "${form.link}"
        Regards,
        #WNC
        
        ----
        WNC - Support Team
        Hotline: (+84)000 111 000
        
        Follow Us at:
        - Facebook: https://facebook.com/groups/wnc
        - Youtube: https://www.youtube.com/channel/wnc
        - Instagram: https://instagram.com/wnc'
        `
        return data;
    }

export default {forgot_pwd}