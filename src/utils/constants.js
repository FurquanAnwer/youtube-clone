export const API_KEY = process.env.YOUTUBE_API_KEY;
export const LIVE_CHAT_COUNT = 13;
export const YOUTUBE_VIDEO_API = "https://www.googleapis.com/youtube/v3/videos?part=contentDetails&part=id&chart=mostPopular&maxResults=50&key="+API_KEY+"&part=snippet&part=statistics";
export const YOUTUBE_SEARCH_RESULTS_API = "https://youtube.googleapis.com/youtube/v3/search?part=snippet&channelType=any&key="+API_KEY+"&q=";
export const YOUTUBE_SUGGESTIONS = "https://suggestqueries.google.com/complete/search?client=firefox&ds=yt&q=";


