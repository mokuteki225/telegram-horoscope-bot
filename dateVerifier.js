module.exports.verifyDate = (str) => {
    if (str.length !== 5) return false;
    if (+str[0] === NaN || +str[0] < 0 || +str[0] > 2) return false;
    if (+str[1] === NaN || +str[1] < 0) return false;
    if(+str[0] === 2 && +str[1] > 4) return false;
    if (str[2] !== ':') return false;
    if (+str[3] === NaN || +str[3] < 0 || +str[3] > 5) return false;
    if (+str[4] === NaN || +str[4] < 0 || +str[4] > 9) return false;

    return true
}