export default {
    name: 'stolen',
    image: `/images/stolen.png`,
    onClick: null,
    buttons: [
        {
            label: '👩‍🎤 View original cast',
            action: 'link',
            target: `${process.env.STOLEN_REDIRECT_URL}`
        }
    ]
};