

const mailNotifyTemplate = (title, content, productTitle) => {
    return `
    <div style="font-size:22px; font-weight:bold; text-align:center; margin-bottom:20px">Thông báo vi phạm từ chợ Việt</div>
    <div style="font-size:18px">Bài đăng <span style="font-size:18px; font-weight:bold">${productTitle}</span> của bạn đã bị báo cáo và chúng tôi đã xác minh báo cáo này. Bài đăng này của bạn đã vi phạm <span style="font-size:18px; font-weight:bold">${title}</span>. Chúng tôi đã xóa bài đăng của bạn khỏi hệ thống. Vui lòng đọc kỹ quy tắc khi đăng bài trên hệ thống ! </div>
    <br />
    <div  style="font-size:18px">Chi tiết báo cáo : <span style="font-size:18px; font-weight:bold">${content}</span></div>
   
    `
}

module.exports = mailNotifyTemplate