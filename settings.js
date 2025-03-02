let data = localStorage.getItem('data.mdm') ? JSON.parse(localStorage.getItem('data.mdm')) : saveFile;

localStorage.setItem('data.mdm', JSON.stringify(data))
let updaterVar;

let fireIconBeingCreated = false;
function makeFireIcon() {
    if (fireIconBeingCreated == true) {
        document.getElementById('fireIconTextButton').style.display = '';
        document.getElementById('add_fire_icon').remove();
        fireIconBeingCreated = false;
        return;
    }
    document.getElementById('fireIconTextButton').style.display = 'none';
    fireIconBeingCreated = true;
    let div = document.createElement('div');
    div.id = "add_fire_icon";
    div.innerHTML = `
        <label>Name: </label><input type="text" id="fireIcon" placeholder="Fire Icon 1"><br>
        <label>Threshold: </label><input type="text" id="fireIconThreshold" placeholder="1000"><br>
        <label>Method: </label><select id="fireIconMethod">
            <option value="<">Greater Than</option>
            <option value="=">Equal To</option>
            <option value=">">Less Than</option>
        </select><br>
        <label>Fire Icon:</label><input type="text" id="fireIconUrl" placeholder="https://example.com/image.png"><label> or </label><input type="file" id="fireIconFile"><br>
        <button onclick="saveFireIcon()">Add</button>
        <button onclick="makeFireIcon()">Cancel</button>
    `
    document.getElementById('addFireElement').appendChild(div);
}

