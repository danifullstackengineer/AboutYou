const getVoucherStorage = ():string | undefined => {
    const voucher = localStorage.getItem('voucher')
    if (voucher) {
        return voucher;
    }
    return undefined;
}

export { getVoucherStorage };