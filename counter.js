const LCEDIT = {
    util: {
        clamp: (input, min = Number.MIN_SAFE_INTEGER, max = Number.MAX_SAFE_INTEGER) => {
            if (isNaN(input)) input = 0;
            if (input < min) return min;
            if (input > max) return max;
            return input;
        },
        abb: (n) => {
            let s = Math.sign(n);
            n = Math.abs(n);
            if (n < 1) return 0;
            else return Math.round(s * Math.floor(n / (10 ** (Math.floor(Math.log10(n)) - 2))) * (10 ** (Math.floor(Math.log10(n)) - 2)));
        },
        random: (min = 0, max = 1) => {
            return (parseFloat(min) + Math.random() * (parseFloat(max) - parseFloat(min))) || 0;
        },
        randomGaussian: (mean, stdev) => {
            let a = 0, b = 0;
            while (!a) a = Math.random();
            while (!b) b = Math.random();
            return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b) * parseFloat(stdev) + parseFloat(mean);
        },
        randomFromCustomDistribution: (data) => {
            if (typeof data != 'object' || !data.entries || !data.entries.length || !data.totalWeight || data.totalWeight < 0) return 0;
            const a = Math.random() * data.totalWeight;
            let i = 0;
            while (a > data.entries[i]?.cutoff && data.entries[i]) {
                i++;
            }
            return LCEDIT.util.random(data.entries[i].min, data.entries[i].max);
        },
        createCustomDistribution: (data) => {
            const result = {
                totalWeight: 0,
                entries: []
            };
            let totalWeight = 0;
            const rows = data.split('\n')
            for (i = 0; i < rows.length; i++) {
                const rowData = rows[i].replace(/ +/g, '').split(',')
                totalWeight += parseFloat(rowData[2]) || 0;
                const entry = {
                    min: parseFloat(rowData[0]) || 0,
                    max: parseFloat(rowData[1]) || 0,
                    cutoff: totalWeight
                };
                result.entries.push(entry);
                result.totalWeight = totalWeight;
            }
            return result;
        },
        validateCustomDistribution: (data) => {
            const rows = data.split("\n");
            for (i = 0; i < rows.length; i++) {
                const rowData = rows[i].replace(/ +/g, '').split(',');
                if (!isFinite(parseFloat(rowData[0])) || !isFinite(parseFloat(rowData[1]))) {
                    return "All min and max values need to be valid."
                }
                if (!isFinite(parseFloat(rowData[2])) || parseFloat(rowData[2]) < 0) {
                    return "All row weights need to be valid."
                }
            }
            return "";
        },
        fillForms: (forms, formData) => {
            for (i = 0; i < forms.length; i++) {
                forms[i].reset();
                const inputs = forms[i].querySelectorAll('input,select');
                for (j = 0; j < inputs.length; j++) {
                    const v = formData[inputs[j].id];
                    if (v == undefined) continue;
                    if (typeof v === 'boolean') inputs[j].checked = v;
                    else inputs[j].value = v;
                }
                const textareas = forms[i].querySelectorAll('textarea');
                for (j = 0; j < textareas.length; j++) {
                    const v = formData[textareas[j].id];
                    if (v != undefined) textareas[j].value = v;
                }
            }
        },
        removePrivateData: data => {
            let d = JSON.parse(JSON.stringify(data));
            d.allowHTML = false;
            d.private = false;
            if (d.api) {
                d.api.ytAPIEnabled = false;
                d.api.ytAPIKey = '';
            }
            return d;
        },
        bringDownOverestimate: (actualCount, leeway) => {
            if (actualCount < 1000) return actualCount;
            let result = Math.floor(actualCount + (10 ** (Math.floor(Math.log10(actualCount)) - 2)) * (100 - leeway) / 100);
            if (leeway === 0) result -= 1;
            return result;
        }
    }
};

window.odometerOptions = {
    auto: false
};