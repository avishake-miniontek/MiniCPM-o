// Determine whether the terminal is a PC or a mobile terminal
export const isMobile = () => {
    let flag = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini|Linux/i.test(navigator.userAgent);
    const platform = navigator.platform;
    // Safari on iPad
    if (platform === 'MacIntel' && navigator.maxTouchPoints > 1) {
        flag = true;
    }
    return flag;
};
// Single-chip voice length (unit: ms)
const voicePerLength = 200;

// Picture counting, calculates when to send a picture at the same time as the voice. For example, a voice message is 100ms long and a voice message is sent once a second, which means that the 10th voice message needs to be accompanied by a picture.
export const maxCount = 1000 / voicePerLength;

export const getChunkLength = sampleRate => {
    return sampleRate * (voicePerLength / 1000);
};

export const isAvailablePort = port => {
    return [
        8000, 8001, 8002, 8003, 8004, 8010, 8011, 8012, 8013, 8014, 8020, 8021, 8022, 8023, 8024, 8025, 8026, 8027,
        8028, 32449
    ].includes(port);
};

// Convert files to base64 format
export const fileToBase64 = file => {
    return new Promise((resolve, reject) => {
        if (!file) {
            reject('The file cannot be empty');
        }
        const reader = new FileReader();
        reader.onload = e => {
            const base64String = e.target.result;
            resolve(base64String);
        };
        reader.onerror = () => {
            reject('File transcoding failed');
        };
        reader.readAsDataURL(file);
    });
};
