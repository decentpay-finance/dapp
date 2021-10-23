


const StringUtil = {
    shortenWallet:function(wallet){
        try {            
            var start = wallet.slice(0, 7).concat("....").concat(wallet.slice(wallet.length-5, wallet.length))
            return start;
        } catch (error) {
            return "";
        }
    }
}

export default StringUtil