function createSettings() {
    let elements = ``;

    elements += `
    <div class="settings_child">
        <div>
            <label>Paused: </label><input id="paused" type="checkbox" ${data.paused ? 'checked' : ''}>
        </div>
        <div>
            <label>Autosave: </label><input id="autosave" type="checkbox" ${data.autosave ? 'checked' : ''}>
        </div>
        <div>
            <label>Offline Gains: </label><input id="offlineGains" type="checkbox" ${data.offlineGains ? 'checked' : ''}>
        </div>
        <div>
            <label>Hide Settings Button: </label><input id="hideSettings" type="button" value="${data.hideSettings}">
        </div>
        <div>
            <label>Sort By: </label><select id="sortBy">
                <option value="subscribers" ${data.display.sortBy == 'subscribers' ? 'selected' : ''}>Subscribers</option>
                <option value="name" ${data.display.sortBy == 'name' ? 'selected' : ''}>Name</option>
            </select>
        </div>
        <div>
            <label>Sort Direction: </label><select id="sortDirection">
                <option value="asc" ${data.display.sortDirection == 'asc' ? 'selected' : ''}>Assending</option>
                <option value="desc" ${data.display.sortDirection == 'desc' ? 'selected' : ''}>Desending</option>
            </select>
        </div>
        <div>
            <button onclick="saveSettings()">Save</button>
            <button onclick="exportSettings()">Export (public)</button>
            <button onclick="exportSettings(true)">Export (private)</button>
        </div>
    </div>
    <hr>
    <div class="settings_child2">
        <div>
            <label>Add New User:</label><br>
            <input placeholder="ID (optional)" id="newUserID"><br>
            <input placeholder="Username" id="newUsername"><br><br>
            <input placeholder="Avatar URL" id="newAvatarURL"><input id="newAvatarFile" placeholder="Image" type="file" style="color: rgb(255, 255, 255);"><br>
            
            <input placeholder="Count" id="newCountValue"><br><br>

            <label>Gain Type:</label>
            <select id="newGainType">
                <option value="minMax">Min/Max (Default)</option>
                <option value="gaussian">Gaussian</option>
                <option value="custom">Custom</option>
            </select>
            <div id="newGainType_minMax">
                <input placeholder="Min Gain" id="newMinValue">
                <input placeholder="Max Gain" id="newMaxValue"><br>
            </div>
            <div id="newGainType_gaussian" class="newGainType">
                <input placeholder="Mean Rate" id="newMean">
                <input placeholder="Standard Deviation" id="newStdDev"><br>
            </div>
            <div id="newGainType_custom" class="newGainType">
                <textarea id="newCustomGain" name="customRate" 
                    placeholder="Min1,Max1,Weight1 Min2,Max2,Weight2"></textarea>
            </div>
            <button onclick="createUser()">Add User</button>
        </div>
        <div>
            <label>Edit User:</label><br>
            <input placeholder="Username" id="editUsername"><br>
            <input placeholder="Avatar URL" id="editAvatarURL"><input id="editAvatarFile" placeholder="Image" type="file" style="color: rgb(255, 255, 255);"><br>
            
            <input placeholder="Count" id="editCountValue"><br><br>

            <label>Gain Type:</label>
            <select id="editGainType">
                <option value="minMax">Min/Max (Default)</option>
                <option value="gaussian">Gaussian</option>
                <option value="custom">Custom</option>
            </select>
            <div id="newGainType_minMax">
                <input placeholder="Min Gain" id="newMinValue">
                <input placeholder="Max Gain" id="newMaxValue"><br>
            </div>
            <div id="newGainType_gaussian" class="newGainType">
                <input placeholder="Mean Rate" id="newMean">
                <input placeholder="Standard Deviation" id="newStdDev"><br>
            </div>
            <div id="newGainType_custom" class="newGainType">
                <textarea id="newCustomGain" name="customRate" 
                    placeholder="Min1,Max1,Weight1 Min2,Max2,Weight2"></textarea>
            </div>
            <div class="extra_buttons">
                <button>Save</button>
                <button>Export</button>
                <button>Duplicate</button>
                <button>Delete</button>
            </div>
        </div>
    </div><hr>
    <div class="settings_child">
        <div>
            <label>Display Settings:</label><br>
            <label>Images: </label><input id="displayImages" type="checkbox" ${data.show.images ? 'checked' : ''}><br>
            <label>Names: </label><input id="displayNames" type="checkbox" ${data.show.names ? 'checked' : ''}><br>
            <label>Ranks: </label><input id="displayRanks" type="checkbox" ${data.show.ranks ? 'checked' : ''}><br>
            <label>Counts: </label><input id="displayCounts" type="checkbox" ${data.show.counts ? 'checked' : ''}>
        </div>
        <div>
            <label>Odometer Settings:</label><br>
            <label>Up Color: </label><input id="upColor" type="color" value="${data.odometers.upColor}"><br>
            <label>Down Color: </label><input id="downColor" type="color" value="${data.odometers.downColor}"><br>
            <label>Speed: (in milliseconds): </label><input id="speed" value="${data.odometers.speed}"><br>
            <label>Animate Counts: </label><input id="animate" type="checkbox" ${data.odometers.animate ? 'checked' : ''}><br>
            <label>Abbreviate Counts: </label><input id="abbreviated" type="checkbox" ${data.odometers.abbreviated ? 'checked' : ''}><br>
            <label>Allow Negative Counts: </label><input id="allowNegative" type="checkbox" ${data.odometers.allowNegative ? 'checked' : ''}>
            <label>Display Decimals: </label><input id="displayDecimals" type="checkbox" ${data.odometers.displayDecimals ? 'checked' : ''}>
        </div>
        <div>
            <label>Updates & Display Settings:</label><br>
            <label>Update Interval (in milliseconds): </label><input id="interval" value="${data.updates.interval}"><br>
            <label>Update Method: </label><select id="updateMethod">
                <option value="normal" ${!data.updates.randomCountUpdateTime && !data.updates.waterFallCountUpdateTime ? 'selected' : ''}>All (Default)</option>
                <option value="randomCountUpdateTime" ${data.updates.randomCountUpdateTime ? 'selected' : ''}>Random</option>
                <option value="waterFallCountUpdateTime" ${data.updates.waterFallCountUpdateTime ? 'selected' : ''}>Waterfall</option>
            </select><br>
            <label>Prepend Zeros To Ranks: </label><input id="prependZerosToRanks" type="checkbox" checked>
        </div>
        <div>
            <label>Style Settings:</label><br>
            <label>Background Color: </label><input id="backgroundColor" type="color" value="${data.styles.quickStyles.backgroundColor}"><br>
            <label>Text Color: </label><input id="textColor" type="color" value="${data.styles.quickStyles.textColor}"><br>
            <label>Box Color: </label><input id="boxColor" type="color" value="${data.styles.quickStyles.boxColor}"><br>
            <label>Border Color: </label><input id="borderColor" type="color" value="${data.styles.quickStyles.borderColor}"><br>
            <label>Image Border Color: </label><input id="imageBorderColor" type="color" value="${data.styles.quickStyles.imageBorderColor}"><br>

            <label>Box Border Radius: </label><input id="backgroundColor" placeholder="5" value="${data.styles.quickStyles.boxBorderRadius}"><br>
            <label>Image Border Radius: </label><input id="backgroundColor" placeholder="50 = circle" value="${data.styles.quickStyles.imageBorderRadius}"><br>

        </div>
    </div><hr>
    <div class="settings_child">
        <div>
            <label>Audit Settings:</label><br>
            <label>Enabled: </label><input id="auditEnabled" type="checkbox" ${data.audit.enabled ? 'checked' : ''}>
            <label>Audit Interval (in milliseconds): </label><input id="auditInterval" value="${data.audit.interval}"><br>
            <label>Random Interval: </label><input id="RandomAuditEnabled" type="checkbox" ${data.audit.randomInterval ? 'checked' : ''}><input id="randomAuditIntervalMin" value="${data.audit.randomIntervalMinMax[0]}"><input id="randomAuditIntervalMax" value="${data.audit.randomIntervalMinMax[1]}">
            <br><label>Audit Gain/Loss: </label><input id="auditGainMin" value="${data.audit.gainLoss[0]}"><input id="auditGainMax" value="${data.audit.gainLoss[1]}">
            <br><hr><br>
            <label>Stream Settings:</label><br>
            <button>Connect To Stream</button><br><br>
            
            <label>!add</label><br>
            <input class="inputDiv" readonly value="$(urlfetch https://api.lcedit.com/${data.uuid}/$(userid)/$(query)?returnText=Added $(user)!)"><br><br>
            <label>!edit</label><br>
            <input class="inputDiv" readonly value="$(urlfetch https://api.lcedit.com/${data.uuid}/$(userid)/$(query)?value=edit&returnText=Edited $(user)!)"><br><br>
            <label>!upload</label><br>
            <input class="inputDiv" readonly value="$(urlfetch https://api.lcedit.com/${data.uuid}/$(userid)?values=10,20&returnText=$(user) uploaded $(query)!)"><br><br>
            <label>!subs</label><br>
            <input class="inputDiv" readonly value="$(urlfetch https://api.lcedit.com/${data.uuid}/$(userid)/user)"><br><br>
        </div>
        <div>
            <label>Fire Icons:</label><br>
            <label>Enabled: </label><input id="fireEnabled" type="checkbox" ${data.fireIcons.enabled ? 'checked' : ''}><br>
            <label>Type: </label><select id="checkType">
                <option value="gain" ${data.fireIcons.type == 'gain' ? 'selected' : ''}>Gain (Default)</option>
                <option value="total" ${data.fireIcons.type == 'total' ? 'selected' : ''}>Total</option>
            </select><br>
            <label>Gain Over (ignore if total): </label><select id="gainOver">
                <option value="day" ${data.fireIcons.gainOver == 'day' ? 'selected' : ''}>Day</option>
                <option value="hour" ${data.fireIcons.gainOver == 'hour' ? 'selected' : ''}>Hour (Default)</option>
                <option value="minute" ${data.fireIcons.gainOver == 'minute' ? 'selected' : ''}>Minute</option>
                <option value="update" ${data.fireIcons.gainOver == 'update' ? 'selected' : ''}>Update (per update)</option>
            </select><br>
            <label>Fire Card Border Radius: </label><input id="fireBorderRadius" value="${data.fireIcons.fireBorderRadius}"><br>
            <label>Fire Card Border Width: </label><input id="fireBorderWidth" value="${data.fireIcons.fireBorderWidth}"><br>
            <label>Fire Card Border Color: </label><input id="fireBorderColor" value="${data.fireIcons.fireBorderColor}"><br><br>
            <hr><br>
                <div id="fireIconsContainer">
                    ${data.fireIcons.created.map((icon, index) => {
        return `<div class="fireIcon" id="fireIcon${index}">
                            <label>Icon Name: </label><input id="iconName${index}" value="${icon.name}"><br>
                            <label>Icon Threshold: </label><input id="iconThreshold${index}" value="${icon.threshold}"><br>
                            <label>Method: </label><select id="iconMethod${index}">
                                <option value="<" ${icon.method == '>=' ? 'selected' : ''}>Greater Than</option>
                                <option value="=" ${icon.method == '=' ? 'selected' : ''}>Equal To</option>
                                <option value=">" ${icon.method == '<=' ? 'selected' : ''}>Less Than</option>
                            </select><br>
                            <label>Icon Icon: </label><input id="iconIcon${index}" value="${icon.icon}"><br>
                            <input placeholder="Image" type="file" style="color: rgb(255, 255, 255);"><br>
                            <div class="fireIconButtons">
                                <button>Save Fire Icon</button>
                                <button>Remove Fire Icon</button>
                            </div>
                        </div>
                    `}).join('')}
                </div>
            <hr>
            <div class="fireIconButtons">
                <button onclick="makeFireIcon()" id="fireIconTextButton">Create New Fire Icon</button>
            </div>
            <hr>
            <div id="addFireElement"></div>
        </div>
        <div>
            <label>API Updates:</label><br>
            <div id="apiSettings">
                <label style="color: rgb(255, 255, 255);">Make sure the part to include the channel is at the very end and left open OR use
                <strong style="color: rgb(255, 255, 255);">{{channels}}</strong> to indentify where they should go.</label>
                    <input id="apiLink" placeholder="https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&amp;key=key&amp;id="><select autocomplete="off" id="apiType">
                        <option value="none">Max Channels Per Fetch (1)</option>
                        <option value="one">1 Channel</option>
                        <option value="ten">10 Channels</option>
                        <option value="twentyfive">25 Channels</option>
                        <option value="fifty">50 Channels</option>
                        <option value="all">All</option>
                    </select>
                    <br>
                    <label style="color: rgb(255, 255, 255);">Loop through (data = root): </label><input id="apiLoop" placeholder="data.items" autocomplete="off"><br>
                    <label style="color: rgb(255, 255, 255);">Method: <select id="apiMethod" autocomplete="off">
                        <option value="GET">GET</option>
                        <option value="POST">POST</option>
                    </select></label>
                    <div class="apiExtraStuff">
                    <div>
                        <div>
                            <h3 style="color: rgb(255, 255, 255);">Headers (optional)</h3>
                            <textarea id="extraCred" placeholder="Authorization: auth code;
                            Authorization2: auth code2;" autocomplete="off" class="creds"></textarea><br>
                        </div>
                        <div>
                            <h3 style="color: rgb(255, 255, 255);">Body: (optional)</h3>
                            <textarea id="body" placeholder="value1=lol;
                                value2=lol;" autocomplete="off" class="creds"></textarea><br>
                        </div>
                    </div>
                    <div>
                        <h3 style="color: rgb(255, 255, 255);">Updates</h3>
                        <input type="checkbox" id="updateName" autocomplete="off"><label style="color: rgb(255, 255, 255);">Name </label><input id="pathName" placeholder="snippet.title" autocomplete="off"><br>
                        <input type="checkbox" id="updateImage" autocomplete="off"><label style="color: rgb(255, 255, 255);">Image
                        </label><input id="pathImage" placeholder="snippet.thumbnails.default.url" autocomplete="off"><br>
                        <input type="checkbox" id="updateCount" autocomplete="off"><label style="color: rgb(255, 255, 255);">Count
                        </label><input id="pathCount" placeholder="statistics.subscriberCount" autocomplete="off"><br><br>

                        <label style="color: rgb(255, 255, 255);">ID (Required) </label><input id="pathID" placeholder="id" autocomplete="off"><br><br>
                        <input type="checkbox" id="IDIncludes" autocomplete="off"><label style="color: rgb(255, 255, 255);">Click to disect the
                                    id from a string like "https://banner.yt/UCX6OQ3DkcsbYNE6H8uQQuVA"</label>
                    </div>
                </div><hr>
            </div>
        </div>
    </div>`

    document.getElementById('settings').innerHTML = elements;

    const gainValues = ['minMax', 'gaussian', 'custom'];
    document.getElementById('newGainType').addEventListener('change', function () {
        for (let i = 0; i < gainValues.length; i++) {
            document.getElementById(`newGainType_${gainValues[i]}`).style.display = 'none'
        };
        document.getElementById(`newGainType_${this.value}`).style.display = 'block';
    });
    document.getElementById('editGainType').addEventListener('change', function () {
        for (let i = 0; i < gainValues.length; i++) {
            document.getElementById(`editGainType_${gainValues[i]}`).style.display = 'none'
        };
        document.getElementById(`editGainType_${this.value}`).style.display = 'block';
    });
};

