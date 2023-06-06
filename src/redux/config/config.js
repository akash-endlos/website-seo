const config = {
    api: {
        base: process.env.NEXT_PUBLIC_API_URL,
        url: {
            login: 'user/login',
            refresh: 'auth/refreshtoken',
            getWebsite:'website/get?type=all',
            addWebsite:'website/add',
            updateWebsite:'website/update',
            getWebsiteByIdFormat:'website/get',
            addPage:'head/add',
            updateHead:'head/update',
        }
    }
}
export default config;