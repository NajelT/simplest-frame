export default {
    name: 'stolen',
    image: `/images/stolen.png`,
    buttons: [
        {
            label: '👩‍🎤 View original cast',
            action: 'link',
            target: `${process.env.STOLEN_REDIRECT_URL}`
        }
    ]
};