createSettings();

function resetAddUserForm() {
    document.getElementById('newUserID').value = '';
    document.getElementById('newGainType').value = 'minMax';
    document.getElementById('newMinValue').value = '';
    document.getElementById('newMaxValue').value = '';
    document.getElementById('newMean').value = '';
    document.getElementById('newStdDev').value = '';
    document.getElementById('newCustomGain').value = '';
    document.getElementById('newAvatarURL').value = '';
}

function random(min = 0, max = 1) {
    return (parseFloat(min) + Math.random() * (parseFloat(max) - parseFloat(min))) || 0;
}
function randomGaussian(mean, stdev) {
    let a = 0, b = 0;
    while (!a) a = Math.random();
    while (!b) b = Math.random();
    return Math.sqrt(-2 * Math.log(a)) * Math.cos(2 * Math.PI * b) * parseFloat(stdev) + parseFloat(mean);
}
function randomFromCustomDistribution(data) {
    if (typeof data != 'object' || !data.entries || !data.entries.length || !data.totalWeight || data.totalWeight < 0) return 0;
    const a = Math.random() * data.totalWeight;
    let i = 0;
    while (a > data.entries[i]?.cutoff && data.entries[i]) {
        i++;
    }
    return LCEDIT.util.random(data.entries[i].min, data.entries[i].max);
}
function createCustomDistribution(data) {
    try {
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
    } catch (e) {
        alert('Error creating custom distribution: ' + e.message);
    }
}

