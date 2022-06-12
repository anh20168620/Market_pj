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
    },

    // get reports
    get: async (req, res) => {
        try {
            const report = await Report.find().populate('userId productId', 'fullName avatar title numberPhone').sort({ 'createdAt': -1 })
            const total = await Report.find().countDocuments()

            return res.status(200).json({ success: true, report, total })
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })
        }
    },

    // delete report
    delete: async (req, res) => {
        const reportId = req.params.reportId
        console.log(reportId);
        try {
            if (reportId) {
                const total = await Report.find().countDocuments()
                await Report.findByIdAndDelete(reportId)
                const newReports = await Report.find().populate('userId productId', 'fullName avatar title numberPhone').sort({ 'createdAt': -1 })

                res.status(200).json({ success: true, newReports, total: total - 1 })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    },
    // get report by id
    getReport: async (req, res) => {
        const reportId = req.query.reportId
        try {
            const report = await Report.findById(reportId).populate('userId productId', 'fullName avatar title numberPhone')
            if (report) {
                res.status(200).json({ success: true, report: report })
            } else {
                res.status(404).json({ success: false, message: "Không tìm thấy báo cáo" })
            }
        } catch (error) {
            res.status(500).json({ success: false, message: error.message })

        }
    }
}


module.exports = reportController