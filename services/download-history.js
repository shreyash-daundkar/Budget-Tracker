const DownloadHistory = require('../models/download-history');



exports.createDownloadHistory = async options => {
    try {
        const { downloadHistoryObj } = options;
        
        const downloadHistory = await new DownloadHistory( downloadHistoryObj );

        await downloadHistory.save();
        return;

    } catch (error) {
        throw error;
    }
}


exports.readDownloadHistorys = async options => {
    try {
        const { userId } = options;

        const downloadHistorys = await DownloadHistory.find({ userId }).lean();

        downloadHistorys.forEach(downloadHistory => downloadHistory.id = downloadHistory._id.toString());
        
        return downloadHistorys;
    } catch (error) {
        throw error;
    }
}