function createUser() {
    let id = document.getElementById('newUserID').value.length > 0 ? document.getElementById('newUserID').value : uuidv4()
    for (i = 0; i < data.users.length; i++) {
        if (data.users[i].id === id) return alert('User already exists!');
    }

    let gainValues = [];
    if (document.getElementById('newGainType').value == 'minMax') {
        gainValues[0] = document.getElementById('newMinValue').value;
        gainValues[1] = document.getElementById('newMaxValue').value;
    } else if (document.getElementById('newGainType').value == 'gaussian') {
        gainValues[0] = document.getElementById('newMean').value;
        gainValues[1] = document.getElementById('newStdDev').value;
    } else if (document.getElementById('newGainType').value == 'custom') {
        gainValues = createCustomDistribution(document.getElementById('newCustomGain'));
    }

    let avatarValue = document.getElementById('newAvatarURL').value;
    if (document.getElementById('newAvatarFile').files.length > 0) {
        avatarValue = URL.createObjectURL(document.getElementById('newAvatarFile').files[0]);
    }

    let userObject = {
        id: id,
        counts: [{
            label: 'subscribers',
            value: parseInt(document.getElementById('newCountValue').value),
            lastCount: parseInt(document.getElementById('newCountValue').value),
            pastValues: [[new Date().getTime(), parseInt(document.getElementById('newCountValue').value)]],
            customStyles: []
        }],
        gains: {
            type: document.getElementById('newGainType').value,
            values: gainValues
        },
        metadata: {
            name: document.getElementById('newUsername').value,
            description: null,
            avatar: avatarValue,
            banner: null
        }
    }

    resetAddUserForm();
    data.users.push(userObject);
}

