export const formatHours = date => {
    const hr = new Date(date * 1000).getHours();
    return hr > 12 ? `${hr - 12} PM` : hr === 0 ? '12 AM' : hr === 12 ? '12 PM' : `${hr} AM`;
};

export const formatDay = date => ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'][new Date(date * 1000).getDay()];