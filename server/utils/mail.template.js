

const MailTemplate = (url) => {
    return `
    <div style="font-size:20px; font-weight:bold; text-align:center; margin-bottom:20px">Chào mừng bạn đến với Chợ Việt</div>
    <a href=${url} style="margin: 0 auto; display:block; width:fit-content"><button style="padding:8px 16px; background-color: #ffcc00"> Xác thực email </button> </a>
    `
}

module.exports = MailTemplate