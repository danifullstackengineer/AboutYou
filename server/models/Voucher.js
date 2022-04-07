import mongoose from 'mongoose';

const voucherTable = new mongoose.Schema({
    voucher: String,
    value: Number,
    startDate: {
        type: Date,
        default: new Date()
    },
    endDate: Date,
})

export default mongoose.model('Voucher', voucherTable)