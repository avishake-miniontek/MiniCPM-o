// Scheduled message sending
export const sendMessage = data => {
    return useHttp.post('/api/v1/stream', data);
};
// Skip current
export const stopMessage = () => {
    return useHttp.post('/api/v1/stop');
};
// Upload sound files
export const uploadFile = data => {
    return useHttp.post('/api/v1/upload_audio', data);
};
// feedback
export const feedback = data => {
    return useHttp.post('/api/v1/feedback', data);
};
// Upload Configuration
export const uploadConfig = data => {
    return useHttp.post('/api/v1/init_options', data);
    // return useHttp.post('/api/v1/upload_audio', data);
};
