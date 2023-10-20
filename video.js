const {redis} = require("./connections/init.redis");

async function addVideo(videoId) {
    try {
        const res = await redis.set(`video::${videoId}`, 0)
        console.log(res)
    } catch (e) {
        console.log(e)
    }
}

async function playVideo(videoId, userId) {
    try {
        const keyVideo = `video::${videoId}`,
            keyUserId = `user::${userId}`
        const viewTime = 20
        console.log(keyVideo + ':::' + keyUserId)

        // nx: set key if it doesn't exist
        // ex: auto delete the key after time(seconds)
        const isOk = await redis.set(keyUserId, 'hits', 'EX', viewTime, 'NX')
        console.log('isOk', isOk)

        if (isOk) {
            const res = await redis.incrby(keyVideo, 1)
            console.log(res)
        }
    } catch (e) {
        console.log(e)
    }
}

// addVideo(10001)
playVideo(10001, 102)
// getRemoteAddress() => ip