function saveSettings() {
    localStorage.setItem('data.mdm', JSON.stringify(data));
}

function updater() {
    let sortValue = data.display.sortBy;

    data.users.sort((a, b) => {
        let aStat = a.counts.find(stat => stat.label === sortValue);
        let bStat = b.counts.find(stat => stat.label === sortValue);

        let aValue = aStat ? aStat.value : 0;
        let bValue = bStat ? bStat.value : 0;

        return bValue - aValue;
    });

    if (data.display.sortDirection == 'asc') {
        data.users = data.users.reverse();
    }

    data.users.forEach(user => {
        let toUpdateStat = user.counts.find(stat => stat.label === sortValue);
        if (toUpdateStat) {
            toUpdateStat.lastCount = toUpdateStat.value;
            toUpdateStat.pastValues.push([new Date().getTime(), parseInt(toUpdateStat.value)]);

            let statToAdd = 0;
            if (user.gains.type == 'minMax') {
                statToAdd = random(user.gains.values[0], user.gains.values[1]);
            }

            toUpdateStat.value += statToAdd;

            while (toUpdateStat.pastValues.length > data.graphs.maxLength) {
                toUpdateStat.pastValues.shift();
            }
        } else {
            console.log(`Stat ${sortValue} not found for user ${user.id}`);
        }
    });

    updateDisplayCounts();
}

function updateDisplayCounts() {
    data.users.forEach((user, index) => {
        const card = document.getElementById(`card${index + 1}`);
        let rank = index + 1;
        rank = rank.length < 2 ? `0${rank}` : rank;
        document.getElementById(`rank-${index + 1}`).textContent = rank;
        document.getElementById(`title${index + 1}`).textContent = user.metadata.name;
        if (data.odometers.displayDecimals) {
            document.getElementById(`count${index + 1}`).textContent = user.counts[0].value;
        } else {
        document.getElementById(`count${index + 1}`).textContent = Math.floor(user.counts[0].value);
        }
        document.getElementById(`title${index + 1}`).textContent = user.metadata.name;
        document.getElementById(`img${index + 1}`).src = user.metadata.avatar;
    });
}

if (!data.paused) {
    updaterVar = setInterval(updater, data.updates.interval)
}

if (data.autosave) {
    setInterval(saveSettings, 15000);
}