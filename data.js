function uuidv4() {
    return "10000000-1000-4000-8000-100000000000".replace(/[018]/g, c =>
        (+c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> +c / 4).toString(16)
    );
}

const item = {
    id: uuidv4(),
    counts: [{
        label: 'subscribers',
        value: 0,
        lastCount: 0,
        pastValues: [],
        customStyles: {}
    }],
    gains: {
        type: 'minMax',
        values: []
    },
    metadata: {
        name: 'loading',
        description: 'loading',
        avatar: './default.png',
        banner: './default.png'
    }
}

const saveFile = {
    uuid: uuidv4(),
    lastOnline: new Date(),
    lastSaved: new Date(),
    paused: false,
    autosave: true,
    offlineGains: false,
    users: [item],
    type: 'top50',
    updates: {
        interval: 2000,
        randomCountUpdateTime: false,
        waterFallCountUpdateTime: false
    },
    display: {
        maxLoading: 1,
        sortBy: 'subscribers',
        sortDirection: 'desc',
        prependZerosToRanks: false,
        displayCount: 'subscribers'
    },
    show: {
        images: false,
        names: false,
        ranks: false,
        counts: false,
        banners: false,
        differences: false,
        graphs: false,
        emptySlots: false,
        footers: false
    },
    hideSettings: 'q',
    odometers: {
        upColor: '#FFFFFF',
        downColor: '#FFFFFF',
        speed: 1500,
        animate: true,
        abbreviated: false,
        allowNegative: false,
        displayDecimals: false
    },
    fireIcons: {
        enabled: false,
        type: "gain",
        gainOver: "hour",
        fireBorderRadius: 0,
        fireBorderWidth: 0,
        fireBorderColor: "transparent",
        created: [{
            name: "Rainbow",
            threshold: 100000,
            icon: "mdm_gifs/rainbow.gif",
            method: ">="
        }, {
            name: "Purple",
            threshold: 50000,
            icon: "mdm_gifs/purple.gif",
            method: ">="
        }, {
            name: "Blue",
            threshold: 20000,
            icon: "mdm_gifs/blue.gif",
            method: ">="
        }, {
            name: "Dark Red",
            threshold: 10000,
            icon: "mdm_gifs/dark_red.gif",
            method: ">="
        }, {
            name: "Red",
            threshold: 5000,
            icon: "mdm_gifs/red.gif",
            method: ">="
        }, {
            name: "Flame",
            threshold: 2000,
            icon: "mdm_gifs/flame.gif",
            method: ">="
        }, {
            name: "Ice",
            threshold: 100,
            icon: "mdm_gifs/ice.gif",
            method: "<="
        }]
    },
    apiUpdates: {
        enabled: false,
        url: "https://mixerno.space/api/youtube-channel-counter/user/{{channels}}",
        interval: 2000,
        method: "GET",
        body: {},
        headers: {},
        maxChannelsPerFetch: "one",
        response: {
            loop: "data",
            name: {
                enabled: true,
                path: "user[0].count"
            },
            count: {
                enabled: true,
                path: "counts[2].count"
            },
            image: {
                enabled: true,
                path: "user[1].count"
            },
            id: {
                IDIncludes: true,
                path: "user[2].count"
            }
        }
    },
    styles: {
        quickStyles: {
            backgroundColor: '#141414',
            textColor: '#FFF',
            boxColor: '#f7f5fe',
            borderColor: '#FFF',
            imageBorderColor: '#FFF',
            boxBorderRadius: 0,
            imageBorderRadius: 0
        }
    },
    stream: {
        enabled: false,
        gain_min: -10000,
        gain_max: 10000
    },
    audit: {
        interval: 2000,
        enabled: false,
        randomInterval: false,
        randomIntervalMinMax: [0, 1000],
        gainLoss: [0, 100]
    },
    graphs: {
        maxLength: 100,
        enabled: false,
        type: 'line'
    }
}