'use strict';
function isArray(obj) {
    return Object.prototype.toString.call(obj) === "[object Array]";
}
function isObject(obj) {
    return Object.prototype.toString.call(obj) === "[object Object]";
}

function isDate(obj) {
    return Object.prototype.toString.call(obj) === "[object Date]";
}

function toJson(value) {
    var jsonObj = {};
    try {
        jsonObj = JSON.parse(value);
    } catch (e) {
        console.log('to json parse error');
    }
    return jsonObj;
}
function serializeValue(v) {
    if (isObject(v)) {
        return isDate(v) ? v.toISOString() : toJson(v);
    }
    return v;
}
function encodeUriQuery(val, pctEncodeSpaces?) {
    return encodeURIComponent(val).
        replace(/%40/gi, '@').
        replace(/%3A/gi, ':').
        replace(/%24/g, '$').
        replace(/%2C/gi, ',').
        replace(/%20/g, (pctEncodeSpaces ? '%20' : '+'));
}

export function jQueryLikeParamSerializer(params) {
    if (!params) return '';
    var parts = [];
    serialize(params, '', true);
    return parts.join('&');

    function serialize(toSerialize: any, prefix: any, topLevel?: any) {
        if (isArray(toSerialize)) {
            toSerialize.forEach((value, index) => {
                serialize(value, prefix + '[' + (isObject(value) ? index : '') + ']');
            });
        } else if (isObject(toSerialize) && !isDate(toSerialize)) {
            for (let key in toSerialize) {
                serialize(toSerialize[key], prefix +
                    (topLevel ? '' : '.') +
                    key +
                    (topLevel ? '' : ''));

                // serialize(toSerialize[key], prefix +
                //     (topLevel ? '' : '[') +
                //     key +
                //     (topLevel ? '' : ']'));
            }
        } else {
            parts.push(encodeUriQuery(prefix) + '=' +
                (toSerialize == null ? '' : encodeUriQuery(serializeValue(toSerialize))));
        }
    }
}
