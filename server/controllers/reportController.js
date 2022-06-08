const Report = require('../models/Report.model')

const reportController = {
    // save report 
    save: async (req, res) => {
        const body = req.body;
        try {
            if (body) {
                const newReport = await new Report({
                    userId: body.userId,
                    productId: body.productId,
                    title: body.title,
                    content: body.content,
                })

                await newReport.save()
                res.status(200).json({ success: true, message: "Gửi báo cáo thành công, chúng tôi sẽ phản hồi sớm nhất" })
            }

        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    }
}


module.exports = reportController