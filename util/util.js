function html_encode (str) {
    var s = "";
    if (str.length == 0) return "";
    s = s.replace(/\'/g, "&#39;");
    return s;
}

exports.html_encode = html_encode;